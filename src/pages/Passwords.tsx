import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { MobileBottomNav } from '@/components/dashboard/MobileBottomNav';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search, Plus, Eye, EyeOff, Copy, Trash2, Edit, Globe, Lock, Shield, Wand2, RefreshCw,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

interface Password {
  id: string;
  service_name: string;
  username: string | null;
  encrypted_password: string;
  encryption_iv: string;
  service_url: string | null;
  service_icon: string | null;
  category: string | null;
  password_strength_score: number | null;
  created_at: string | null;
  last_changed_at: string | null;
}

const DEFAULT_CATEGORIES = [
  'Personnel',
  'Professionnel',
  'Bancaire',
  'Réseaux sociaux',
  'Shopping',
  'Streaming',
  'Email',
  'Jeux',
];

// Simple AES encryption helpers using Web Crypto API
async function deriveKey(password: string, salt: ArrayBuffer): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function encryptPassword(plaintext: string, userEmail: string): Promise<{ encrypted: string; iv: string }> {
  const salt = new TextEncoder().encode(userEmail + '-docusphere').buffer as ArrayBuffer;
  const key = await deriveKey(userEmail, salt);
  const ivArr = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: ivArr.buffer as ArrayBuffer }, key, encoded);
  return {
    encrypted: btoa(String.fromCharCode(...new Uint8Array(ciphertext))),
    iv: btoa(String.fromCharCode(...ivArr)),
  };
}

async function decryptPassword(encrypted: string, iv: string, userEmail: string): Promise<string> {
  try {
    const salt = new TextEncoder().encode(userEmail + '-docusphere').buffer as ArrayBuffer;
    const key = await deriveKey(userEmail, salt);
    const ivBytes = Uint8Array.from(atob(iv), c => c.charCodeAt(0));
    const cipherBytes = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));
    const plainBuffer = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivBytes.buffer as ArrayBuffer }, key, cipherBytes);
    return new TextDecoder().decode(plainBuffer);
  } catch {
    return '••••••••';
  }
}

function getStrengthScore(pw: string): number {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

function generatePassword(length: number, useUppercase: boolean, useNumbers: boolean, useSymbols: boolean): string {
  let chars = 'abcdefghijklmnopqrstuvwxyz';
  if (useUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (useNumbers) chars += '0123456789';
  if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (v) => chars[v % chars.length]).join('');
}

const strengthLabels = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];
const strengthColors = ['bg-destructive', 'bg-destructive', 'bg-[hsl(45,93%,47%)]', 'bg-[hsl(142,76%,36%)]', 'bg-[hsl(142,76%,36%)]'];

export default function Passwords() {
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
  const [decryptedPasswords, setDecryptedPasswords] = useState<Record<string, string>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [generatorOpen, setGeneratorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [serviceName, setServiceName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [serviceUrl, setServiceUrl] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  // Generator state
  const [genLength, setGenLength] = useState(16);
  const [genUppercase, setGenUppercase] = useState(true);
  const [genNumbers, setGenNumbers] = useState(true);
  const [genSymbols, setGenSymbols] = useState(true);
  const [generatedPw, setGeneratedPw] = useState('');

  // Generator for saving directly
  const [genServiceName, setGenServiceName] = useState('');
  const [genUsername, setGenUsername] = useState('');
  const [genCategory, setGenCategory] = useState('');
  const [genCustomCategory, setGenCustomCategory] = useState('');
  const [genShowCustomCategory, setGenShowCustomCategory] = useState(false);
  const [genServiceUrl, setGenServiceUrl] = useState('');

  const storageUsed = profile?.storage_used_bytes || 0;
  const storageLimit = profile?.storage_limit_bytes || 500 * 1024 * 1024;

  const { data: passwords, isLoading } = useQuery({
    queryKey: ['passwords', user?.id],
    queryFn: async (): Promise<Password[]> => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('passwords')
        .select('*')
        .eq('user_id', user.id)
        .order('category', { ascending: true })
        .order('service_name', { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Get all unique categories (from DB + defaults)
  const allCategories = useMemo(() => {
    const dbCats = passwords?.map(p => p.category).filter(Boolean) as string[] || [];
    const merged = new Set([...DEFAULT_CATEGORIES, ...dbCats]);
    return Array.from(merged).sort();
  }, [passwords]);

  const filteredPasswords = useMemo(() => {
    if (!passwords) return [];
    if (!searchQuery) return passwords;
    const q = searchQuery.toLowerCase();
    return passwords.filter(p =>
      p.service_name.toLowerCase().includes(q) ||
      p.username?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    );
  }, [passwords, searchQuery]);

  // Group by category
  const groupedPasswords = useMemo(() => {
    const groups: Record<string, Password[]> = {};
    for (const pw of filteredPasswords) {
      const cat = pw.category || 'Sans catégorie';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(pw);
    }
    return groups;
  }, [filteredPasswords]);

  const saveMutation = useMutation({
    mutationFn: async (overrides?: { pw?: string; svc?: string; usr?: string; cat?: string; url?: string }) => {
      if (!user) throw new Error('Not authenticated');
      const thePw = overrides?.pw || password;
      const theSvc = overrides?.svc || serviceName;
      const theUsr = overrides?.usr || username;
      const theCat = overrides?.cat || (showCustomCategory ? customCategory : category);
      const theUrl = overrides?.url || serviceUrl;

      if (!theSvc.trim() || !theUsr.trim() || !thePw.trim()) {
        throw new Error('Champs obligatoires manquants');
      }

      const { encrypted, iv } = await encryptPassword(thePw, user.email || user.id);
      const score = getStrengthScore(thePw);

      if (editingId) {
        const { error } = await supabase.from('passwords').update({
          service_name: theSvc,
          username: theUsr || null,
          encrypted_password: encrypted,
          encryption_iv: iv,
          service_url: theUrl || null,
          category: theCat || null,
          password_strength_score: score,
          last_changed_at: new Date().toISOString(),
        }).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('passwords').insert({
          user_id: user.id,
          service_name: theSvc,
          username: theUsr || null,
          encrypted_password: encrypted,
          encryption_iv: iv,
          service_url: theUrl || null,
          category: theCat || null,
          password_strength_score: score,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['passwords'] });
      setDialogOpen(false);
      setGeneratorOpen(false);
      resetForm();
      resetGenForm();
      toast({ title: editingId ? 'Mot de passe mis à jour' : 'Mot de passe ajouté ✅' });
    },
    onError: (err) => {
      toast({ title: 'Erreur', description: err instanceof Error ? err.message : 'Impossible de sauvegarder.', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('passwords').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['passwords'] });
      toast({ title: 'Mot de passe supprimé' });
    },
  });

  const resetForm = () => {
    setServiceName('');
    setUsername('');
    setPassword('');
    setServiceUrl('');
    setCategory('');
    setCustomCategory('');
    setShowCustomCategory(false);
    setEditingId(null);
  };

  const resetGenForm = () => {
    setGenServiceName('');
    setGenUsername('');
    setGenCategory('');
    setGenCustomCategory('');
    setGenShowCustomCategory(false);
    setGenServiceUrl('');
    setGeneratedPw('');
  };

  const handleToggleShow = async (pw: Password) => {
    if (showPassword[pw.id]) {
      setShowPassword(prev => ({ ...prev, [pw.id]: false }));
    } else {
      if (!decryptedPasswords[pw.id]) {
        const decrypted = await decryptPassword(pw.encrypted_password, pw.encryption_iv, user?.email || user?.id || '');
        setDecryptedPasswords(prev => ({ ...prev, [pw.id]: decrypted }));
      }
      setShowPassword(prev => ({ ...prev, [pw.id]: true }));
    }
  };

  const handleCopy = async (pw: Password) => {
    let plain = decryptedPasswords[pw.id];
    if (!plain) {
      plain = await decryptPassword(pw.encrypted_password, pw.encryption_iv, user?.email || user?.id || '');
      setDecryptedPasswords(prev => ({ ...prev, [pw.id]: plain }));
    }
    await navigator.clipboard.writeText(plain);
    toast({ title: 'Copié !' });
  };

  const handleEdit = async (pw: Password) => {
    setEditingId(pw.id);
    setServiceName(pw.service_name);
    setUsername(pw.username || '');
    setServiceUrl(pw.service_url || '');
    if (pw.category && DEFAULT_CATEGORIES.includes(pw.category)) {
      setCategory(pw.category);
      setShowCustomCategory(false);
    } else if (pw.category) {
      setCategory('__custom__');
      setCustomCategory(pw.category);
      setShowCustomCategory(true);
    }
    const plain = await decryptPassword(pw.encrypted_password, pw.encryption_iv, user?.email || user?.id || '');
    setPassword(plain);
    setDialogOpen(true);
  };

  const handleGenerate = () => {
    setGeneratedPw(generatePassword(genLength, genUppercase, genNumbers, genSymbols));
  };

  const handleSaveGenerated = () => {
    const cat = genShowCustomCategory ? genCustomCategory : genCategory;
    saveMutation.mutate({ pw: generatedPw, svc: genServiceName, usr: genUsername, cat, url: genServiceUrl });
  };

  const handleCategoryChange = (value: string, isGen = false) => {
    if (value === '__custom__') {
      if (isGen) { setGenCategory(''); setGenShowCustomCategory(true); }
      else { setCategory(''); setShowCustomCategory(true); }
    } else {
      if (isGen) { setGenCategory(value); setGenShowCustomCategory(false); setGenCustomCategory(''); }
      else { setCategory(value); setShowCustomCategory(false); setCustomCategory(''); }
    }
  };

  const CategorySelect = ({ value, onChange, showCustom, customValue, onCustomChange, isGen = false }: {
    value: string; onChange: (v: string) => void; showCustom: boolean; customValue: string; onCustomChange: (v: string) => void; isGen?: boolean;
  }) => (
    <div className="space-y-2">
      <Select value={showCustom ? '__custom__' : value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Choisir une catégorie" />
        </SelectTrigger>
        <SelectContent>
          {allCategories.map(cat => (
            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
          ))}
          <SelectItem value="__custom__">+ Nouvelle catégorie</SelectItem>
        </SelectContent>
      </Select>
      {showCustom && (
        <Input value={customValue} onChange={e => onCustomChange(e.target.value)} placeholder="Nom de la catégorie" />
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar storageUsed={storageUsed} storageLimit={storageLimit} />

      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
              <Lock className="h-5 w-5 md:h-6 md:w-6 text-primary" /> Mots de passe
            </h1>
            <p className="text-muted-foreground">
              {passwords?.length || 0} mot(s) de passe enregistré(s)
            </p>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full md:w-64"
              />
            </div>

            {/* Password Generator Dialog */}
            <Dialog open={generatorOpen} onOpenChange={(o) => { setGeneratorOpen(o); if (!o) resetGenForm(); }}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1 md:gap-2 shrink-0">
                  <Wand2 className="h-4 w-4" /> <span className="hidden md:inline">Générer</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Générateur de mot de passe</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {/* Generated password display */}
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm font-mono break-all min-h-[40px] flex items-center">
                      {generatedPw || 'Cliquez sur Générer'}
                    </code>
                    <Button variant="ghost" size="icon" onClick={() => { if (generatedPw) { navigator.clipboard.writeText(generatedPw); toast({ title: 'Copié !' }); } }}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Strength indicator */}
                  {generatedPw && (
                    <div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`h-1.5 flex-1 rounded-full ${i < getStrengthScore(generatedPw) ? strengthColors[getStrengthScore(generatedPw) - 1] : 'bg-muted'}`} />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{strengthLabels[getStrengthScore(generatedPw) - 1] || 'Très faible'}</p>
                    </div>
                  )}

                  {/* Length slider */}
                  <div>
                    <label className="text-sm font-medium text-foreground">Longueur : {genLength}</label>
                    <Slider value={[genLength]} onValueChange={([v]) => setGenLength(v)} min={8} max={32} step={1} className="mt-2" />
                  </div>

                  {/* Options */}
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox checked={genUppercase} onCheckedChange={(c) => setGenUppercase(!!c)} /> Majuscules
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox checked={genNumbers} onCheckedChange={(c) => setGenNumbers(!!c)} /> Chiffres
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox checked={genSymbols} onCheckedChange={(c) => setGenSymbols(!!c)} /> Symboles
                    </label>
                  </div>

                  <Button onClick={handleGenerate} className="w-full gap-2" variant="outline">
                    <RefreshCw className="h-4 w-4" /> Générer
                  </Button>

                  {/* Save section */}
                  {generatedPw && (
                    <div className="border-t border-border pt-4 space-y-3">
                      <p className="text-sm font-medium text-foreground">Enregistrer ce mot de passe</p>
                      <div>
                        <label className="text-sm font-medium text-foreground">Service *</label>
                        <Input value={genServiceName} onChange={e => setGenServiceName(e.target.value)} placeholder="Ex: Google, Netflix..." />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Identifiant *</label>
                        <Input value={genUsername} onChange={e => setGenUsername(e.target.value)} placeholder="Email ou nom d'utilisateur" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Catégorie</label>
                        <CategorySelect
                          value={genCategory}
                          onChange={(v) => handleCategoryChange(v, true)}
                          showCustom={genShowCustomCategory}
                          customValue={genCustomCategory}
                          onCustomChange={setGenCustomCategory}
                          isGen
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">URL du site</label>
                        <Input value={genServiceUrl} onChange={e => setGenServiceUrl(e.target.value)} placeholder="https://..." />
                      </div>
                      <Button
                        onClick={handleSaveGenerated}
                        className="w-full gradient-hero text-primary-foreground"
                        disabled={!genServiceName.trim() || !genUsername.trim() || saveMutation.isPending}
                      >
                        {saveMutation.isPending ? 'Enregistrement...' : 'Enregistrer le mot de passe'}
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {/* Add password dialog */}
            <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) resetForm(); }}>
              <DialogTrigger asChild>
                <Button className="gradient-hero text-primary-foreground gap-2">
                  <Plus className="h-4 w-4" /> Ajouter
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingId ? 'Modifier' : 'Nouveau mot de passe'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate({}); }} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Service *</label>
                    <Input value={serviceName} onChange={e => setServiceName(e.target.value)} placeholder="Ex: Google, Netflix..." required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Identifiant *</label>
                    <Input value={username} onChange={e => setUsername(e.target.value)} placeholder="Email ou nom d'utilisateur" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Mot de passe *</label>
                    <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
                    {password && (
                      <div className="mt-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < getStrengthScore(password) ? strengthColors[getStrengthScore(password) - 1] : 'bg-muted'}`} />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{strengthLabels[getStrengthScore(password) - 1] || 'Très faible'}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">URL du site</label>
                    <Input value={serviceUrl} onChange={e => setServiceUrl(e.target.value)} placeholder="https://..." />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Catégorie</label>
                    <CategorySelect
                      value={category}
                      onChange={(v) => handleCategoryChange(v)}
                      showCustom={showCustomCategory}
                      customValue={customCategory}
                      onCustomChange={setCustomCategory}
                    />
                  </div>
                  <Button type="submit" className="w-full gradient-hero text-primary-foreground" disabled={saveMutation.isPending}>
                    {saveMutation.isPending ? 'Enregistrement...' : (editingId ? 'Mettre à jour' : 'Ajouter')}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />)}
          </div>
        ) : Object.keys(groupedPasswords).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(groupedPasswords).map(([cat, pws]) => (
              <div key={cat}>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {cat} ({pws.length})
                </h2>
                <div className="space-y-2">
                  {pws.map(pw => (
                    <div key={pw.id} className="glass-card rounded-xl p-4 flex items-center gap-4 hover:shadow-card-hover transition-all">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        {pw.service_icon ? <img src={pw.service_icon} alt="" className="w-6 h-6" /> : <Globe className="w-5 h-5 text-primary" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">{pw.service_name}</p>
                        <p className="text-sm text-muted-foreground truncate">{pw.username || '—'}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {pw.password_strength_score != null && (
                          <div className="flex gap-0.5 mr-3">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className={`w-1.5 h-4 rounded-full ${i < pw.password_strength_score! ? strengthColors[pw.password_strength_score! - 1] : 'bg-muted'}`} />
                            ))}
                          </div>
                        )}
                        <code className="text-sm font-mono text-muted-foreground min-w-[100px] text-right">
                          {showPassword[pw.id] ? decryptedPasswords[pw.id] : '••••••••'}
                        </code>
                        <Button variant="ghost" size="icon" onClick={() => handleToggleShow(pw)}>
                          {showPassword[pw.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleCopy(pw)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(pw)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(pw.id)} className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <Shield className="h-16 w-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">Aucun mot de passe</p>
            <p className="text-sm">Ajoutez votre premier mot de passe sécurisé</p>
          </div>
        )}
      </main>
    </div>
  );
}

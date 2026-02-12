import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { supabase } from '../../src/services/supabase';
import { useAuth } from '../../src/hooks/useAuth';
import { Colors, Spacing, FontSize } from '../../src/constants/theme';

interface PasswordEntry {
  id: string;
  service_name: string;
  username: string;
  service_url: string | null;
}

export default function PasswordsScreen() {
  const { user } = useAuth();
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const authenticateWithBiometrics = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      setAuthenticated(true);
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authentifiez-vous pour acceder a vos mots de passe',
      cancelLabel: 'Annuler',
      fallbackLabel: 'Utiliser le code',
    });

    if (result.success) {
      setAuthenticated(true);
    }
  };

  const fetchPasswords = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('passwords')
      .select('id, service_name, username, service_url')
      .eq('user_id', user.id)
      .order('service_name');

    if (data) {
      setPasswords(data);
    }
  };

  useEffect(() => {
    authenticateWithBiometrics();
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchPasswords();
    }
  }, [authenticated, user]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPasswords();
    setRefreshing(false);
  };

  const handleCopyPassword = async (id: string) => {
    Alert.alert('Info', 'Le dechiffrement et la copie du mot de passe seront implementes avec le module de chiffrement local.');
  };

  if (!authenticated) {
    return (
      <View style={styles.lockedContainer}>
        <Ionicons name="lock-closed" size={64} color={Colors.dark.mutedForeground} />
        <Text style={styles.lockedTitle}>Acces protege</Text>
        <Text style={styles.lockedSubtext}>
          Authentifiez-vous pour acceder a vos mots de passe
        </Text>
        <TouchableOpacity style={styles.unlockButton} onPress={authenticateWithBiometrics}>
          <Ionicons name="finger-print" size={24} color={Colors.dark.primaryForeground} />
          <Text style={styles.unlockButtonText}>Deverrouiller</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderPassword = ({ item }: { item: PasswordEntry }) => (
    <TouchableOpacity
      style={styles.passwordCard}
      activeOpacity={0.7}
      onPress={() => handleCopyPassword(item.id)}
    >
      <View style={styles.passwordIcon}>
        <Ionicons name="globe-outline" size={24} color={Colors.dark.primary} />
      </View>
      <View style={styles.passwordInfo}>
        <Text style={styles.passwordService}>{item.service_name}</Text>
        <Text style={styles.passwordUsername}>{item.username}</Text>
      </View>
      <TouchableOpacity onPress={() => handleCopyPassword(item.id)}>
        <Ionicons name="copy-outline" size={20} color={Colors.dark.mutedForeground} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mots de passe</Text>
        <Text style={styles.headerSubtext}>{passwords.length} enregistres</Text>
      </View>

      <FlatList
        data={passwords}
        renderItem={renderPassword}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.dark.primary} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="key-outline" size={48} color={Colors.dark.mutedForeground} />
            <Text style={styles.emptyText}>Aucun mot de passe</Text>
            <Text style={styles.emptySubtext}>
              Ajoutez vos mots de passe depuis l'app web
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    paddingBottom: Spacing.lg,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.dark.foreground,
  },
  headerSubtext: {
    fontSize: FontSize.sm,
    color: Colors.dark.mutedForeground,
    marginTop: Spacing.xs,
  },
  list: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  passwordCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: 14,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  passwordIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.dark.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  passwordInfo: {
    flex: 1,
  },
  passwordService: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.dark.foreground,
  },
  passwordUsername: {
    fontSize: FontSize.sm,
    color: Colors.dark.mutedForeground,
    marginTop: 2,
  },
  lockedContainer: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  lockedTitle: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.dark.foreground,
  },
  lockedSubtext: {
    fontSize: FontSize.sm,
    color: Colors.dark.mutedForeground,
    textAlign: 'center',
  },
  unlockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.dark.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
  unlockButtonText: {
    color: Colors.dark.primaryForeground,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 80,
    gap: Spacing.sm,
  },
  emptyText: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.dark.foreground,
  },
  emptySubtext: {
    fontSize: FontSize.sm,
    color: Colors.dark.mutedForeground,
    textAlign: 'center',
  },
});

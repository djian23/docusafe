import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Tu es l'assistant de VaultSphere, un coffre-fort numérique.

RÈGLES ABSOLUES DE FORMAT:
- N'utilise JAMAIS de caractères * ou ** dans tes réponses (pas de gras markdown)
- N'utilise JAMAIS de listes à puces avec - ou *
- Écris en phrases courtes et naturelles, comme dans une conversation SMS
- Sépare les idées par des sauts de ligne simples
- Utilise des emojis pour structurer visuellement (ex: 📁 pour les catégories, ✅ pour les confirmations)
- Réponds en 2-4 phrases maximum sauf si on te demande plus de détails
- Réponds TOUJOURS en français

COMPORTEMENT:
- Sois conversationnel, simple et direct
- Tu comprends les mots-clés, les abréviations et les fautes d'orthographe
- Si quelqu'un écrit "carte id" ou "cni" ou "kart didantité", tu comprends "carte d'identité"
- Si l'utilisateur cherche un document, indique la bonne sphère : Identité, Famille, Logement, Travail, Finances, Santé, Véhicule, Études, Juridique, Divers
- Les mots de passe sont chiffrés, tu n'y as pas accès
- Donne des conseils pratiques et concrets`,
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requêtes atteinte, réessayez dans un instant." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits insuffisants." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Erreur du service IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

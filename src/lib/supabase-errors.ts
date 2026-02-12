const SUPABASE_ERROR_TRANSLATIONS: Record<string, string> = {
  // Rate limiting
  "Email rate limit exceeded":
    "Trop de tentatives. Veuillez patienter au moins 1 heure avant de réessayer.",
  "Rate limit exceeded":
    "Trop de requêtes. Veuillez patienter quelques minutes avant de réessayer.",
  "For security purposes, you can only request this after":
    "Pour des raisons de sécurité, veuillez patienter avant de réessayer.",

  // Signup
  "User already registered":
    "Un compte existe déjà avec cet email. Essayez de vous connecter.",
  "Password should be at least 6 characters":
    "Le mot de passe doit contenir au moins 6 caractères.",
  "Unable to validate email address: invalid format":
    "L'adresse email est invalide.",
  "Signup requires a valid password":
    "Veuillez fournir un mot de passe valide.",

  // Login
  "Invalid login credentials":
    "Email ou mot de passe incorrect.",
  "Email not confirmed":
    "Veuillez confirmer votre email avant de vous connecter.",
  "Invalid Refresh Token: Refresh Token Not Found":
    "Votre session a expiré. Veuillez vous reconnecter.",

  // Password reset
  "User not found":
    "Aucun compte trouvé avec cet email.",

  // Generic
  "Network request failed":
    "Erreur de connexion. Vérifiez votre connexion internet.",
};

/**
 * Translates a Supabase error message to French.
 * Uses substring matching as fallback for partial matches.
 */
export function translateSupabaseError(errorMessage: string): string {
  if (SUPABASE_ERROR_TRANSLATIONS[errorMessage]) {
    return SUPABASE_ERROR_TRANSLATIONS[errorMessage];
  }

  for (const [key, translation] of Object.entries(SUPABASE_ERROR_TRANSLATIONS)) {
    if (errorMessage.includes(key)) {
      return translation;
    }
  }

  return errorMessage;
}

/**
 * Detects whether a Supabase error is a rate limit error.
 */
export function isRateLimitError(errorMessage: string): boolean {
  const lower = errorMessage.toLowerCase();
  return (
    lower.includes("rate limit exceeded") ||
    lower.includes("for security purposes, you can only request this after")
  );
}

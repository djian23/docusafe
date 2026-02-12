/**
 * Autofill Service Bridge
 *
 * This module provides the interface for native password autofill on iOS and Android.
 *
 * iOS: Requires ASCredentialProviderViewController extension (native Swift code)
 * Android: Requires AutofillService implementation (native Kotlin code)
 *
 * For now, this module provides the shared data layer that the native extensions
 * will read from via the app group (iOS) or content provider (Android).
 */

import * as SecureStore from 'expo-secure-store';

export interface PasswordEntry {
  id: string;
  serviceName: string;
  serviceUrl: string;
  username: string;
  encryptedPassword: string;
}

const PASSWORDS_KEY = 'docusafe_passwords_cache';

export async function cachePasswordsForAutofill(passwords: PasswordEntry[]): Promise<void> {
  await SecureStore.setItemAsync(PASSWORDS_KEY, JSON.stringify(passwords));
}

export async function getCachedPasswords(): Promise<PasswordEntry[]> {
  const data = await SecureStore.getItemAsync(PASSWORDS_KEY);
  if (!data) return [];
  return JSON.parse(data);
}

export async function clearPasswordCache(): Promise<void> {
  await SecureStore.deleteItemAsync(PASSWORDS_KEY);
}

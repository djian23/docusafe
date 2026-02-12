import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '../../src/hooks/useAuth';
import { clearPasswordCache } from '../../src/services/autofill';
import { Colors, Spacing, FontSize } from '../../src/constants/theme';

interface SettingItem {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  destructive?: boolean;
}

export default function SettingsScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert(
      'Deconnexion',
      'Etes-vous sur de vouloir vous deconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Deconnexion',
          style: 'destructive',
          onPress: async () => {
            await clearPasswordCache();
            await signOut();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const sections: { title: string; items: SettingItem[] }[] = [
    {
      title: 'Compte',
      items: [
        {
          icon: 'person-outline',
          title: 'Profil',
          subtitle: user?.email ?? '',
          onPress: () => {},
        },
        {
          icon: 'shield-checkmark-outline',
          title: 'Securite',
          subtitle: 'Biometrie, cle de chiffrement',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: 'finger-print',
          title: 'Auto-remplissage',
          subtitle: 'Configurer le remplissage automatique',
          onPress: () => {
            Alert.alert(
              'Auto-remplissage',
              'Pour activer l\'auto-remplissage, allez dans Reglages > Mots de passe > Options de mots de passe > DocuSafe'
            );
          },
        },
        {
          icon: 'notifications-outline',
          title: 'Notifications',
          subtitle: 'Alertes de securite',
          onPress: () => {},
        },
      ],
    },
    {
      title: '',
      items: [
        {
          icon: 'log-out-outline',
          title: 'Se deconnecter',
          onPress: handleSignOut,
          destructive: true,
        },
      ],
    },
  ];

  const renderItem = (item: SettingItem) => (
    <TouchableOpacity
      key={item.title}
      style={styles.settingItem}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.settingIcon, item.destructive && styles.settingIconDestructive]}>
        <Ionicons
          name={item.icon as any}
          size={20}
          color={item.destructive ? Colors.dark.destructive : Colors.dark.primary}
        />
      </View>
      <View style={styles.settingInfo}>
        <Text style={[styles.settingTitle, item.destructive && styles.settingTitleDestructive]}>
          {item.title}
        </Text>
        {item.subtitle && (
          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={18} color={Colors.dark.mutedForeground} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Parametres</Text>
      </View>

      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          {section.title ? (
            <Text style={styles.sectionTitle}>{section.title}</Text>
          ) : null}
          <View style={styles.sectionCard}>
            {section.items.map(renderItem)}
          </View>
        </View>
      ))}

      <Text style={styles.version}>DocuSafe Mobile v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    paddingBottom: Spacing.xxl,
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
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.dark.mutedForeground,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
    paddingLeft: Spacing.xs,
  },
  sectionCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.dark.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  settingIconDestructive: {
    backgroundColor: Colors.dark.destructive + '20',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.dark.foreground,
  },
  settingTitleDestructive: {
    color: Colors.dark.destructive,
  },
  settingSubtitle: {
    fontSize: FontSize.xs,
    color: Colors.dark.mutedForeground,
    marginTop: 2,
  },
  version: {
    textAlign: 'center',
    fontSize: FontSize.xs,
    color: Colors.dark.mutedForeground,
    marginTop: Spacing.lg,
  },
});

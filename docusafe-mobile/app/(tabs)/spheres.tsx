import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../src/services/supabase';
import { useAuth } from '../../src/hooks/useAuth';
import { Colors, Spacing, FontSize } from '../../src/constants/theme';

interface Sphere {
  id: string;
  name: string;
  icon: string;
  color: string;
  file_count: number;
}

const SPHERE_ICONS: Record<string, string> = {
  identity: 'id-card-outline',
  family: 'people-outline',
  housing: 'home-outline',
  work: 'briefcase-outline',
  finances: 'wallet-outline',
  health: 'heart-outline',
  vehicle: 'car-outline',
  studies: 'school-outline',
  legal: 'document-text-outline',
  misc: 'grid-outline',
};

export default function SpheresScreen() {
  const { user } = useAuth();
  const [spheres, setSpheres] = useState<Sphere[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSpheres = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('spheres')
      .select('id, name, icon, color')
      .order('name');

    if (data) {
      setSpheres(data.map((s) => ({ ...s, file_count: 0 })));
    }
  };

  useEffect(() => {
    fetchSpheres();
  }, [user]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSpheres();
    setRefreshing(false);
  };

  const renderSphere = ({ item }: { item: Sphere }) => (
    <TouchableOpacity style={styles.sphereCard} activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
        <Ionicons
          name={(SPHERE_ICONS[item.icon] ?? 'folder-outline') as any}
          size={28}
          color={item.color || Colors.dark.primary}
        />
      </View>
      <Text style={styles.sphereName}>{item.name}</Text>
      <Text style={styles.sphereCount}>{item.file_count} documents</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Bonjour{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''} !
        </Text>
        <Text style={styles.headerTitle}>Vos spheres</Text>
      </View>

      <FlatList
        data={spheres}
        renderItem={renderSphere}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.dark.primary} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="folder-open-outline" size={48} color={Colors.dark.mutedForeground} />
            <Text style={styles.emptyText}>Aucune sphere trouvee</Text>
            <Text style={styles.emptySubtext}>Vos spheres apparaitront ici</Text>
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
  greeting: {
    fontSize: FontSize.sm,
    color: Colors.dark.mutedForeground,
    marginBottom: Spacing.xs,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.dark.foreground,
  },
  list: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  row: {
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  sphereCard: {
    flex: 1,
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sphereName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.dark.foreground,
    marginBottom: Spacing.xs,
  },
  sphereCount: {
    fontSize: FontSize.xs,
    color: Colors.dark.mutedForeground,
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
  },
});

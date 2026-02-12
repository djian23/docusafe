import { Redirect } from 'expo-router';
import { useAuth } from '../src/hooks/useAuth';
import { ActivityIndicator, View } from 'react-native';
import { Colors } from '../src/constants/theme';

export default function Index() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.dark.background }}>
        <ActivityIndicator size="large" color={Colors.dark.primary} />
      </View>
    );
  }

  if (session) {
    return <Redirect href="/(tabs)/spheres" />;
  }

  return <Redirect href="/(auth)/login" />;
}

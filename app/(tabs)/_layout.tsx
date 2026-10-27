import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';
import { useChat } from '@/hooks/useChat';
export function TabLayout() {
 const insets = useSafeAreaInsets();
 const { chats } = useChat();
 const unread = chats.reduce((n, c) => n + c.unread, 0);
 const icon = (name: React.ComponentProps<typeof Feather>['name'], color: string, focused: boolean) => <View style={[styles.icon, focused ? styles.active : null]}><Feather name={name} color={color} size={22} /></View>;
 return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.subtle, tabBarStyle: { height: Platform.select({ ios: insets.bottom + 68, android: insets.bottom + 68, default: 76 }), paddingTop: 8, paddingBottom: Platform.select({ ios: insets.bottom + 8, android: insets.bottom + 8, default: 8 }), paddingHorizontal: 16, backgroundColor: colors.surface, borderTopColor: colors.border, elevation: 0 }, tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginTop: 1 }, tabBarBadgeStyle: { backgroundColor: colors.primary, color: colors.white, fontSize: 10 } }}><Tabs.Screen name="index" options={{ title: 'Chats', tabBarBadge: unread || undefined, tabBarIcon: ({ color, focused }) => icon('message-circle', color, focused) }} /><Tabs.Screen name="updates" options={{ title: 'Updates', tabBarIcon: ({ color, focused }) => icon('circle', color, focused) }} /><Tabs.Screen name="calls" options={{ title: 'Calls', tabBarIcon: ({ color, focused }) => icon('phone', color, focused) }} /><Tabs.Screen name="profile" options={{ title: 'You', tabBarIcon: ({ color, focused }) => icon('user', color, focused) }} /></Tabs>;
}
export default TabLayout;
const styles = StyleSheet.create({ icon: { width: 54, height: 31, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }, active: { backgroundColor: colors.primarySoft } });

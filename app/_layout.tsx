import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AlertProvider } from '@/template';
import { ChatProvider } from '@/contexts/ChatContext';
import { colors } from '@/constants/theme';
export function RootLayout() { return <AlertProvider><SafeAreaProvider><ChatProvider><StatusBar style="dark" /><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}><Stack.Screen name="(tabs)" /><Stack.Screen name="chat/[id]" options={{ headerShown: true, headerTintColor: colors.primaryDark, headerStyle: { backgroundColor: colors.background }, headerShadowVisible: false }} /><Stack.Screen name="contacts" options={{ headerShown: true, title: 'New conversation', headerTintColor: colors.primaryDark, headerStyle: { backgroundColor: colors.background }, headerShadowVisible: false }} /><Stack.Screen name="story/[id]" options={{ presentation: 'modal' }} /><Stack.Screen name="call" options={{ presentation: 'fullScreenModal' }} /></Stack></ChatProvider></SafeAreaProvider></AlertProvider>; }
export default RootLayout;

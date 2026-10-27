import { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';
interface ScreenProps { children: ReactNode; full?: boolean; }
export function Screen({ children, full }: ScreenProps) { return <SafeAreaView edges={full ? ['top', 'bottom'] : ['top']} style={styles.safe}><View style={styles.container}>{children}</View></SafeAreaView>; }
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.background }, container: { flex: 1, width: '100%', maxWidth: 960, alignSelf: 'center', paddingHorizontal: 24 } });

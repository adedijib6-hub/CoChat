import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Avatar } from '@/components/ui/Primitives';
import { useChat } from '@/hooks/useChat';
import { colors } from '@/constants/theme';
interface StoryRailProps { onStory: (id: string) => void; onAdd: () => void; }
export function StoryRail({ onStory, onAdd }: StoryRailProps) {
 const { updates } = useChat();
 return <View style={styles.rail}><FlatList horizontal data={updates.filter(u => !u.mine)} keyExtractor={u => u.id} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.content} ListHeaderComponent={<Pressable onPress={onAdd} accessibilityLabel="Add your update" style={({ pressed }) => [styles.item, { opacity: pressed ? 0.65 : 1 }]}><View style={styles.add}><Feather name="plus" size={23} color={colors.primary} /></View><Text style={styles.label}>Your update</Text></Pressable>} renderItem={({ item }) => <Pressable onPress={() => onStory(item.id)} accessibilityLabel={`View ${item.name} update`} style={({ pressed }) => [styles.item, { opacity: pressed ? 0.65 : 1 }]}><Avatar uri={item.avatar} size={60} ring={!item.seen} /><Text style={styles.label}>{item.name.split(' ')[0]}</Text></Pressable>} /></View>;
}
const styles = StyleSheet.create({ rail: { height: 111, marginTop: 23 }, content: { alignItems: 'center', gap: 20, paddingRight: 8 }, item: { alignItems: 'center', gap: 8, minWidth: 61 }, add: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.primarySoft, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.primary, alignItems: 'center', justifyContent: 'center' }, label: { fontSize: 12, color: colors.subtle, fontWeight: '500' } });

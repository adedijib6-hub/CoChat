import { memo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Conversation } from '@/services/chatService';
import { Avatar } from '@/components/ui/Primitives';
import { colors } from '@/constants/theme';
interface ChatRowProps { chat: Conversation; onPress: () => void; }
export const ChatRow = memo(function ChatRow({ chat, onPress }: ChatRowProps) {
 const last = chat.messages[chat.messages.length - 1];
 const preview = last?.poll ? `Poll: ${last.poll.question}` : last?.image ? 'Photo · ' + last.text : last?.text || 'Say hello and start a conversation';
 return <Pressable accessibilityRole="button" accessibilityLabel={`${chat.name}, ${chat.unread} unread messages`} onPress={onPress} style={({ pressed }) => [styles.row, { backgroundColor: pressed ? colors.primarySoft : colors.transparent }]}><Avatar uri={chat.avatar} online={chat.online} size={58} /><View style={styles.content}><View style={styles.top}><Text numberOfLines={1} style={styles.name}>{chat.name}</Text><Text style={[styles.time, chat.unread ? styles.activeTime : null]}>{chat.time}</Text></View><View style={styles.bottom}>{last?.mine ? <Feather name="check" color={colors.primary} size={15} /> : null}<Text style={[styles.preview, chat.unread ? styles.unreadPreview : null]} numberOfLines={1}>{preview}</Text>{chat.unread ? <View style={styles.badge}><Text style={styles.badgeText}>{chat.unread}</Text></View> : null}</View></View></Pressable>;
});
const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 17, gap: 14, borderBottomWidth: 1, borderBottomColor: colors.border, borderRadius: 4 }, content: { flex: 1, gap: 8 }, top: { flexDirection: 'row', alignItems: 'center', gap: 8 }, name: { flex: 1, fontSize: 17, fontWeight: '600', color: colors.text, letterSpacing: -0.3 }, time: { fontSize: 12, color: colors.subtle }, activeTime: { color: colors.primary, fontWeight: '600' }, bottom: { flexDirection: 'row', alignItems: 'center', gap: 4 }, preview: { flex: 1, fontSize: 14, color: colors.subtle }, unreadPreview: { color: colors.text, fontWeight: '500' }, badge: { minWidth: 22, height: 22, paddingHorizontal: 6, borderRadius: 11, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary }, badgeText: { color: colors.white, fontSize: 12, fontWeight: '600' } });

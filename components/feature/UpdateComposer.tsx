import { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Sheet, Input, Button } from '@/components/ui/Primitives';
import { useChat } from '@/hooks/useChat';
import { colors } from '@/constants/theme';
interface UpdateComposerProps { visible: boolean; onClose: () => void; }
export function UpdateComposer({ visible, onClose }: UpdateComposerProps) {
 const [text, setText] = useState('');
 const { addUpdate } = useChat();
 return <Sheet visible={visible} onClose={onClose} title="A little life update"><Text style={styles.description}>Share a thought or a moment with your people.</Text><Input label="Your update" value={text} onChange={setText} placeholder="What is on your mind?" multiline /><Text style={styles.note}>Local demo · saved only on this device</Text><Button disabled={!text.trim()} onPress={() => { addUpdate(text.trim()); setText(''); onClose(); }}>Share update</Button></Sheet>;
}
const styles = StyleSheet.create({ description: { fontSize: 16, color: colors.subtle, lineHeight: 25, marginBottom: 24 }, note: { color: colors.subtle, fontSize: 12, marginBottom: 8 } });

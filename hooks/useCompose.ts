import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useChat } from './useChat';
import { useAlert } from '@/template';
export function useCompose(chatId: string) {
 const { sendMessage, addPoll } = useChat();
 const { showAlert } = useAlert();
 const [text, setText] = useState('');
 const [attachmentOpen, setAttachmentOpen] = useState(false);
 const [pollOpen, setPollOpen] = useState(false);
 const [question, setQuestion] = useState('');
 const [optionOne, setOptionOne] = useState('');
 const [optionTwo, setOptionTwo] = useState('');
 const send = () => { if (!text.trim()) return; sendMessage(chatId, text.trim()); setText(''); };
 const pickPhoto = async () => { setAttachmentOpen(false); try { const perm = await ImagePicker.requestMediaLibraryPermissionsAsync(); if (!perm.granted) { showAlert('Photo access', 'Allow photo library access in your device settings to share an image.'); return; } const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 }); if (!result.canceled && result.assets[0]) { sendMessage(chatId, text.trim(), result.assets[0].uri); setText(''); } } catch { showAlert('Photo unavailable', 'Try selecting another image.'); } };
 const submitPoll = () => { if (!question.trim() || !optionOne.trim() || !optionTwo.trim()) { showAlert('Complete your poll', 'Add a question and two answers.'); return; } addPoll(chatId, question.trim(), [optionOne.trim(), optionTwo.trim()]); setPollOpen(false); setQuestion(''); setOptionOne(''); setOptionTwo(''); };
 return { text, setText, send, attachmentOpen, setAttachmentOpen, pollOpen, setPollOpen, question, setQuestion, optionOne, setOptionOne, optionTwo, setOptionTwo, pickPhoto, submitPoll };
}

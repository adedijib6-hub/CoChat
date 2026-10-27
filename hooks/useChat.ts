import { useContext } from 'react';
import { ChatContext } from '@/contexts/ChatContext';
export function useChat() { const value = useContext(ChatContext); if (!value) throw new Error('ChatProvider required'); return value; }

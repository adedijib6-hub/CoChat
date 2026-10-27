import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { ChatData, Conversation, Message, Preferences, Update, people, currentUser, getDemoData, loadChatData, saveChatData, makeId, getTime } from '@/services/chatService';
interface ChatContextValue extends ChatData {
 ready: boolean; storageError: boolean; sendMessage: (id: string, text: string, image?: string) => void; markRead: (id: string) => void; startChat: (personId: string) => string; createGroup: (name: string, members: string[]) => string; pinMessage: (chatId: string, messageId: string) => void; deleteMessage: (chatId: string, messageId: string) => void; addPoll: (chatId: string, question: string, options: string[]) => void; vote: (chatId: string, messageId: string, option: number) => void; addUpdate: (text: string) => void; seeUpdate: (id: string) => void; recordCall: (name: string, avatar: string, type: 'voice' | 'video') => void; setPreference: (key: keyof Preferences, value: boolean) => void; resetDemo: () => void;
}
export const ChatContext = createContext<ChatContextValue | undefined>(undefined);
export function ChatProvider({ children }: { children: ReactNode }) {
 const [data, setData] = useState<ChatData>(getDemoData());
 const [ready, setReady] = useState(false);
 const [storageError, setStorageError] = useState(false);
 const saveChain = useRef(Promise.resolve());
 useEffect(() => { let live = true; loadChatData().then(d => { if (live) { setData(d); setReady(true); } }); return () => { live = false; }; }, []);
 useEffect(() => { if (ready) { saveChain.current = saveChain.current.then(() => saveChatData(data)).then(() => setStorageError(false)).catch(() => setStorageError(true)); } }, [data, ready]);
 const updateChat = (id: string, fn: (chat: Conversation) => Conversation) => setData(d => ({ ...d, chats: d.chats.map(c => c.id === id ? fn(c) : c) }));
 const append = (id: string, message: Message) => setData(d => { const chat = d.chats.find(c => c.id === id); return chat ? { ...d, chats: [{ ...chat, unread: 0, time: 'Now', messages: [...chat.messages, message] }, ...d.chats.filter(c => c.id !== id)] } : d; });
 const startChat = (personId: string) => { const p = people.find(p => p.id === personId); if (!p) return 'maya'; setData(d => d.chats.some(c => c.id === personId) ? d : { ...d, chats: [{ id: p.id, name: p.name, avatar: p.avatar, group: false, online: p.online, unread: 0, time: 'Now', messages: [] }, ...d.chats] }); return p.id; };
 const createGroup = (name: string, members: string[]) => { const id = makeId(); setData(d => ({ ...d, chats: [{ id, name, avatar: 'group', group: true, online: false, unread: 0, time: 'Now', messages: [], members: [...members.map(id => people.find(p => p.id === id)?.name || ''), 'you'].join(', ') }, ...d.chats] })); return id; };
 const addUpdate = (text: string) => { const update: Update = { id: makeId(), name: 'You', avatar: currentUser.avatar, text, time: 'Just now', color: 'green', mine: true }; setData(d => ({ ...d, updates: [update, ...d.updates] })); };
 const value: ChatContextValue = { ...data, ready, storageError, startChat, createGroup, addUpdate,
 sendMessage: (id, text, image) => append(id, { id: makeId(), text, image, mine: true, time: getTime() }),
 markRead: id => setData(d => ({ ...d, chats: d.chats.map(c => c.id === id && c.unread ? { ...c, unread: 0 } : c) })),
 pinMessage: (id, mid) => updateChat(id, c => ({ ...c, messages: c.messages.map(m => m.id === mid ? { ...m, pinned: !m.pinned } : m) })),
 deleteMessage: (id, mid) => updateChat(id, c => ({ ...c, messages: c.messages.filter(m => m.id !== mid) })),
 addPoll: (id, question, options) => append(id, { id: makeId(), text: '', mine: true, time: getTime(), poll: { question, options, votes: options.map(() => 0) } }),
 vote: (id, mid, option) => updateChat(id, c => ({ ...c, messages: c.messages.map(m => { if (m.id !== mid || !m.poll) return m; const p = m.poll; return { ...m, poll: { ...p, selected: option, votes: p.votes.map((v, i) => v - (p.selected === i ? 1 : 0) + (i === option ? 1 : 0)) } }; }) })),
 seeUpdate: id => setData(d => ({ ...d, updates: d.updates.map(u => u.id === id ? { ...u, seen: true } : u) })),
 recordCall: (name, avatar, type) => setData(d => ({ ...d, calls: [{ id: makeId(), name, avatar, type, incoming: false, missed: false, time: 'Just now · demo' }, ...d.calls] })),
 setPreference: (key, value) => setData(d => ({ ...d, preferences: { ...d.preferences, [key]: value } })),
 resetDemo: () => setData(getDemoData())
 };
 return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

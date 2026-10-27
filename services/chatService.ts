import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Person { id: string; name: string; avatar: string; bio: string; online: boolean; }
export interface Message { id: string; text: string; mine: boolean; time: string; image?: string; pinned?: boolean; poll?: { question: string; options: string[]; votes: number[]; selected?: number }; }
export interface Conversation { id: string; name: string; avatar: string; group: boolean; online: boolean; unread: number; time: string; messages: Message[]; members?: string; }
export interface Update { id: string; name: string; avatar: string; text: string; time: string; color: string; mine?: boolean; seen?: boolean; }
export interface CallRecord { id: string; name: string; avatar: string; type: 'voice' | 'video'; incoming: boolean; missed: boolean; time: string; }
export interface Preferences { notifications: boolean; receipts: boolean; activity: boolean; }
export interface ChatData { chats: Conversation[]; updates: Update[]; calls: CallRecord[]; preferences: Preferences; }
const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=160&h=160&q=85`;
export const people: Person[] = [
 { id: 'maya', name: 'Maya Chen', avatar: photo('photo-1534528741775-53994a69daeb'), bio: 'A little adventure, every day', online: true },
 { id: 'james', name: 'James Wilson', avatar: photo('photo-1500648767791-00dcc994a43e'), bio: 'Coffee first. Everything else later.', online: true },
 { id: 'sofia', name: 'Sofia Martinez', avatar: photo('photo-1524504388940-b1c1722653e1'), bio: 'Collecting little moments', online: false },
 { id: 'alex', name: 'Alex Johnson', avatar: photo('photo-1506794778202-cad84cf45f1d'), bio: 'Out exploring', online: false },
 { id: 'olivia', name: 'Olivia Parker', avatar: photo('photo-1517841905240-472988babdf9'), bio: 'See you at the next sunset', online: true },
];
export const currentUser = { name: 'Jamie Taylor', phone: '+1 (415) 555-0128', avatar: photo('photo-1472099645785-5658abf4ff4e') };
const msg = (id: string, text: string, mine: boolean, time = '10:42 AM'): Message => ({ id, text, mine, time });
export function getDemoData(): ChatData {
 return {
 chats: [
 { id: 'maya', name: people[0].name, avatar: people[0].avatar, online: true, group: false, unread: 2, time: 'Now', messages: [msg('m1', 'Hey! How is your morning going?', false, '10:38 AM'), msg('m2', 'Pretty good! Just grabbed a coffee ☕', true, '10:39 AM'), msg('m3', 'That sounds perfect. Want to try that new café this weekend?', false, '10:40 AM'), msg('m4', 'Absolutely! Saturday works for me.', true, '10:41 AM'), msg('m5', 'Perfect! See you Saturday 🌿', false)] },
 { id: 'weekend', name: 'Weekend crew', avatar: 'group', group: true, online: false, unread: 3, time: '10:24', members: 'Maya, James, Sofia, you', messages: [msg('w1', 'Maya: Who is up for a little getaway?', false, '10:20 AM'), msg('w2', 'James: Count me in! 🏕️', false, '10:22 AM'), msg('w3', 'Sofia: I found the perfect spot!', false, '10:24 AM')] },
 { id: 'james', name: people[1].name, avatar: people[1].avatar, online: true, group: false, unread: 0, time: '09:51', messages: [msg('j1', 'Hey, sent you that playlist!', false, '09:50 AM'), msg('j2', 'This playlist is so good 🎧', true, '09:51 AM')] },
 { id: 'sofia', name: people[2].name, avatar: people[2].avatar, online: false, group: false, unread: 0, time: 'Yesterday', messages: [msg('s1', 'A little something from today', false, '4:12 PM'), { ...msg('s2', 'Golden hour never disappoints', false, '4:12 PM'), image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=600&q=80' }] },
 { id: 'family', name: 'Family circle', avatar: 'family', group: true, online: false, unread: 0, time: 'Yesterday', members: 'Mom, Dad, Ella, you', messages: [msg('f1', 'Mom: Sunday dinner at our place? 💛', false, '6:30 PM'), msg('f2', 'Would not miss it!', true, '6:35 PM')] },
 { id: 'alex', name: people[3].name, avatar: people[3].avatar, online: false, group: false, unread: 0, time: 'Mon', messages: [msg('a1', 'See you on the trail! 🥾', false, '8:12 AM')] }
 ],
 updates: [
 { id: 'u1', name: people[0].name, avatar: people[0].avatar, text: 'Slow mornings. Good coffee. No rush. ☕', time: '12 minutes ago', color: 'green' },
 { id: 'u2', name: people[1].name, avatar: people[1].avatar, text: 'A new day, a new trail. 🏔️', time: '38 minutes ago', color: 'blue' },
 { id: 'u3', name: people[2].name, avatar: people[2].avatar, text: 'Finding beauty in the little things. 🌼', time: '1 hour ago', color: 'peach' },
 { id: 'u4', name: people[4].name, avatar: people[4].avatar, text: 'Weekend state of mind. ✨', time: '2 hours ago', color: 'green', seen: true }
 ],
 calls: [
 { id: 'c1', name: people[0].name, avatar: people[0].avatar, type: 'video', incoming: true, missed: false, time: 'Today, 9:15 AM' },
 { id: 'c2', name: people[1].name, avatar: people[1].avatar, type: 'voice', incoming: false, missed: false, time: 'Yesterday, 6:42 PM' },
 { id: 'c3', name: people[2].name, avatar: people[2].avatar, type: 'voice', incoming: true, missed: true, time: 'Yesterday, 2:08 PM' }
 ], preferences: { notifications: true, receipts: true, activity: true }
 };
}
const key = 'cochat-local-v1';
export async function loadChatData(): Promise<ChatData> { try { const raw = await AsyncStorage.getItem(key); return raw ? JSON.parse(raw) : getDemoData(); } catch { return getDemoData(); } }
export async function saveChatData(data: ChatData) { await AsyncStorage.setItem(key, JSON.stringify(data)); }
export function makeId() { return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`; }
export function getTime() { return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }

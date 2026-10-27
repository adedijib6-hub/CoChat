import { useEffect, useRef, useState } from 'react';
import { useChat } from '@/hooks/useChat';
export function useDemoCall(name: string, avatar: string, type: 'voice' | 'video') {
 const [seconds, setSeconds] = useState(0); const [muted, setMuted] = useState(false); const [speaker, setSpeaker] = useState(false); const [camera, setCamera] = useState(type === 'video');
 const { recordCall } = useChat(); const recorded = useRef(false);
 useEffect(() => { const timer = setInterval(() => setSeconds(s => s + 1), 1000); return () => clearInterval(timer); }, []);
 const end = () => { if (!recorded.current) { recordCall(name, avatar, type); recorded.current = true; } };
 return { seconds, muted, setMuted, speaker, setSpeaker, camera, setCamera, end };
}

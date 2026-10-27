import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
export function useLayout() { const [size, setSize] = useState({ width: 375, height: 667 }); useEffect(() => { setSize(Dimensions.get('window')); const sub = Dimensions.addEventListener('change', ({ window }) => setSize(window)); return () => sub.remove(); }, []); return { ...size, wide: size.width >= 600 }; }

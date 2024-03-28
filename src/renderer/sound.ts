import { sound } from '@pixi/sound';
const VITE_API_ASSETS_ELSE_URL = import.meta.env.VITE_API_ASSETS_ELSE_URL
sound.add('spin-sound', `${VITE_API_ASSETS_ELSE_URL}audio/sfx/spin.mp3`);
sound.play('spin-sound');
sound.volumeAll = 0.5
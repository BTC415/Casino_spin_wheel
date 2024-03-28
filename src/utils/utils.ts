import { PIXI } from "../renderer";
import { sound } from '@pixi/sound';
import { allTweenings, game_global_vars } from "../config";
import { toast } from 'react-toastify';
import { tweenType } from "../@types";
const VITE_API_ASSETS_ELSE_URL = import.meta.env.VITE_API_ASSETS_ELSE_URL
export const initialBetItemListString = '["100","200","300","400","500","600","700","800","900","1000","1100","1200","1300","1400"]';
export const media_stop_mobile_xs = 0.51
export const media_stop_mobile = 0.6
export const media_stop_tablet = 0.85
export const media_stop_desktop_sm = 1.2

export const gen_autospin_item = (text: string) => {
    const button_auto_spin_item = new PIXI.Graphics()
    button_auto_spin_item.lineStyle(0);
    button_auto_spin_item.beginFill(0x444444, 1).drawRect(0, 0, 70, 50);
    const button_auto_spin_item_static_text = new PIXI.Text(text, { fontFamily: 'Salsa', fontSize: 20, fill: 0xffffff })
    button_auto_spin_item_static_text.anchor.set(0.5)
    button_auto_spin_item_static_text.position.set(button_auto_spin_item.width / 2, button_auto_spin_item.height / 2)
    button_auto_spin_item.addChild(button_auto_spin_item_static_text)
    return button_auto_spin_item
}
export const sleep = async (time: number) => await new Promise((resolve) => {
    setTimeout(() => resolve("Go"), time);
});
export const pay_table = [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [1, 1, 0, 1, 2],
    [1, 1, 2, 1, 0],
    [2, 2, 2, 2, 2],
    [1, 0, 1, 2, 1],
    [1, 0, 1, 2, 2],
    [1, 0, 0, 1, 2],
    [1, 2, 1, 0, 1],
    [1, 2, 2, 1, 0],
    [1, 2, 1, 0, 0],
    [0, 1, 2, 1, 0],
    [0, 1, 1, 1, 2],
    [0, 0, 1, 2, 2],
    [0, 0, 1, 2, 1],
    [0, 0, 0, 1, 2],
    [2, 1, 0, 1, 2],
    [2, 1, 1, 1, 0],
    [2, 2, 1, 0, 0],
    [2, 2, 1, 0, 1],
]

export const playSound = (type: 'bg' | 'spin' | 'win') => {
    let status = '';
    switch (type) {
        case 'bg':
            status = localStorage.getItem('music') || 'true'
            break;
        case 'spin':
        case 'win':
            status = localStorage.getItem('fx') || 'true'
            break;
    }
    if (status === 'true')
        sound.play(`${type}-sound`, { loop: type === 'bg' });
}
export const stopSound = (type: 'bg' | 'spin' | 'win') => {
    sound.stop(`${type}-sound`)
}

export const loadSound = () => {
    sound.add('bg-sound', `${VITE_API_ASSETS_ELSE_URL}audio/bgm/bg-sound-${game_global_vars.gameId}.mp3`);
    sound.add('spin-sound', `${VITE_API_ASSETS_ELSE_URL}audio/sfx/spin.mp3`);
    sound.add('win-sound', `${VITE_API_ASSETS_ELSE_URL}audio/sfx/win.mp3`);
    sound.volumeAll = 0.5

}
export const setVolume = (val: number) => {
    sound.volumeAll = val / 100
}
export const getUTCTimefromUTCTime: (timeString: string) => Date = (timeString: string) => {
    if (!timeString) return new Date()
    const modifiedTimeString = timeString.replace(' ', 'T');
    const date = new Date(modifiedTimeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    date.setHours(hours - 0);// ! Indian Server Time Zone GMT +5:30
    date.setMinutes(minutes - 0 - date.getTimezoneOffset());
    return date;
}
export function tweenTo(
    object: Object,
    property: string,
    propertyBeginValue: number,
    target: number,
    time: number,
    easing: (t: number) => number,
    change: (() => Promise<void>) | null,
    complete: (() => Promise<void>) | null,
) {
    const tween: tweenType = {
        object,
        property,
        propertyBeginValue,
        target,
        easing,
        time,
        change,
        complete,
        start: Date.now(),
    };

    allTweenings.push(tween);
    return tween;
}
export function lerp(a1: any, a2: any, t: any) {
    return a1 * (1 - t) + a2 * t;
}
export function backout(b: number) {
    return (t: number) => t >= 1 ? 1 : (Math.sin(b * Math.PI * t - Math.PI / 2) + 1) / (Math.sin(b * Math.PI - Math.PI / 2) + 1)
}
export function backout_2(b: number) {
    return (t: number) => t >= 1 ? 1 : Math.sqrt((1 - Math.pow(t / b - 1, 2)) / (1 - Math.pow(1 / b - 1, 2)))
}
export function interpolate(x: number, x1: number, x2: number, y1: number, y2: number) {
    return Math.max(Math.min(y1, y2), Math.min(Math.max(y1, y2), (y2 - y1) * (x - x1) / (x2 - x1) + y1))
}
export function fadeInOut() {
    return (t: number) => 1 - Math.sin(t * Math.PI)
}
export const openFullscreen = () => {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
}
export const closeFullscreen = async () => {
    if (document.exitFullscreen) {
        try {
            await document.exitFullscreen();
        } catch { }
    }
}
export const checkDevice = () => {
    let iPhone = false
    let mobile = false
    if (/Mobi/i.test(navigator.userAgent) || /Macintosh/i.test(navigator.userAgent)) {
        console.log("This is a mobile device");
        mobile = true
        if (/iPhone/i.test(navigator.userAgent)) {
            iPhone = true
            console.log("This is an iPhone");
        } else if (/iPad/i.test(navigator.userAgent)) {
            iPhone = true
            console.log("This is an iPad");
        } else if (/Macintosh/i.test(navigator.userAgent)) {
            iPhone = true
            console.log("This is a Macintosh");
        }
    } else {
        console.log("This is a browser");
    }
    return { iPhone, mobile }
}
export const showToast = (msg: string) => {
    toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}
export const mobileORdesktop = /Mobi/i.test(navigator.userAgent) ? "mobile" : "desktop"
export const webpORpng = PIXI.utils.isWebGLSupported() ? "webp" : "png"
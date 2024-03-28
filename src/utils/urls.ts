import { mobileORdesktop, webpORpng } from "./utils";
const VITE_API_ASSETS_IMAGE_URL = import.meta.env.VITE_API_ASSETS_IMAGE_URL
const VITE_API_ASSETS_ELSE_URL = import.meta.env.VITE_API_ASSETS_ELSE_URL
export const getAssetUrls = (gameId: string) => ([
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/background-footer.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/buttonSheet.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/gear.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/gear-bg.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/wheel.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/wheel-center.${webpORpng}`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/splash-title-anim.json`,    
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/wheel-emerald.json`,
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/wheel-over.json`,    
    `${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/popup.${webpORpng}`,
    //Sound
    `${VITE_API_ASSETS_ELSE_URL}audio/sfx/spin.mp3`,
    `${VITE_API_ASSETS_ELSE_URL}audio/sfx/win.mp3`,
    `${VITE_API_ASSETS_ELSE_URL}audio/bgm/bg-sound-${gameId}.mp3`,
])
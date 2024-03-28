import React, { useEffect, useRef, useState } from 'react';
import { PIXI, app, Global_Vars, appStage } from '../../renderer';
import { getAssetUrls } from '../../utils/urls';
import { loadStartScreen } from './loadStartScreen';
import { animateAllTweenings } from './loops/animateFromTweenLoop';
import { useFullScreen, useGameParams, useSetBalance } from '../../store/store';
import { useParams } from 'react-router-dom';
import { Game_Category_Config, Game_Category_Dimension, game_global_vars, loadingTextStyle } from '../../config';
import PageWrapper from '../PageWrapper';
import AccessDenied from '../AccessDenied';
import { initialBetItemListString, media_stop_desktop_sm, media_stop_mobile, media_stop_tablet, mobileORdesktop, webpORpng } from '../../utils/utils';
import FullscreenButton from '../FullscreenButton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SVGs from '../svg';
import { animateWheelTweenings } from './loops/animateFromWheelTweenLoop';
const VITE_API_ASSETS_IMAGE_URL = import.meta.env.VITE_API_ASSETS_IMAGE_URL
const GamePIXI = () => {

    const [betVal, setBetVal] = useState<number>(parseInt(JSON.parse(localStorage.getItem(`bet14`) || initialBetItemListString)[0]))
    useEffect(() => {
        game_global_vars.betVal = betVal
    }, [betVal])
    const { setFullScreen } = useFullScreen()
    const { gameId: _gameId } = useParams();
    const gameId = _gameId || ""
    const gameParams = useGameParams()
    const setBalance = useSetBalance()
    // const { pathname } = useLocation()
    if (gameId === "wheel-of-fortune") {
        game_global_vars.gameId = gameId
    }
    const [childContent, setChildContent] = useState<JSX.Element>(<></>)

    const refInput = useRef<HTMLDivElement>(null)
    const [running, setRunning] = useState(false)
    const [auto_spin_val, set_auto_spin_val] = useState(0)

    useEffect(() => {
        if (!(gameId === "wheel-of-fortune")) {
            setChildContent(<PageWrapper><AccessDenied /></PageWrapper>)
            return
        }
        if (Global_Vars.startLoaded) {
            // loadStartScreen()
        } else {
            let loadingSprite: PIXI.AnimatedSprite | null = null
            const background_desktop_sprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/bg-desktop.${webpORpng}`))
            const background_mobile_sprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/bg-mobile.${webpORpng}`))
            app.stage.addChild(background_desktop_sprite)
            app.stage.addChild(background_mobile_sprite)
            function resizeApp() {

                const header_bar_height = 100
                app.renderer.resize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio);
                // app.renderer.resize(window.innerWidth * Math.max(1,window.devicePixelRatio), Math.max(window.innerHeight * window.devicePixelRatio));
                // app.renderer.resolution = window.devicePixelRatio;
                const scale_x = app.screen.width / Game_Category_Dimension[game_global_vars.gameId].gameBoard.width;
                let APP_SCALE = Math.min(scale_x, (app.screen.height - Game_Category_Dimension[game_global_vars.gameId].footerBar.height * scale_x) / (Game_Category_Dimension[game_global_vars.gameId].gameBoard.height + header_bar_height))
                if (app.screen.width < app.screen.height * media_stop_mobile) {
                    APP_SCALE *= Game_Category_Config[game_global_vars.gameId].scaleFactor[0]
                    // APP_SCALE *= 1.64
                } else if (app.screen.width < app.screen.height * media_stop_tablet) {
                    APP_SCALE *= Game_Category_Config[game_global_vars.gameId].scaleFactor[1]
                } else if (app.screen.width < app.screen.height * media_stop_desktop_sm) {
                    APP_SCALE *= Game_Category_Config[game_global_vars.gameId].scaleFactor[2]
                } else if (app.screen.width < app.screen.height * 1.7) {
                    APP_SCALE *= Game_Category_Config[game_global_vars.gameId].scaleFactor[3]
                } else {
                    APP_SCALE *= Game_Category_Config[game_global_vars.gameId].scaleFactor[4]//interpolate(app.screen.width / app.screen.height, 1.7, 1.97, Game_Category_Config[game_global_vars.gameId].scaleFactor[3], Game_Category_Config[game_global_vars.gameId].scaleFactor[4])
                }

                appStage.x = (app.screen.width - Game_Category_Dimension[game_global_vars.gameId].gameBoard.width * APP_SCALE) / 2
                if (app.screen.width < app.screen.height * media_stop_tablet) {
                    appStage.y = (app.screen.height - Game_Category_Dimension[game_global_vars.gameId].gameBoard.height * APP_SCALE) / 2 -
                        scale_x * 100 * (app.screen.width < app.screen.height * media_stop_mobile ? 1 : 1.8)
                    refInput.current?.style.setProperty("display", "none")
                } else {
                    appStage.y = (app.screen.height - Game_Category_Dimension[game_global_vars.gameId].gameBoard.height * APP_SCALE) - Game_Category_Dimension[game_global_vars.gameId].footerBar.height * scale_x
                    if (Global_Vars.mainPageLoaded) {
                        refInput.current?.style.setProperty("display", "block")
                    } else {
                        setTimeout(resizeApp, 1000);
                    }
                }

                appStage.scale.set(APP_SCALE)
                refInput.current?.style.setProperty("scale", `${window.innerWidth / Game_Category_Dimension[game_global_vars.gameId].gameBoard.width}`)
                if (Global_Vars.info_dialog_wrapper_resize_callback) {
                    Global_Vars.info_dialog_wrapper_resize_callback()
                }
                background_desktop_sprite.scale.set(app.screen.width / Game_Category_Dimension[gameId].bg["desktop"].width)
                background_mobile_sprite.scale.set(app.screen.width / Game_Category_Dimension[gameId].bg["mobile"].width)
                if (app.screen.width >= app.screen.height) {
                    background_desktop_sprite.position.y = app.screen.height - app.screen.width - (Global_Vars.mainPageLoaded ? 181 * APP_SCALE : 0)
                    background_mobile_sprite.position.y = 10000000
                } else {
                    background_desktop_sprite.position.y = 10000000
                    background_mobile_sprite.position.y = app.screen.height / 5 - Game_Category_Dimension[gameId].bg["mobile"].height * app.screen.width / Game_Category_Dimension[gameId].bg["mobile"].width / 5
                }
            };
            window.onresize = resizeApp

            app.stage.addChild(appStage)
            resizeApp();
            // ! Init Splash Start
            const loadingText = new PIXI.Text(`Loading...`, loadingTextStyle);
            loadingText.anchor.set(0.5)
            loadingText.scale.set(app.screen.width > app.screen.height ? 1.5 : 2)
            loadingText.position.set(980, 550)
            const loadingSpriteBackSprite = new PIXI.Graphics()
            appStage.addChild(loadingSpriteBackSprite)
            loadingSpriteBackSprite.lineStyle(0);
            loadingSpriteBackSprite.beginFill(0x0, 1).drawRect(-4000, -6000, 9000, 13000);
            appStage.addChild(loadingText);
            PIXI.Assets.load([`${VITE_API_ASSETS_IMAGE_URL}${gameId}/${mobileORdesktop}/${webpORpng}/loading.json`]).then(() => {

                if (Global_Vars.initLoaded) return
                const frames = [];
                for (let i = 0; i < 34; i++) {
                    const val = i < 10 ? `0${i}` : i;
                    frames.push(PIXI.Texture.from(`loading-${val}.${webpORpng}`));
                }
                const loadingSprite = new PIXI.AnimatedSprite(frames);
                loadingSprite.animationSpeed = 0.5;
                loadingSprite.anchor.set(0.5)
                loadingSprite.scale.set(app.screen.width > app.screen.height ? 2 : 3)
                loadingSprite.play();
                loadingSprite.position.set(970, 650)
                appStage.addChild(loadingSprite);
            });

            // ! Init Splash End
            // ! Info Splash Start
            PIXI.Assets.load([
                `${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/loading-bar-anim.json`,
                `${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/title.${webpORpng}`,
                `${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/loading-text-anim.json`
            ]).then(() => {
                if (Global_Vars.startLoaded) return
                Global_Vars.initLoaded = true
                const _bar_frames = [];
                for (let i = 1; i <= 33; i++) {
                    _bar_frames.push(PIXI.Texture.from(`loading-bar-anim-${i}.${webpORpng}`));
                }
                const _loading_text_frames = [];
                for (let i = 1; i <= 3; i++) {
                    _loading_text_frames.push(PIXI.Texture.from(`loading-text-anim-${i}.${webpORpng}`));
                }
                const splashContainer = new PIXI.Container();

                const titleSprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/title.${webpORpng}`))
                titleSprite.position.set(280, 150)
                titleSprite.scale.set(1.6)
                titleSprite.anchor.set(0.5)

                const loadingTextSprite = new PIXI.AnimatedSprite(_loading_text_frames);
                loadingTextSprite.animationSpeed = 0.02;
                loadingTextSprite.play();
                loadingTextSprite.position.set(280, 450)
                loadingTextSprite.scale.set(0.5)
                loadingTextSprite.anchor.set(0.5)

                loadingSprite = new PIXI.AnimatedSprite(_bar_frames);
                loadingSprite.animationSpeed = 1;
                loadingSprite.play();
                loadingSprite.position.set(280, 500)
                loadingSprite.anchor.set(0.5)

                splashContainer.position.set(680, 300)

                splashContainer.addChild(loadingSprite)
                splashContainer.addChild(titleSprite)
                splashContainer.addChild(loadingTextSprite)
                appStage.removeChildren();
                appStage.addChild(splashContainer);
            });
            // ! Info Splash END
            PIXI.Assets.load(getAssetUrls(gameId), (progress) => {
                loadingSprite?.gotoAndStop(Math.min(Math.floor(progress * 33), 32))
            }).then(() => loadStartScreen(gameParams, setBalance, setChildContent, setFullScreen, setBetVal, setRunning, set_auto_spin_val));
        }
    }, [])
    // Game Loop.
    app.ticker.add(animateAllTweenings);
    app.ticker.add(animateWheelTweenings);
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div ref={refInput} className='absolute origin-bottom-left left-0 w-0 h-0 bottom-0 pl-[0px] pb-[80px] z-30' style={{ fontFamily: "Myriad Pro", textShadow: "2px 2px black", display: "none" }}>
                <input value={betVal} disabled={running || auto_spin_val !== 0} onChange={(e) => setBetVal(Math.min(game_global_vars.stake.max, parseInt(e.target.value || "0")))} className='outline-none ml-[465px] bg-transparent text-[36px] leading-[30px] text-center text-white disabled:text-white/70' size={7} />
            </div>
            <SVGs />
            <FullscreenButton setChildContent={setChildContent} setBetVal={setBetVal} />
            {childContent}
        </>
    )
}
export default GamePIXI;
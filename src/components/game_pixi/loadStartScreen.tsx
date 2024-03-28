import { Global_Vars, PIXI, app, appStage } from "../../renderer";
import { fadeInOut, loadSound, media_stop_mobile, media_stop_tablet, mobileORdesktop, tweenTo, webpORpng } from "../../utils/utils";
import loadMainScreen from "./loadMainScreen";
import { gameParamsType } from "../../store/types";
import { game_global_vars } from "../../config";
import { Dispatch, SetStateAction } from "react";
const VITE_API_ASSETS_IMAGE_URL = import.meta.env.VITE_API_ASSETS_IMAGE_URL

export async function loadStartScreen(gameParams: gameParamsType, setBalance: (balanceOrCb: number | ((v: number) => number)) => void, setChildContent: Dispatch<SetStateAction<JSX.Element>>, setFullScreen: Dispatch<SetStateAction<boolean>>, setBetVal: Dispatch<SetStateAction<number>>, setRunning: React.Dispatch<React.SetStateAction<boolean>>, set_auto_spin_val: React.Dispatch<React.SetStateAction<number>>) {
  Global_Vars.startLoaded = true;
  loadSound()
  appStage.removeChildren()
  const popupSprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/popup.${webpORpng}`))


  const buttonStart = new PIXI.Sprite(PIXI.Texture.from(`button-start.${webpORpng}`))

  const wrapper = new PIXI.Container()
  const startBG = new PIXI.Graphics()
  startBG.clear().beginFill(0x000000, 0.3).drawRect(-1000, -1000, 5000, 5000)
  wrapper.addChild(startBG)
  wrapper.addChild(popupSprite);
  wrapper.addChild(buttonStart);
  appStage.addChild(wrapper);
  popupSprite.anchor.set(0.5)
  buttonStart.anchor.set(0.5)
  // logoJungleSprite.anchor.set(0.5)
  buttonStart.eventMode = 'static'
  buttonStart.cursor = 'pointer'
  buttonStart.on('pointerdown', () => {
    tweenTo(app.stage, 'alpha', 0, 1, 1000, fadeInOut(), null, null)
    setTimeout(() => loadMainScreen(gameParams, setBalance, setChildContent, setFullScreen, setBetVal, setRunning,set_auto_spin_val), 400);
  });
  (Global_Vars.info_dialog_wrapper_resize_callback = function () {
    if (app.screen.width < app.screen.height * media_stop_mobile) {
      // portalSprite2.position.set(600, 360)
      popupSprite.scale.set(0.5)
      popupSprite.position.set(962, 500)
      buttonStart.position.set(970, 700);
      buttonStart.scale.set(0.5)

    } else if (app.screen.width < app.screen.height * media_stop_tablet) {
      // portalSprite2.position.set(600, 360)
      popupSprite.scale.set(0.5)
      popupSprite.position.set(962, 500)
      buttonStart.position.set(970, 700);
      buttonStart.scale.set(0.5)

    }
    else {
      // portalSprite2.position.set(1000, 200)
      popupSprite.position.set(965, 500)
      popupSprite.scale.set(0.6)
      buttonStart.position.set(950, 750);
      buttonStart.scale.set(0.7)

    }
  })();

}
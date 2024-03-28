import { Game_Category_Config, Game_Category_Dimension, allTweenings, game_global_vars, wheelLocation, wheelTweenings } from "../../config";
import { Global_Vars, PIXI, app, appStage } from "../../renderer";
import keyboard from "../../utils/keyboard";
import { media_stop_mobile, gen_autospin_item, playSound, media_stop_tablet, webpORpng, mobileORdesktop, showToast, tweenTo, backout, interpolate, checkDevice } from "../../utils/utils";
import { gameParamsType } from "../../store/types";
import * as React from "react"
import RuleDialog from "./RuleDialog";
import SettingDialog from "./SettingDialog";
import AutoSpinDialog from "./AutoSpinDialog";
import ChipDialog from "./ChipDialog";
import BetHistory from "./BetHistory";
import axios from "axios";
const VITE_API_ASSETS_IMAGE_URL = import.meta.env.VITE_API_ASSETS_IMAGE_URL
const loadMainScreen = (gameParams: gameParamsType, setBalance: (balanceOrCb: number | ((v: number) => number)) => void, setChildContent: React.Dispatch<React.SetStateAction<JSX.Element>>, setFullScreen: React.Dispatch<React.SetStateAction<boolean>>, setBetVal: React.Dispatch<React.SetStateAction<number>>, setRunning: React.Dispatch<React.SetStateAction<boolean>>, set_auto_spin_val: React.Dispatch<React.SetStateAction<number>>) => {

    if (!checkDevice().iPhone)
        setFullScreen(true)
    game_global_vars.pf_hash = gameParams.hash
    Global_Vars.mainPageLoaded = true;
    appStage.removeChildren();
    playSound('bg')
    const WheelContainer = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/gear-bg.${webpORpng}`))
    WheelContainer.position.set(960, 450)
    WheelContainer.anchor.set(0.5)
    appStage.addChild(WheelContainer)
    const gear_L1_sprite = new PIXI.Sprite(PIXI.Texture.from(`gear-L-1.${webpORpng}`))
    const gear_L11_sprite = new PIXI.Sprite(PIXI.Texture.from(`gear-L-1-1.${webpORpng}`))
    const gear_L2_sprite = new PIXI.Sprite(PIXI.Texture.from(`gear-L-2.${webpORpng}`))
    const gear_L3_sprite = new PIXI.Sprite(PIXI.Texture.from(`gear-L-3.${webpORpng}`))
    const gear_R1_sprite = new PIXI.Sprite(PIXI.Texture.from(`gear-R-1.${webpORpng}`))
    const gear_R2_sprite = new PIXI.Sprite(PIXI.Texture.from(`gear-R-2.${webpORpng}`))
    const gear_R3_sprite = new PIXI.Sprite(PIXI.Texture.from(`gear-R-3.${webpORpng}`))
    const gear_R31_sprite = new PIXI.Sprite(PIXI.Texture.from(`gear-R-3-1.${webpORpng}`))
    const wheel_sprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/wheel.${webpORpng}`))
    const wheel_center_sprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/wheel-center.${webpORpng}`))
    const wheel_over_sprite = new PIXI.Sprite(PIXI.Texture.from(`wheel-over-green.${webpORpng}`))
    const _title_frames = [];
    for (let i = 1; i <= 20; i++) {
        _title_frames.push(PIXI.Texture.from(`splash-title-anim-${i}.${webpORpng}`));
    }
    const titleSprite = new PIXI.AnimatedSprite(_title_frames);
    titleSprite.animationSpeed = 0.2;
    titleSprite.play();
    titleSprite.scale.set(0.8)
    titleSprite.anchor.set(0.5)
    const wheel_emerald_sprite = new PIXI.Sprite(PIXI.Texture.from(`wheel-emerald-cyan.${webpORpng}`))

    app.ticker.add((delta) => {
        gear_L1_sprite.angle -= delta * 0.4
        gear_L11_sprite.angle += delta * 0.4
        gear_L2_sprite.angle += delta * 0.36
        gear_L3_sprite.angle -= delta * 0.45
        gear_R1_sprite.angle += delta * 0.27
        gear_R2_sprite.angle -= delta * 0.27
        gear_R3_sprite.angle += delta * 0.53
        gear_R31_sprite.angle -= delta * 0.4
    })

    wheel_over_sprite.alpha = 0
    wheel_emerald_sprite.alpha = 0
    titleSprite.alpha = 0

    WheelContainer.addChild(gear_L1_sprite)
    WheelContainer.addChild(gear_L11_sprite)
    WheelContainer.addChild(gear_L2_sprite)
    WheelContainer.addChild(gear_L3_sprite)
    WheelContainer.addChild(gear_R1_sprite)
    WheelContainer.addChild(gear_R2_sprite)
    WheelContainer.addChild(gear_R3_sprite)
    WheelContainer.addChild(gear_R31_sprite)
    WheelContainer.addChild(wheel_sprite)
    WheelContainer.addChild(wheel_over_sprite)
    WheelContainer.addChild(wheel_center_sprite)
    WheelContainer.addChild(titleSprite)
    WheelContainer.addChild(wheel_emerald_sprite)

    gear_L1_sprite.anchor.set(0.5)
    gear_L11_sprite.anchor.set(0.5)
    gear_L2_sprite.anchor.set(0.5)
    gear_L3_sprite.anchor.set(0.5)
    gear_R1_sprite.anchor.set(0.5)
    gear_R2_sprite.anchor.set(0.5)
    gear_R3_sprite.anchor.set(0.5)
    gear_R31_sprite.anchor.set(0.5)
    wheel_sprite.anchor.set(0.5)
    wheel_center_sprite.anchor.set(0.5)
    wheel_over_sprite.anchor.set(0.5)
    wheel_emerald_sprite.anchor.set(0.5)

    gear_L1_sprite.position.set(-306, -293)
    gear_L11_sprite.position.set(-306, -293)
    gear_L2_sprite.position.set(-483, -60)
    gear_L3_sprite.position.set(-402, 182)
    gear_R1_sprite.position.set(350, -235)
    gear_R2_sprite.position.set(456, 112)
    gear_R3_sprite.position.set(290, 320)
    gear_R31_sprite.position.set(290, 320)
    wheel_emerald_sprite.position.set(0, 100)

    const backgroundFooterSprite = new PIXI.Sprite(PIXI.Texture.from(`${VITE_API_ASSETS_IMAGE_URL}${game_global_vars.gameId}/${mobileORdesktop}/${webpORpng}/background-footer.${webpORpng}`))
    const backgroundFooterSpriteChildrenWrapper = new PIXI.Container()
    backgroundFooterSprite.addChild(backgroundFooterSpriteChildrenWrapper)
    backgroundFooterSpriteChildrenWrapper.position.set(50, 0)
    app.stage.addChild(backgroundFooterSprite);

    const mobile_win_hold_spin_text_wrapper = new PIXI.Container()
    const total_win_static_text = new PIXI.Text('HOLD SPIN TO QUICK SPINS', { fontFamily: "Francois One", fontSize: 32, fill: "#F3C996", stroke: '#000000', strokeThickness: 2, });
    const total_win_text = new PIXI.Text('', { fontFamily: "Myriad Pro", fontSize: 56, fill: 0xffffff, stroke: '#000000', strokeThickness: 2, });

    const mobile_win_hold_spin_text_upper = new PIXI.Text('HOLD SPIN', { fontFamily: "Francois One", fontSize: 32, fill: "#F3C996", stroke: '#000000', strokeThickness: 2, });
    const mobile_win_hold_spin_text_down = new PIXI.Text("", { fontFamily: "Myriad Pro", fontSize: 32, fill: "#F3C996", stroke: '#000000', strokeThickness: 2, });
    game_global_vars.mobile_win_hold_spin_text_upper = mobile_win_hold_spin_text_upper
    game_global_vars.mobile_win_hold_spin_text_down = mobile_win_hold_spin_text_down

    backgroundFooterSpriteChildrenWrapper.addChild(total_win_static_text)
    backgroundFooterSpriteChildrenWrapper.addChild(total_win_text)
    backgroundFooterSpriteChildrenWrapper.addChild(mobile_win_hold_spin_text_wrapper)

    const bg_mobile_win_hold_spin_text = new PIXI.Graphics()
    mobile_win_hold_spin_text_wrapper.addChild(bg_mobile_win_hold_spin_text)
    mobile_win_hold_spin_text_wrapper.addChild(mobile_win_hold_spin_text_upper)
    mobile_win_hold_spin_text_wrapper.addChild(mobile_win_hold_spin_text_down)

    total_win_static_text.anchor.set(0.5)
    total_win_text.anchor.set(0.5)
    total_win_static_text.position.set(1190, 80)
    total_win_text.position.set(1190, 130)
    total_win_static_text.scale.set(1)
    mobile_win_hold_spin_text_upper.anchor.set(0.5)
    mobile_win_hold_spin_text_upper.position.set(110, 40)
    mobile_win_hold_spin_text_down.anchor.set(0.5)
    mobile_win_hold_spin_text_down.position.set(110, 85)
    bg_mobile_win_hold_spin_text.lineStyle(2, 0xffffff);
    bg_mobile_win_hold_spin_text.beginFill(0x000000, 0.3)
        .drawRoundedRect(2, 2, 216, 120, 13)

    const button_mobile_A = new PIXI.Sprite(PIXI.Texture.from(`button-mobile-A.${webpORpng}`))
    const button_mobile_chip = new PIXI.Sprite(PIXI.Texture.from(`button-mobile-chip.${webpORpng}`))
    const button_mobile_i = new PIXI.Sprite(PIXI.Texture.from(`button-mobile-i.${webpORpng}`))
    const button_mobile_spin = new PIXI.Sprite(PIXI.Texture.from(`button-mobile-reload.${webpORpng}`))
    const button_mobile_setting = new PIXI.Sprite(PIXI.Texture.from(`button-mobile-setting.${webpORpng}`))
    const button_mobile_wallet = new PIXI.Sprite(PIXI.Texture.from(`button-mobile-wallet.${webpORpng}`))

    const button_mobile_A_bg = new PIXI.Graphics()
    const button_mobile_chip_bg = new PIXI.Graphics()
    const button_mobile_spin_bg = new PIXI.Graphics()
    const button_mobile_info_bg = new PIXI.Graphics()
    const button_mobile_setting_bg = new PIXI.Graphics()
    const button_mobile_wallet_bg = new PIXI.Graphics()
    const button_mobile_i_bg = new PIXI.Graphics()

    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_A_bg)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_chip_bg)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_spin_bg)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_setting_bg)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_wallet_bg)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_i_bg)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_info_bg)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_setting)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_A)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_spin)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_chip)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_i)
    backgroundFooterSpriteChildrenWrapper.addChild(button_mobile_wallet)


    button_mobile_spin.on('pointerdown', () => {
        startPlay()
    })
    button_mobile_i.on('pointerdown', () => {
        setChildContent(
            <RuleDialog setChildContent={setChildContent} />
        )
    })
    button_mobile_wallet.on('pointerdown', () => {
        setChildContent(<BetHistory setChildContent={setChildContent} />)
    })
    button_mobile_setting.on('pointerdown', () => {
        setting_sprite_on_pointerdown()
    })
    button_mobile_chip.on('pointerdown', () => {
        button_chip_sprite_on_pointerdown()
    })
    button_mobile_A.on('pointerdown', () => {
        button_auto_spin_sprite_on_pointerdown()
    })

    const info_at_statusbarSprite = new PIXI.Sprite(PIXI.Texture.from(`button-info-bar-empty.${webpORpng}`))
    info_at_statusbarSprite.position.set(-5, 75)
    info_at_statusbarSprite.scale.set(1.3)
    backgroundFooterSpriteChildrenWrapper.addChild(info_at_statusbarSprite)
    info_at_statusbarSprite.eventMode = 'static';
    info_at_statusbarSprite.cursor = 'pointer';
    // status_bar_wrapper.interactive = false
    info_at_statusbarSprite.on('pointerdown', () => {
        setChildContent(
            <RuleDialog setChildContent={setChildContent} />
        )
    }).on('pointerover', () => {
        info_at_statusbarSprite.texture = PIXI.Texture.from(`button-info-bar.${webpORpng}`)
    }).on('pointerout', () => {
        info_at_statusbarSprite.texture = PIXI.Texture.from(`button-info-bar-empty.${webpORpng}`)
    })

    const setting_sprite_on_pointerdown = () => {
        setChildContent(<SettingDialog setChildContent={setChildContent} setBetVal={setBetVal} mobile_win_hold_spin_text_upper={mobile_win_hold_spin_text_upper} mobile_win_hold_spin_text_down={mobile_win_hold_spin_text_down} />)
    }

    const auto_spin_wrapper = new PIXI.Container()
    auto_spin_wrapper.eventMode = 'static'
    auto_spin_wrapper.scale.set(0)
    auto_spin_wrapper.pivot.set(450, 250)
    const outer_bg_auto_spin_wrap = new PIXI.Graphics()
    outer_bg_auto_spin_wrap.lineStyle(0);
    outer_bg_auto_spin_wrap.beginFill(0x222222, 0.01).drawRect(-4000, -4000, 8000, 8000);
    outer_bg_auto_spin_wrap.eventMode = 'static';
    outer_bg_auto_spin_wrap.cursor = 'pointer';
    outer_bg_auto_spin_wrap.on('pointerdown', (event) => {
        if (event.target === outer_bg_auto_spin_wrap) {
            if (auto_spin_wrapper.scale.x !== 0) {
                tweenTo(auto_spin_wrapper.scale, 'x', 1, 0, 500, backout(1), null, null)
                tweenTo(auto_spin_wrapper.scale, 'y', 1, 0, 500, backout(1), null, null)
            }
        }
    })
    auto_spin_wrapper.addChild(outer_bg_auto_spin_wrap)
    const bg_auto_spin_wrap = new PIXI.Graphics()
    bg_auto_spin_wrap.lineStyle(0);
    bg_auto_spin_wrap.beginFill(0x222222, 1).drawRoundedRect(0, 0, 450, 250, 5);
    auto_spin_wrapper.addChild(bg_auto_spin_wrap)
    const autospin_static_text = new PIXI.Text("Autospin Settings", { fontFamily: "Francois One", fontSize: 42, fill: 0xffffff });
    autospin_static_text.position.set(20, 10)
    auto_spin_wrapper.addChild(autospin_static_text)
    const autospin_static_text_2 = new PIXI.Text("Number of Rounds", { fontFamily: "Francois One", fontSize: 28, fill: 0x888888 });
    autospin_static_text_2.position.set(20, 64)
    auto_spin_wrapper.addChild(autospin_static_text_2)

    const auto_spin_item_arr_1 = [10, 25, 50, 100, 250]
    auto_spin_item_arr_1.forEach((item, i) => {
        const button_auto_spin_item = gen_autospin_item(String(item))
        button_auto_spin_item.position.set(20 + i * 80, 110)
        button_auto_spin_item.eventMode = 'static';
        button_auto_spin_item.cursor = 'pointer';
        button_auto_spin_item.on('pointerdown', () => {
            game_global_vars.auto_spin_val = item; set_auto_spin_val(item)
            startPlay()
            tweenTo(auto_spin_wrapper.scale, 'x', 1, 0, 500, backout(1), null, null)
            tweenTo(auto_spin_wrapper.scale, 'y', 1, 0, 500, backout(1), null, null)
        })
        auto_spin_wrapper.addChild(button_auto_spin_item)
    })
    const auto_spin_item_arr_2 = [500, 750, 1000, -1]
    auto_spin_item_arr_2.forEach((item, i) => {
        const button_auto_spin_item = gen_autospin_item(item > 0 ? String(item) : "∞")
        button_auto_spin_item.position.set(60 + i * 80, 170)
        button_auto_spin_item.eventMode = 'static';
        button_auto_spin_item.cursor = 'pointer';
        button_auto_spin_item.on('pointerdown', () => {
            game_global_vars.auto_spin_val = item; set_auto_spin_val(item)
            startPlay()
            tweenTo(auto_spin_wrapper.scale, 'x', 1, 0, 500, backout(1), null, null)
            tweenTo(auto_spin_wrapper.scale, 'y', 1, 0, 500, backout(1), null, null)
        })
        auto_spin_wrapper.addChild(button_auto_spin_item)
    })
    backgroundFooterSpriteChildrenWrapper.addChild(auto_spin_wrapper)
    const button_auto_spin_sprite = new PIXI.Sprite(PIXI.Texture.from(`button-auto-spin-empty.${webpORpng}`))
    button_auto_spin_sprite.position.set(1690, 50)
    button_auto_spin_sprite.eventMode = 'static';
    button_auto_spin_sprite.cursor = 'pointer';
    const button_auto_spin_sprite_on_pointerdown = () => {
        if (game_global_vars.auto_spin_val > 0 || game_global_vars.auto_spin_val === -1) {
            if (game_global_vars.timeout_id) clearTimeout(game_global_vars.timeout_id)
            game_global_vars.auto_spin_val = 0; set_auto_spin_val(0)
            auto_spin_val_text_sprite.text = ""
            button_auto_spin_sprite.texture = PIXI.Texture.from(`button-auto-spin-empty.${webpORpng}`)
            button_mobile_A.texture = PIXI.Texture.from(`button-mobile-A.${webpORpng}`)
            adjust_eventmode_arr.forEach(item => item.eventMode = 'static')
        } else {
            if (game_global_vars.running) return
            const scale = app.screen.width > app.screen.height * media_stop_mobile ? 1 : 2
            if (auto_spin_wrapper.scale.x === 0) {
                if (app.screen.width > app.screen.height * media_stop_tablet) {
                    tweenTo(auto_spin_wrapper.scale, 'x', 0, scale, 500, backout(1), null, null)
                    tweenTo(auto_spin_wrapper.scale, 'y', 0, scale, 500, backout(1), null, null)
                } else {
                    setChildContent(<AutoSpinDialog setChildContent={setChildContent} params={{ game_global_vars, startPlay, set_auto_spin_val }} />)
                }

            } else //if (auto_spin_wrapper.scale.x === 1)
            {
                tweenTo(auto_spin_wrapper.scale, 'x', scale, 0, 500, backout(1), null, null)
                tweenTo(auto_spin_wrapper.scale, 'y', scale, 0, 500, backout(1), null, null)
            }
        }
        const scale = app.screen.width > app.screen.height * media_stop_mobile ? 1 : 2
        if (auto_spin_wrapper.scale.x !== 0) {
            tweenTo(auto_spin_wrapper.scale, 'x', scale, 0, 500, backout(1), null, null)
            tweenTo(auto_spin_wrapper.scale, 'y', scale, 0, 500, backout(1), null, null)
        }
    }
    button_auto_spin_sprite.on('pointerdown', button_auto_spin_sprite_on_pointerdown)
    backgroundFooterSpriteChildrenWrapper.addChild(button_auto_spin_sprite);
    const auto_spin_val_text_sprite = new PIXI.Text("", { fontFamily: "Francois One", fontSize: 28, fill: 0xffffff });
    auto_spin_val_text_sprite.anchor.set(0.5)
    backgroundFooterSpriteChildrenWrapper.addChild(auto_spin_val_text_sprite);

    const button_spin_sprite = new PIXI.Sprite(PIXI.Texture.from(`button-spin-empty.${webpORpng}`))
    button_spin_sprite.position.set(1525, 40)
    button_spin_sprite.eventMode = 'static';
    button_spin_sprite.cursor = 'pointer';
    button_spin_sprite.on('pointerdown', () => {
        startPlay()
    }).on('pointerover', () => {
        button_spin_sprite.texture = PIXI.Texture.from(`button-spin.${webpORpng}`)
    }).on('pointerout', () => {
        button_spin_sprite.texture = PIXI.Texture.from(`button-spin-empty.${webpORpng}`)
    })
    backgroundFooterSpriteChildrenWrapper.addChild(button_spin_sprite);

    const button_chip_sprite_on_pointerdown = () => {
        setChildContent(<ChipDialog setChildContent={setChildContent} params={{ betVal: game_global_vars.betVal, setBetVal, mobile_win_hold_spin_text_upper, mobile_win_hold_spin_text_down }} />)
    }
    const bet_up_sprite = new PIXI.Sprite(PIXI.Texture.from(`button-up-down.${webpORpng}`))
    bet_up_sprite.position.set(588, 74)
    bet_up_sprite.scale.set(1.8, 2)
    backgroundFooterSpriteChildrenWrapper.addChild(bet_up_sprite)
    bet_up_sprite.eventMode = 'static';
    bet_up_sprite.cursor = 'pointer';
    bet_up_sprite.on('pointerdown', () => {
        setBetVal(v => Math.max(game_global_vars.stake.min, Math.min(game_global_vars.stake.max, v + 100)))
    })
    const bet_down_sprite = new PIXI.Sprite(PIXI.Texture.from(`button-up-down.${webpORpng}`))

    bet_down_sprite.position.set(350, 74)
    bet_down_sprite.scale.set(1.8, 2)
    backgroundFooterSpriteChildrenWrapper.addChild(bet_down_sprite)
    bet_down_sprite.eventMode = 'static';
    bet_down_sprite.cursor = 'pointer';
    bet_down_sprite.on('pointerdown', () => {
        setBetVal(v => Math.max(game_global_vars.stake.min, Math.min(game_global_vars.stake.max, v - 100)))
    })

    const bet_min_sprite = new PIXI.Sprite(PIXI.Texture.from(`button-up-down.${webpORpng}`))

    bet_min_sprite.position.set(205, 47)
    bet_min_sprite.scale.set(3, 3.5)
    backgroundFooterSpriteChildrenWrapper.addChild(bet_min_sprite)
    bet_min_sprite.eventMode = 'static';
    bet_min_sprite.cursor = 'pointer';
    bet_min_sprite.on('pointerdown', () => {
        setBetVal(game_global_vars.stake.min)
    })
    const bet_max_sprite = new PIXI.Sprite(PIXI.Texture.from(`button-up-down.${webpORpng}`))

    bet_max_sprite.position.set(685, 47)
    bet_max_sprite.scale.set(3, 3.5)
    backgroundFooterSpriteChildrenWrapper.addChild(bet_max_sprite)
    bet_max_sprite.eventMode = 'static';
    bet_max_sprite.cursor = 'pointer';
    bet_max_sprite.on('pointerdown', () => {
        setBetVal(game_global_vars.stake.max)
    })

    // !button_mobile_event_listeners
    button_mobile_spin.eventMode = button_mobile_wallet.eventMode = button_mobile_i.eventMode = button_mobile_setting.eventMode = button_mobile_chip.eventMode = button_mobile_A.eventMode = 'static';
    button_mobile_spin.cursor = button_mobile_wallet.cursor = button_mobile_i.cursor = button_mobile_setting.cursor = button_mobile_chip.cursor = button_mobile_A.cursor = 'pointer';
    (Global_Vars.info_dialog_wrapper_resize_callback = function () {

        const FOOTER_SCALE = app.screen.width / Game_Category_Dimension[game_global_vars.gameId].footerBar.width
        backgroundFooterSprite.scale.set(FOOTER_SCALE)
        const control_pos_web = (app.screen.width < app.screen.height * media_stop_tablet) ? backgroundFooterSprite.height : 0
        backgroundFooterSprite.position.set((app.screen.width - Game_Category_Dimension[game_global_vars.gameId].footerBar.width * FOOTER_SCALE) / 2, app.screen.height - backgroundFooterSprite.height + control_pos_web)

        auto_spin_wrapper.position.set(1800, 0)

        // ! ###########################################################################################   2
        if (app.screen.width < app.screen.height * media_stop_mobile) {
            const offset_factor = 4
            const setting_chip_offset = interpolate(app.screen.width / app.screen.height, 0.3, media_stop_mobile, app.screen.height / offset_factor, 0)
            const A_H_offset = interpolate(app.screen.width / app.screen.height, 0.3, media_stop_mobile, app.screen.height / offset_factor / 2, 0)
            auto_spin_val_text_sprite.position.set(350, -400 - A_H_offset)
            auto_spin_val_text_sprite.scale.set(4)
            button_mobile_A_bg.clear().lineStyle(6, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 350, 200, 100).position.set(-170, -480 - A_H_offset)
            button_mobile_chip_bg.clear().lineStyle(6, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 350, 200, 100).position.set(1650, -720 - setting_chip_offset)
            button_mobile_spin_bg.clear().lineStyle(6, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 520, 520, 260).position.set(680, -770 - A_H_offset)
            button_mobile_info_bg.clear().lineStyle(6, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 350, 200, 100).position.set(1650, -480 - A_H_offset)
            button_mobile_setting_bg.clear().lineStyle(6, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 350, 200, 100).position.set(-170, -720 - setting_chip_offset)
            button_mobile_wallet_bg.clear().lineStyle(6, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 350, 200, 100).position.set(-100, -300 + 10000)
            button_mobile_i_bg.clear().lineStyle(6, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 350, 200, 100).position.set(1650, -300 + 10000)
            button_mobile_setting.scale.set(3)
            button_mobile_A.scale.set(3)
            button_mobile_spin.scale.set(5)
            button_mobile_chip.scale.set(3)
            button_mobile_setting.position.set(-20, -700 - setting_chip_offset)
            button_mobile_A.position.set(-20, -460 - A_H_offset)
            button_mobile_spin.position.set(750, -700 - A_H_offset)
            button_mobile_chip.position.set(1700, -700 - setting_chip_offset)

            button_mobile_i.scale.set(3)
            button_mobile_wallet.scale.set(3)
            button_mobile_wallet.position.set(50, -280 + 10000)
            button_mobile_i.position.set(1700, -460 - A_H_offset)

        } else if (app.screen.width < app.screen.height * media_stop_tablet) {
            const mobile_button_offset = interpolate(app.screen.width / app.screen.height, media_stop_mobile, media_stop_tablet, 300, 100)
            auto_spin_val_text_sprite.position.set(618, -200 - mobile_button_offset)
            auto_spin_val_text_sprite.scale.set(2)
            button_mobile_A_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 140, 140, 70).position.set(252, -139 - mobile_button_offset)
            button_mobile_chip_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 140, 140, 70).position.set(550, -138 - mobile_button_offset)
            button_mobile_spin_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 220, 220, 110).position.set(840, -175 - mobile_button_offset)
            button_mobile_info_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 140, 140, 70).position.set(1200, -138 - mobile_button_offset)
            button_mobile_setting_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 140, 140, 70).position.set(1500, -138 - mobile_button_offset)
            button_mobile_wallet_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 300, 140, 70).position.set(-100, 10000)
            button_mobile_i_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 300, 140, 70).position.set(1700, 10000)
            button_mobile_setting.scale.set(2)
            button_mobile_A.scale.set(2)
            button_mobile_spin.scale.set(2)
            button_mobile_chip.scale.set(2)
            button_mobile_setting.position.set(270, -120 - mobile_button_offset)
            button_mobile_A.position.set(570, -120 - mobile_button_offset)
            button_mobile_spin.position.set(870, -140 - mobile_button_offset)
            button_mobile_chip.position.set(1220, -120 - mobile_button_offset)

            button_mobile_i.scale.set(2)
            button_mobile_wallet.scale.set(2)
            const f_offset = 150;//game_global_vars.isFullScreen ? 0 : 150
            button_mobile_wallet.position.set(250 - f_offset, -1850 * app.screen.height / app.screen.width + 10000)
            button_mobile_i.position.set(1520, -120 - mobile_button_offset)
        }
        else {
            auto_spin_val_text_sprite.position.set(1743, 20)
            auto_spin_val_text_sprite.scale.set(1)
            button_mobile_A_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 140, 140, 70).position.set(255, 188)
            button_mobile_chip_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 140, 140, 70).position.set(550, 188)
            button_mobile_spin_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 220, 220, 110).position.set(840, 225)
            button_mobile_info_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 140, 140, 70).position.set(1200, 188)
            button_mobile_setting_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 140, 140, 70).position.set(1500, 188)
            button_mobile_wallet_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 300, 140, 70).position.set(-100, 10000)
            button_mobile_i_bg.clear().lineStyle(2, 0xffffff).beginFill(0x000000, 0.3).drawRoundedRect(0, 0, 300, 140, 70).position.set(1700, 10000)
            button_mobile_setting.scale.set(2)
            button_mobile_A.scale.set(2)
            button_mobile_spin.scale.set(2)
            button_mobile_chip.scale.set(2)
            button_mobile_setting.position.set(270, 1700)
            button_mobile_A.position.set(570, 1700)
            button_mobile_spin.position.set(870, 1900)
            button_mobile_chip.position.set(1220, 1700)

            button_mobile_i.scale.set(2)
            button_mobile_wallet.scale.set(2)
            button_mobile_wallet.position.set(100, 10000)
            button_mobile_i.position.set(250, 10000)
        }
        // ! ###########################################################################################   2
        // ! ###########################################################################################   3
        if (app.screen.width < app.screen.height * media_stop_mobile) {
            mobile_win_hold_spin_text_wrapper.position.set(570, 100 - 1800 * app.screen.height / app.screen.width)
            mobile_win_hold_spin_text_wrapper.scale.set(3)
        } else if (app.screen.width < app.screen.height * media_stop_tablet) {
            const txt_offset = interpolate(app.screen.width / app.screen.height, media_stop_mobile, media_stop_tablet, 350, 100)
            mobile_win_hold_spin_text_wrapper.position.set(770, -430 - txt_offset)
            mobile_win_hold_spin_text_wrapper.scale.set(1.6)
        }
        else {
            mobile_win_hold_spin_text_wrapper.position.set(750, 1650)
            mobile_win_hold_spin_text_wrapper.scale.set(1.5)
        }
        // ! ###########################################################################################   3
    })()

    const spaceKey: any = keyboard(" ")
    spaceKey.press = startPlay;
    async function startPlay() {

        if (game_global_vars.betVal < game_global_vars.stake.min) {
            showToast(`Bet amount is less than min stake amount ${game_global_vars.stake.min}!`)
            game_global_vars.auto_spin_val = 0; set_auto_spin_val(0)
            return
        }
        if (game_global_vars.betVal > game_global_vars.stake.max) {
            showToast(`Bet amount exceeds max stake amount!${game_global_vars.stake.max}`)
            game_global_vars.auto_spin_val = 0; set_auto_spin_val(0)
            return
        }
        if (game_global_vars.balance - game_global_vars.betVal < 0) {
            game_global_vars.auto_spin_val = 0; set_auto_spin_val(0)
            showToast(`Insufficent balance!`)
            return
        }
        if (game_global_vars.running) return;
        game_global_vars.running = true;
        game_global_vars.timeout_id = null
        setRunning(true)
        if (game_global_vars.auto_spin_val > 0) {
            auto_spin_val_text_sprite.text = String(game_global_vars.auto_spin_val)
            button_auto_spin_sprite.texture = PIXI.Texture.from(`button-auto-spin-stop.${webpORpng}`)
            button_mobile_A.texture = PIXI.Texture.from(`button-mobile-stop.${webpORpng}`)
        } else if (game_global_vars.auto_spin_val === -1) {
            auto_spin_val_text_sprite.text = "∞"
            button_auto_spin_sprite.texture = PIXI.Texture.from(`button-auto-spin-stop.${webpORpng}`)
            button_mobile_A.texture = PIXI.Texture.from(`button-mobile-stop.${webpORpng}`)
        }
        if (game_global_vars.auto_spin_val > 0) game_global_vars.auto_spin_val--;
        setBalance(v => v - game_global_vars.betVal); game_global_vars.balance -= game_global_vars.betVal
        wheelTweenings.push({ wheel: wheel_sprite, shouldEnd: false, startTime: Date.now(), targetAngle: 360, onComplete })
        wheel_over_sprite.alpha = 0
        wheel_emerald_sprite.alpha = 0
        titleSprite.alpha = 0

        adjust_eventmode_arr.forEach(item => item.eventMode = ((item === button_mobile_A || item === button_auto_spin_sprite) && (game_global_vars.auto_spin_val > 0 || game_global_vars.auto_spin_val === -1)) ? 'static' : 'none')

        playSound('spin')

        try {
            let hash = game_global_vars.pf_hash
            let { data: { status, message } } = await axios.post('/api/games/lucky-wheel/play/verify', {
                "hash": hash,//hash,//
                "bet": game_global_vars.betVal,
                "variation": Game_Category_Config[game_global_vars.gameId].api.variation,
                "variation_type": Game_Category_Config[game_global_vars.gameId].api.variation_type
            })
            if (!status) {
                const { data: { hash: _hash } } = await axios.post('/api/user/games/create', {
                    game_package_id: "lucky-wheel",
                    client_seed: Math.ceil(Math.random() * 99999999)
                })
                let { data: { status: _status, message: _message } } = await axios.post('/api/games/lucky-wheel/play/verify', {
                    "hash": _hash,
                    "bet": game_global_vars.betVal,
                    "variation": Game_Category_Config[game_global_vars.gameId].api.variation,
                    "variation_type": Game_Category_Config[game_global_vars.gameId].api.variation_type
                })
                status = _status
                message = _message
                hash = _hash
            }
            if (!status) {
                showToast(message)
                wheelTweenings.splice(0)
                game_global_vars.running = false;
                setRunning(false)
                game_global_vars.auto_spin_val = 0; set_auto_spin_val(0)
                game_global_vars.wonRes = null;
                adjust_eventmode_arr.forEach(item => item.eventMode = 'static')
                return
            } else {
                // setBalance(v => v - game_global_vars.betVal)
            }
            const { data: wonRes } = await axios.post('/api/games/lucky-wheel/play', {
                "hash": hash,//gameParams.hash,//hash,//
                "bet": game_global_vars.betVal,
                "variation": Game_Category_Config[game_global_vars.gameId].api.variation,
            })
            game_global_vars.wonRes = wonRes
            game_global_vars.pf_hash = wonRes.pf_game.hash
            wheelTweenings[0].targetAngle = 360 * (wonRes.gameable.position + 5) / 8
            wheelTweenings[0].shouldEnd = true
            console.log(wonRes)


        } catch (error) {
            showToast('Oops! Please try again.')
            allTweenings.splice(0)
            game_global_vars.running = false;
            setRunning(false)
            game_global_vars.wonRes = null;
            adjust_eventmode_arr.forEach(item => item.eventMode = 'static')
        }

    }
    async function onComplete() {
        game_global_vars.running = false
        setRunning(false)
        wheel_over_sprite.texture = PIXI.Texture.from(`wheel-over-${wheelLocation[game_global_vars.wonRes.gameable.position]}.${webpORpng}`)
        wheel_emerald_sprite.texture = PIXI.Texture.from(`wheel-emerald-${wheelLocation[game_global_vars.wonRes.gameable.position]}.${webpORpng}`)

        wheel_over_sprite.alpha = 1
        wheel_emerald_sprite.alpha = 1
        titleSprite.alpha = 1
        if (game_global_vars.wonRes.win > 0) {
            total_win_text.text = game_global_vars.wonRes.win
            mobile_win_hold_spin_text_down.text = game_global_vars.wonRes.win
            total_win_static_text.text = "TOTAL WIN"
            mobile_win_hold_spin_text_upper.text = "TOTAL WIN"
            playSound('win')
        } else if (game_global_vars.last_win > 0) {
            total_win_text.text = game_global_vars.last_win
            mobile_win_hold_spin_text_down.text = game_global_vars.last_win
            total_win_static_text.text = "LAST WIN"
            mobile_win_hold_spin_text_upper.text = "LAST WIN"
        } else {
            total_win_text.text = ""
            mobile_win_hold_spin_text_down.text = ""
            total_win_static_text.text = "HOLD SPIN TO QUICK SPINS"
            mobile_win_hold_spin_text_upper.text = "HOLD SPIN"
        }
        if (game_global_vars.auto_spin_val > 0 || game_global_vars.auto_spin_val === -1) {
            const timeout_id = setTimeout(startPlay, 1000)
            game_global_vars.timeout_id = timeout_id
        }
        if (game_global_vars.auto_spin_val === 0) {
            auto_spin_val_text_sprite.text = ""
            button_auto_spin_sprite.texture = PIXI.Texture.from(`button-auto-spin-empty.${webpORpng}`)
            button_mobile_A.texture = PIXI.Texture.from(`button-mobile-A.${webpORpng}`)
            //! adjust eventmode
            adjust_eventmode_arr.forEach(item => item.eventMode = 'static')
        }
        setBalance(game_global_vars.wonRes.account.balance); game_global_vars.balance = game_global_vars.wonRes.account.balance

        game_global_vars.last_win = game_global_vars.wonRes.win
    }
    const adjust_eventmode_arr = [bet_min_sprite, bet_max_sprite, bet_up_sprite, bet_down_sprite, info_at_statusbarSprite, button_mobile_chip, button_mobile_setting, button_mobile_i, button_mobile_wallet, button_mobile_A, button_auto_spin_sprite]


}
export default loadMainScreen
import { IConfig, game_category_config_type, game_global_vars_type, tweenType, wheelTweenType } from "../@types";
export const config: IConfig = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x000000,
  autoStart: true,
  antialias: true,
  transparent: false,
  resolution: 1
};
export const game_global_vars: game_global_vars_type = {
  rulesHTML: "",
  stake: {
    max: 0,
    min: 0
  },
  balance: 0,
  isFullScreen: false,
  auto_spin_val: 0,
  last_win: 0,
  betVal: 100,
  running: false,
  wonRes: null,
  pf_hash: "",
  gameId: "wheel-of-fortune",
  mobile_win_hold_spin_text_upper: null,
  mobile_win_hold_spin_text_down: null,
  timeout_id: null,
}

export const allTweenings: tweenType[] = [];
export const wheelTweenings: wheelTweenType[] = [];
export const Game_Category_Config: { [key: string]: game_category_config_type } = {
  "wheel-of-fortune": {
    api: {
      variation: 0,
      variation_type: "wheel-of-fortune"
    },
    scaleFactor: [1.4, 1.4, 1, 1, 1],
  },
}
export const wheelLocation = ["noluck", "purple", "noluck", "green", "noluck", "cyan", "noluck", "red"]
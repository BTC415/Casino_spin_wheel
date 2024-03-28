import { PIXI } from "../renderer";

export interface IConfig {
  width: number;
  height: number;
  backgroundColor: number | string;
  autoStart?: boolean;
  antialias?: boolean;
  transparent?: boolean;
  resolution?: number;
};
export type gameIdType = "wheel-of-fortune"
export type game_global_vars_type = {
  rulesHTML: string,
  stake: {
    max: number,
    min: number
  },
  balance: number,
  isFullScreen: boolean,
  auto_spin_val: number,
  last_win: number,
  betVal: number,
  running: boolean,
  wonRes: any,
  pf_hash: string,
  gameId: gameIdType,
  mobile_win_hold_spin_text_upper: PIXI.Text | null,
  mobile_win_hold_spin_text_down: PIXI.Text | null,
  timeout_id: NodeJS.Timeout | null,
}
export type game_category_config_type = {
  api: {
    variation: number,
    variation_type: string
  },
  scaleFactor: number[],
}
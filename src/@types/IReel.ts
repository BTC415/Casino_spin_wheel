import { PIXI } from "../renderer";

export type tweenType = {
  object: Object,
  property: string,
  propertyBeginValue: number,
  target: number,
  time: number,
  easing: (t: number) => number,
  change: ((t: any) => Promise<void>) | null,
  complete: ((t: any) => Promise<void>) | null,
  start: number,
}
export type wheelTweenType = {
  wheel: PIXI.Sprite,
  shouldEnd: boolean,
  startTime: number,
  targetAngle: number,
  onComplete: () => Promise<void>,
}
export type Game_Category_Dimension_Type = {
  gameBoard: {
    width: number,
    height: number,
    cardHeight: number,
    x: number,
    y: number
  },
  footerBar: {
    width: number,
    height: number
  },
  bg: {
    [key: string]: {
      width: number,
      height: number
    },
  }
}
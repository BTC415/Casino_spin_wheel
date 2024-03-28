import { Game_Category_Dimension_Type } from "../@types"

export const Game_Category_Dimension: { [key: string]: Game_Category_Dimension_Type } = {
    "wheel-of-fortune": {
        gameBoard: { width: 1920, height: 940, cardHeight: 270, x: -50, y: 0 },
        footerBar: { width: 1920, height: 181 },
        bg: {
            desktop: {
                width: 1920,
                height: 1920
            },
            mobile: {
                width: 375,
                height: 812
            }
        }
    },
}
import { game_global_vars } from "../../config";
import PageWrapper from "../PageWrapper";
import * as React from "react"
const VITE_API_ASSETS_ELSE_URL = import.meta.env.VITE_API_ASSETS_ELSE_URL
export default function RuleDialog({ setChildContent }: { setChildContent: React.Dispatch<React.SetStateAction<JSX.Element>> }) {
    return (
        <PageWrapper>
            <div className="w-full h-full overflow-y-auto max-h-screen min-h-screen bg-[#212121]">
                <img onClick={() => setChildContent(<></>)} className="w-10 h-10 fixed top-10 right-10 cursor-pointer" src={`${VITE_API_ASSETS_ELSE_URL}res/button-close.png`} />
                <img className="w-full max-w-[400px] mx-auto p-8 mt-20" src={`${VITE_API_ASSETS_ELSE_URL}res/${game_global_vars.gameId}/logo.png`} alt="logo" />
                <div className="flex flex-col gap-4 max-w-[800px] w-full mx-auto text-white/60 text-lg md:text-2xl text-justify px-8 md:px-20 pb-10" style={{ fontFamily: "Myriad Pro" }}>

                    <p>Welcome to the Lucky Spin!</p>
                    <p>Lucky Spin is an enhanced iteration of the well-known Wheel of Fortune gambling game.</p>
                    <p>To initiate the game, you must specify the bet amount in the Bet field and then click the Start button. Following that, the wheel will commence its rotation, and the designated bet will be subtracted from your balance.</p>
                    <p>The outcome of the game hinges on the sector where the arrow aligns once the wheel comes to a complete stop. Simply press the START button and rely on your luck!</p>
                    <p>The round kicks off upon pressing Start and concludes when the arrow aligns with any sector.</p>
                </div>
            </div>
        </PageWrapper >
    )
}
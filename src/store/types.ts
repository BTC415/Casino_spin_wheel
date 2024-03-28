import { Dispatch, SetStateAction } from "react";

export type gameParamsType = {
    balance: number;
    token: string;
    hash: string;
}
export type storeType = {
    authorize: (loggedIn: boolean) => void,
    gameParams: gameParamsType,
    setBalance: (balanceOrCb: number | ((v: number) => number)) => void,
    isFullScreen: boolean,
    setFullScreen: Dispatch<SetStateAction<boolean>>
}
export const initialPrams: gameParamsType = {
    balance: 0,
    token: "",
    hash: "",
}
export const initialValue: storeType = {
    authorize: () => { },
    gameParams: initialPrams,
    setBalance: () => { },
    isFullScreen: false,
    setFullScreen: () => { }
}
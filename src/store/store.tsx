import React, { createContext, useContext, useEffect, useState } from "react";
import AccessDenied from "../components/AccessDenied";
import axios, { AxiosError } from "axios";
import { gameParamsType, initialPrams, initialValue, storeType } from "./types";
import PageWrapper from "../components/PageWrapper";
import { game_global_vars } from "../config";

export const globalContext = createContext<storeType>(initialValue);
const StoreProvider = (props: { children: JSX.Element }) => {
    const [isFullScreen, setFullScreen] = React.useState(false)
    const [content, setContent] = useState(<></>);
    const [gameParams, setGameParams] = useState<gameParamsType>(initialPrams)
    const authorize = (loggedIn: boolean) => {
        if (loggedIn) {
            setContent(props.children);
        } else {
            setContent(
                <PageWrapper><AccessDenied /></PageWrapper>
            );
        }
    };

    useEffect(() => {
        // authorize(true)
        const urlParams = new URLSearchParams(window.location.search);
        const token: string = urlParams.get('token') || "";
        delete axios.defaults.headers.common["Accept"];
        axios.defaults.headers.common['token'] = token;
        axios.defaults.baseURL = import.meta.env.VITE_API_BASE_API_URL;
        axios.defaults.timeout = 20000
        axios.post('/api/config').then((response) => {
            setGameParams(prev => ({
                ...prev,
                balance: response.data.data.user.account.balance,
                token: token,
            }))
            game_global_vars.balance = response.data.data.user.account.balance
            game_global_vars.rulesHTML = response.data.data.config.slots.rules
            game_global_vars.stake = {
                max: response.data.data.maxStake,
                min: response.data.data.minStake
            }
            authorize(true)
        }).catch(error => {
            if ((error as AxiosError)?.response?.status === 503) {
                document.body.innerHTML = ((error as AxiosError)?.response?.data) as string
                document.body.style.cssText = "color:white"
            }
            authorize(false);
            if (error.response.data.message === "Invalid token!") {
            }
        });
        axios.post('/api/user/games/create', {
            game_package_id: "lucky-wheel",
            client_seed: Math.ceil(Math.random() * 99999999)
        }).then(({ data: { hash } }: { data: { hash: string } }) => {
            setGameParams(prev => ({ ...prev, hash }))
        })
    }, []);
    return (
        <globalContext.Provider value={{
            authorize, gameParams, setBalance:
                (balanceOrCb: number | ((v: number) => number)) => {
                    if (typeof balanceOrCb === "function") {
                        setGameParams(prev => ({ ...prev, balance: balanceOrCb(prev.balance) }))
                    } else {
                        setGameParams(prev => ({ ...prev, balance: balanceOrCb }))
                    }
                },
            isFullScreen, setFullScreen
        }}>
            {content}
        </globalContext.Provider>
    )
}

const useAuthorize = () => useContext(globalContext).authorize;
const useGameParams = () => useContext(globalContext).gameParams;
const useSetBalance = () => useContext(globalContext).setBalance;
const useFullScreen = () => ({
    isFullScreen: useContext(globalContext).isFullScreen,
    setFullScreen: useContext(globalContext).setFullScreen,
})

export default StoreProvider;
export { useAuthorize, useGameParams, useFullScreen, useSetBalance };

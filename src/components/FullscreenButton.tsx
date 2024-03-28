import * as React from 'react'
import { checkDevice, closeFullscreen, openFullscreen, playSound, setVolume, stopSound } from '../utils/utils'
import { game_global_vars } from '../config'
import { useFullScreen, useGameParams } from '../store/store'
import SwitchButton from './SwitchButton'
import { Slider } from '@mui/material'
import { Global_Vars } from '../renderer'
import RuleDialog from './game_pixi/RuleDialog'
import BetHistory from './game_pixi/BetHistory'
import SettingDialog from './game_pixi/SettingDialog'
const VITE_API_ASSETS_ELSE_URL = import.meta.env.VITE_API_ASSETS_ELSE_URL

const HeaderMenu = ({ scaleFactor, visible, setVisible, setChildContent, maxH, setBetVal }: { scaleFactor: number, visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>, setChildContent: React.Dispatch<React.SetStateAction<JSX.Element>>, maxH: number, setBetVal: React.Dispatch<React.SetStateAction<number>> }) => {
    const [vol, setValVol] = React.useState<number>(parseInt(localStorage.getItem('slider') || '50'));
    const handleVolumeChange = (_: Event, newValue: number | number[]) => {
        setValVol(newValue as number);
    };
    React.useEffect(() => {
        localStorage.setItem('slider', Math.round(vol).toString())
        setVolume(vol)

    }, [vol])
    const [musicChecked, setMusicChecked] = React.useState<boolean>((localStorage.getItem(`music`) || 'true') === 'true')
    const [fxChecked, setFxChecked] = React.useState<boolean>((localStorage.getItem(`fx`) || 'true') === 'true')
    React.useEffect(() => {
        localStorage.setItem(`music`, musicChecked.toString())
        localStorage.setItem(`fx`, fxChecked.toString())
        if (!Global_Vars.startLoaded) return
        if (musicChecked) {
            playSound("bg")
        } else {
            stopSound("bg")
        }
        if (!fxChecked) {
            stopSound("spin")
            stopSound("win")
        }
    }, [musicChecked, fxChecked])

    return (
        <div className='menu-wrapper w-80 absolute right-0 top-[100%] z-20 p-1 pr-0 origin-top-right overflow-auto' style={{
            display: visible ? "block" : "none",
            scale: `${scaleFactor * 0.035}`,
            maxHeight: maxH / (Math.max(scaleFactor, 0.1) * 0.035)
        }}>
            <div className='menu flex flex-col  w-full h-full bg-[#3E3E43] gap-[2px] rounded-md overflow-hidden'>
                <div className='flex justify-between items-center px-3 py-[8px] bg-[#1B1C1D] hover:bg-[#2B1C1D] transition-all ease-in-out duration-500 '>
                    <div className='flex items-center gap-2 '>
                        <svg width={20} height={28}><use href='#svg-speaker' /></svg>
                        <span>Music</span>
                    </div>
                    <SwitchButton checked={musicChecked} onChange={(_, checked) => setMusicChecked(checked)} disabled={false} />
                </div>
                <div className='flex justify-between items-center px-3 py-[8px] bg-[#1B1C1D] hover:bg-[#2B1C1D] transition-all ease-in-out duration-500 '>
                    <div className='flex items-center gap-2 '>
                        <svg width={20} height={28}><use href='#svg-music' /></svg>
                        <span>Sound FX</span>
                    </div>
                    <SwitchButton checked={fxChecked} onChange={(_, checked) => setFxChecked(checked)} disabled={false} />
                </div>
                <div className='flex justify-between items-center px-3 py-[8px] bg-[#1B1C1D] hover:bg-[#2B1C1D] transition-all ease-in-out duration-500 '>
                    <div className='flex items-center gap-2 '>
                        <svg width={20} height={28}><use href='#svg-volume' /></svg>
                        <span>Volume</span>
                    </div>
                    <Slider
                        onChange={handleVolumeChange}
                        value={vol}
                        sx={{
                            width: "160px",
                            color: '#EFAC01',
                            '& .MuiSlider-track': {
                                border: 'none',
                            },
                            '& .MuiSlider-rail': {
                                opacity: 1,
                                backgroundColor: "#3E3E43"
                            },
                            '& .MuiSlider-thumb': {
                                width: 18,
                                height: 18,
                                backgroundColor: '#fff',
                                '&:before': {
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                                },
                                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                    boxShadow: 'none',
                                },
                            },
                        }}

                        aria-label="Volume" max={100} min={0} />
                </div>
                <div className='h-3' />
                <div onClick={() => {
                    setChildContent(<RuleDialog setChildContent={setChildContent} />)
                    setVisible(false)

                }} className='flex justify-between items-center px-3 py-[8px] bg-[#1B1C1D] hover:bg-[#2B1C1D] transition-all ease-in-out duration-500 cursor-pointer'>
                    <div className='flex items-center gap-2 '>
                        <svg width={20} height={28}><use href='#svg-game-rules' /></svg>
                        <span>Game Rules</span>
                    </div>
                </div>
                <div onClick={() => {
                    setChildContent(<BetHistory setChildContent={setChildContent} />)
                    setVisible(false)

                }} className='flex justify-between items-center px-3 py-[8px] bg-[#1B1C1D] hover:bg-[#2B1C1D] transition-all ease-in-out duration-500 cursor-pointer'>
                    <div className='flex items-center gap-2 '>
                        <svg width={20} height={28}><use href='#svg-bet-history' /></svg>
                        <span>My Bet History</span>
                    </div>
                </div>
                <div onClick={() => {
                    setChildContent(<SettingDialog setChildContent={setChildContent} setBetVal={setBetVal} mobile_win_hold_spin_text_down={null} mobile_win_hold_spin_text_upper={null} />)
                    setVisible(false)

                }} className='flex justify-between items-center px-3 py-[8px] bg-[#1B1C1D] hover:bg-[#2B1C1D] transition-all ease-in-out duration-500 cursor-pointer'>
                    <div className='flex items-center gap-2 '>
                        <svg width={20} height={28}><use href='#svg-settings' /></svg>
                        <span>Chips Settings</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
const FullscreenButton = ({ setChildContent, setBetVal }: {
    setChildContent: React.Dispatch<React.SetStateAction<JSX.Element>>, setBetVal: React.Dispatch<React.SetStateAction<number>>
}) => {

    const { balance } = useGameParams()
    const { isFullScreen, setFullScreen } = useFullScreen();
    const [isIPhone, setIPhone] = React.useState(false)
    const [scale, setScale] = React.useState(1)
    const [w_factor, set_w_factor] = React.useState(0)
    const [showMenu, setShowMenu] = React.useState(false)
    const header_ref = React.useRef<HTMLDivElement>(null)
    const [maxH, setMaxH] = React.useState(100)

    const handleFullScreenClick = () => {
        setFullScreen(prev => (!prev))
    }
    const handleResize = () => {
        set_w_factor(window.innerWidth >= 768 ? 40 : 24)
        setTimeout(() => {
            setMaxH(window.innerHeight - (header_ref.current?.clientHeight || 100))
        }, 100);
        const { iPhone, mobile } = checkDevice()
        setIPhone(iPhone)
        if (mobile) {
            setScale(window.devicePixelRatio / window.innerWidth > 400 ? 3 : 1)
        } else {
            setScale(window.devicePixelRatio)
        }
    }
    React.useEffect(() => {
        game_global_vars.isFullScreen = isFullScreen
        if (isFullScreen) {
            openFullscreen()
        } else {
            closeFullscreen()
        }
    }, [isFullScreen])
    React.useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    React.useEffect(() => {
        const fullscreenhandler = () => {
            game_global_vars.isFullScreen = isFullScreen
            setFullScreen(document.fullscreenElement !== null)
            // handleResize()
        }
        document.addEventListener('fullscreenchange', fullscreenhandler);
        return () => document.removeEventListener('fullscreenchange', fullscreenhandler);
    }, [])

    return (
        <>
            {
                <div className='w-full bg-[#1C1C1C]/70 text-white absolute top-0 font-roboto'>
                    <div className='flex justify-between items-center w-full ' ref={header_ref} style={{ padding: w_factor / scale * 0.2 }} >
                        <img width={w_factor / scale * 5} src={`${VITE_API_ASSETS_ELSE_URL}res/bollygaming-logo.png`} alt="logo" />
                        <div className='flex ' style={{ gap: w_factor / scale * 0.3 }}>
                            <div className='flex gap-1 sm:gap-2 justify-center items-center font-roboto' style={{ fontSize: w_factor / scale * 0.5 }}>
                                <svg className=" overflow-visible sm:scale-[1.2]" width={w_factor / scale * 0.7} height={w_factor / scale * 0.6}><use width={w_factor / scale * 0.7} height={w_factor / scale * 0.6} href="#svg-wallet" /></svg>
                                {`${balance.toLocaleString('en-US', { style: 'currency', currency: 'INR' }).substring(1)}`}
                            </div>
                            <div className=' rounded-full bg-[#3E3E43]' style={{ width: w_factor / scale * 0.1 }} />
                            <div onClick={() => {
                                setShowMenu(prev => {
                                    if (game_global_vars.running) {
                                        return false
                                    }
                                    return !prev
                                })
                            }} className='flex flex-col justify-between items-center self-center cursor-pointer rounded-sm hover:bg-[#2e2e2e] transition-all ease-in-out scale-[0.8] sm:scale-100'
                                style={{
                                    width: w_factor / scale * 1.0,
                                    height: w_factor / scale * 0.8,
                                    paddingLeft: w_factor / scale * 0.1,
                                    paddingRight: w_factor / scale * 0.1,
                                    paddingTop: w_factor / scale * 0.14,
                                    paddingBottom: w_factor / scale * 0.14,
                                }} >
                                <div className='w-full rounded-full bg-white' style={{ height: w_factor / scale * 0.1 }} />
                                <div className='w-full rounded-full bg-white' style={{ height: w_factor / scale * 0.1 }} />
                                <div className='w-full rounded-full bg-white' style={{ height: w_factor / scale * 0.1 }} />
                            </div>
                            <div className=' rounded-full bg-[#3E3E43]' style={{ width: w_factor / scale * 0.1, display: isIPhone ? "none" : "block" }} />
                            <div onClick={handleFullScreenClick} className='cursor-pointer self-center' style={{ display: isIPhone ? "none" : "block" }}>
                                {
                                    isFullScreen ?
                                        <img width={w_factor / scale} src={`${VITE_API_ASSETS_ELSE_URL}res/${game_global_vars.gameId}/fullscreen-close.png`} alt="fullscreen" /> :
                                        <img width={w_factor / scale} src={`${VITE_API_ASSETS_ELSE_URL}res/${game_global_vars.gameId}/fullscreen-open.png`} alt="fullscreen" />
                                }
                            </div >
                        </div>
                    </div>
                    <div onClick={() => setShowMenu(false)} className='w-full absolute top-[100%] h-screen bg-transparent cursor-pointer' style={{ display: showMenu ? "block" : "none" }}></div>
                    <HeaderMenu scaleFactor={w_factor / scale} visible={showMenu} setVisible={setShowMenu} setChildContent={setChildContent} maxH={maxH} setBetVal={setBetVal} />

                </div>
            }
            {/* {
                showFullScreen && isFullScreen &&
                <img src={`${VITE_API_ASSETS_IMAGE_URL}logo384.png`} alt="logo" className='z-10 fixed shadow-lg shadow-black rounded-full' style={{ width: 60 / scale * w_factor, left: 10, top: 20 }} />
            } */}
        </>
    )
}
export default FullscreenButton
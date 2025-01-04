import React from 'react'
import { useState } from 'react'
import { CopyPlus, Target, SendHorizontal } from 'lucide-react';
import {UserOutlined} from '@ant-design/icons'
import { Avatar, Input } from 'antd';
import * as Tooltip from "@radix-ui/react-tooltip";
import {toast} from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import "../index.css";

const Echo = () => {
    const [mode, setMode] = useState<number>(0);
    const [chat, setChat] = useState<{text: string, sender: string}[]>([]);
    const [session, setSession] = useState<Boolean>(false);
    const [disabled, setDisabled] = useState<Boolean>(false);
    const [text, setText] = useState<string>("");
    const [isLoading, setIsloading] = useState<Boolean>(false);
    const [loading, setLoading] = useState(0);
    const startSession = async()=>{
        setIsloading(true);
        setLoading(0)
        try {
            const response = await axios.get("https://leetassist-1.onrender.com", {
              onDownloadProgress: (progressEvent) => {
                if(progressEvent.total == undefined) return;
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(percentCompleted);
                setLoading(percentCompleted);
              },
            });
        } catch (error) {
          setIsloading(false);
          setLoading(0);
          setChat((prev)=>{
            return [...prev, {
                sender: 'echo',
                text: 'Something Went Wrong 😅🫤🥲❌',
            }]
          });
        } finally {
          setIsloading(false);
          setLoading(0);
          setSession(true);
          setChat((prev)=>{
            return [...prev, {
                sender: 'echo',
                text: 'Session Started 🎉🎊🎈🎀',
            }]
          });
        }
    }
    const sendMessage = async()=>{
        if(text.length == 0){
            toast.info('Invalid Message', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        setChat((prev)=>{
            return [...prev, {
                text:text,
                sender:'user'
            }]
        });
        if(text == "Hey Echo!"){
            setChat((prev)=>{
                return [...prev, {
                    text:'Hey User, Starting the session! 😊',
                    sender:'echo'
                }]
            });
            await startSession();
        }
        setText("");
    }
  return (
    <div className='relative bg-[#11192D] h-[100vh] overflow-x-hidden w-full'>
        <div className='bg-[#1e8296] absolute top-[4rem] -z-5 left-[-35rem] h-[15.25rem] w-[15.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]'></div>
        <div className='py-4 w-full flex flex-col items-center justify-between h-full'>
            <div className='w-full flex flex-row items-center justify-around'>
                {/* header */}
                <div className='flex flex-row items-center gap-2 text-md text-white font-semibold cursor-pointer'>
                    <Tooltip.Provider>
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <button>
                                    <CopyPlus/>
                                </button>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content className="TooltipContent" sideOffset={5}>
                                    <div className='opacity-100'>
                                        New Chat
                                    </div>
                                    <Tooltip.Arrow className="TooltipArrow" />
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>
                    </Tooltip.Provider>
                </div>
                <div className='text-[#67c2ec] bg-[#319dce]/30 px-4 py-1 rounded-full font-semibold cursor-pointer flex flex-row items-center gap-2'>
                    <div className='text-white'><Target/></div>
                    Echo
                </div>
                <div className='flex flex-row items-center gap-2 text-lg text-white font-semibold cursor-pointer'>
                    <Avatar className='bg-[#42d0ec]' icon={<UserOutlined />} />
                </div>
            </div>
            <div className="w-full p-4 rounded-md overflow-y-auto custom-scrollbar h-full">
                {/* Chat */}
                <div className="w-full flex flex-col item-start gap-4 h-full">
                    {chat.map((item, index) => {
                    if (item.sender === "user") {
                        return (
                            <div
                                key={index}
                                className="self-end text-[#67c2ec] bg-[#319dce]/30 border-[1px] border-[#67c2ec] py-2 px-4 rounded-lg max-w-xs text-right shadow"
                            >
                                {item.text}
                            </div>
                        );
                    }
                    return (
                        <div
                            key={index}
                            className="self-start text-[#67ec79] bg-[#67ec79]/30 border-[1px] border-[#67ec79] py-2 px-4 rounded-lg max-w-xs shadow"
                        >
                            {item.text}
                        </div>
                    );
                    })}
                </div>
            </div>
            <div className='px-8 flex flex-row items-center justify-between gap-2 mt-4 w-full'>
                {/* footer */}
                {
                    !session ? 
                    (<div className='w-[108px] text-[#67c2ec] bg-[#319dce]/30 p-1 rounded-md cursor-pointer duration-200 animate-bounce' onClick={
                        ()=>{
                            setText("Hey Echo!")
                        }
                    }>
                        Start Session
                    </div>) : 
                    (<div></div>)
                }
                <div className='w-full flex flex-row items-center gap-2'>
                    <div className='w-full'>
                        <Input variant="filled" className='bg-[#1e8296]/10 hover:bg-[#1e8296]/20 focus:bg-[#1e8296]/20 outline-none border-[#1e8296] text-slate-200 disabled:text-slate-200' disabled={true} value={text}/>
                    </div>
                    <div className='text-[#67c2ec] bg-[#319dce]/30 p-1 rounded-md cursor-pointer duration-200 hover:scale-95' onClick={sendMessage}>
                        <SendHorizontal/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Echo
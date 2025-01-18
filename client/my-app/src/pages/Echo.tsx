import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { CopyPlus, Target, SendHorizontal, BookOpenText, PencilRuler } from 'lucide-react';
import {UserOutlined} from '@ant-design/icons'
import { Avatar, Input, Select } from 'antd';
import * as Tooltip from "@radix-ui/react-tooltip";
import { toast } from 'react-toastify';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';
import 'react-toastify/dist/ReactToastify.css';
import "../index.css";
import { Chart, registerables } from 'chart.js';
import { useLocation } from 'react-router-dom';
import EchoGames from './EchoGames';
import MiniHole from '../components/MiniHole';
import Roadmap from '../components/roadmap';
import POTD from '../components/potd';
Chart.register(...registerables);

const Echo = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const play = queryParams.get('games');
    // http://localhost:8000
    // http://leetassist-1.onrender.com
    const [user, setUser] = useState<null | {
        rating: number,
        step: number,
        email: String
    }>(null);

    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        if(storedUser != null){
            try{
                setUser(JSON.parse(storedUser));
            } catch(err){
                console.log(err);
            }
        }
    }, []);
    
    const base = 'https://leetassist-1.onrender.com' 
    // const base = 'http://localhost:8000' 
    
    const [mode, setMode] = useState<number>(0);
    const [platform, setPlatform] = useState<number>(0);
    const [chat, setChat] = useState<{text: string, sender: string}[]>([]);
    const [session, setSession] = useState<Boolean>(false);
    const [text, setText] = useState<string>("");
    const [placeholder, setPlaceholder] = useState<string>("");
    const [isLoading, setIsloading] = useState<Boolean>(false);
    const [loading, setLoading] = useState(0);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    useEffect(()=>{
        if(scrollRef.current){
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chat]);
    if(play === 'true'){
        return <EchoGames/>
    }
    const startSession = async()=>{
        let hasError = false;
        setIsloading(true);
        setLoading(0)
        try {
            const response = await axios.get(`${base}`, {
              onDownloadProgress: (progressEvent) => {
                if(progressEvent.progress == undefined) return;
                const percentCompleted = (progressEvent.progress * 100);
                setLoading(percentCompleted);
              },
            });
        } catch (error) {
            hasError = true;
            setIsloading(false);
            setLoading(0);
            setChat((prev)=>{
                return [...prev, {
                    sender: 'echo',
                    text: 'Something Went Wrong 😅🫤🥲❌',
                }]
            });
        } finally {
            if(hasError) return;
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
    
    const predictRating = async()=>{
        let hasError = false;
        setIsloading(true);
        setLoading(0)
        try {
            const url = (platform === 1 ? `${base}/echo/ratings/lc/${text}` : `${base}/echo/ratings/cf/${text}`)
            const response = await axios.get(url, {
              onDownloadProgress: (progressEvent) => {
                if(progressEvent.progress == undefined) return;
                const percentCompleted = (progressEvent.progress * 100);
                setLoading(percentCompleted);
              },
            });
            if(response.data.status !== 200){
                setChat((prev)=>{
                    return [...prev, {
                        sender: 'echo',
                        text: response.data.message,
                    }]
                });
            }
            else{
                setChat((prev)=>{
                    return [...prev, {
                        sender: 'echo',
                        text: `Here\'s the forecast:`,
                    }]
                });
                setChat((prev)=>{
                    return [...prev, {
                        sender: 'echo',
                        text: `plot||${response.data.forecast[0]}||${response.data.forecast[1]}||${response.data.forecast[2]}||${response.data.forecast[3]}||${response.data.forecast[4]}||`,
                    }]
                });
            }
        } catch (error) {
            hasError = true;
            setIsloading(false);
            setLoading(0);
            setChat((prev)=>{
                return [...prev, {
                    sender: 'echo',
                    text: 'Something Went Wrong 😅🫤🥲❌\n\n\n\nMake Sure The User exists!',
                }]
            });
        } finally {
            if(hasError) return;
            setIsloading(false);
            setLoading(0);
        }
    }

    const recommend = async()=>{
        setIsloading(true);
        setLoading(0)
        try{
            const url = `${base}/echo/recommendFromText`
            const response = await axios.post(url, {
                tags: text.split(' ')
            }, {
                onDownloadProgress: (progressEvent) => {
                  if(progressEvent.progress == undefined) return;
                  const percentCompleted = (progressEvent.progress * 100);
                  setLoading(percentCompleted);
                }
            }
        );
            let problems = response.data 
            problems.forEach((problem : null | {difficulty: string, is_premium: Boolean, problem_URL: string, problem_description: string, similarity: number, title: string}) => {
                if(problem === null) return;
                const prob = {
                    difficulty:  problem.difficulty,
                    is_premium:  problem.is_premium,
                    problem_URL:  problem.problem_URL,
                    similarity:  (problem.similarity > 0.75 ? 'Very High' : (problem.similarity > 0.5 ? 'High' : (problem.similarity > 0.25 ? 'Medium' : ('Low')))),
                    title:  problem.title,
                    problem_description: problem.problem_description
                }
                setChat((prev)=>{
                    return [...prev, {
                        sender: 'echo',
                        text: `problem||${JSON.stringify(prob)}`,
                    }]
                });
            })
        } catch(error){
            console.log(error); 
            setChat((prev)=>{
                return [...prev, {
                    sender: 'echo',
                    text: 'Something Went Wrong 😅🫤🥲❌',
                }]
            });
        } finally{
            setIsloading(false);
            setLoading(0);
        }
    }

    const tagsRecommend = async()=>{
        setIsloading(true);
        setLoading(0)
        try{
            const url = `${base}/echo/tags`
            const response = await axios.post(url, {
                tags: text
            }, {
                onDownloadProgress: (progressEvent) => {
                  if(progressEvent.progress == undefined) return;
                  const percentCompleted = (progressEvent.progress * 100);
                  setLoading(percentCompleted);
                },
            });
            let mx = 0, tags = "";
            const response_array : {certainty: number, tags: string}[] = Object.values(response.data)
            response_array.forEach((prob : {certainty: number, tags: string})=>{
                if(prob.certainty > mx){
                    mx = prob.certainty
                    tags = prob.tags
                }
            })
            setChat((prev)=>{
                return [...prev, {
                    sender: 'echo',
                    text: `tags||${tags}`,
                }]
            })
        } catch(error){
            console.log(error); 
            setChat((prev)=>{
                return [...prev, {
                    sender: 'echo',
                    text: 'Something Went Wrong 😅🫤🥲❌',
                }]
            });
        } finally{
            setIsloading(false);
            setLoading(0);
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
        else if(mode == 1){
            setChat((prev)=>{
                return [...prev, {
                    text:`Crunching past performances of ${text}!\nUsing it to forecast! 😊`,
                    sender:'echo'
                }]
            });
            await predictRating();
        }
        else if(mode == 2){
            setChat((prev)=>{
                return [...prev, {
                    text:`Searching for similar problems😊`,
                    sender:'echo'
                }]
            });
            await recommend();
        }
        else if(mode == 3){
            setChat((prev)=>{
                return [...prev, {
                    text:`Analyzing😊`,
                    sender:'echo'
                }]
            });
            await tagsRecommend();
        }
        setText("");
    }
  return (
    <div className='relative bg-[#11192D] h-[100vh] overflow-x-hidden w-full min-w-[320px]'>
        <div className='bg-[#1e8296] absolute top-[4rem] -z-5 left-[-35rem] h-[15.25rem] w-[15.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]'></div>
        <div className='py-4 w-full flex flex-col items-center justify-between h-full'>
            <div className='w-full flex flex-row items-center justify-around pb-2' style={{"boxShadow": "0 5px 10px rgba(0, 0, 0, 0.3)"}}>
                {/* header */}
                <div className='flex flex-row items-center gap-6 text-md text-white font-semibold cursor-pointer'>
                    <div>
                        <Tooltip.Provider>
                            <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                    <button onClick={()=>{
                                    }}>
                                        <PencilRuler/>
                                    </button>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                    <Tooltip.Content className="TooltipContent" sideOffset={5}>
                                        <div className='opacity-100'>
                                            Mini Games (Coming Soon)
                                        </div>
                                        <Tooltip.Arrow className="TooltipArrow" />
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            </Tooltip.Root>
                        </Tooltip.Provider>
                    </div>
                    <div>
                        <Tooltip.Provider>
                            <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                    <button onClick={()=>{
                                    }}>
                                        <BookOpenText/>
                                    </button>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                    <Tooltip.Content className="TooltipContent" sideOffset={5}>
                                        <div className='opacity-100'>
                                            Read (Coming Soon)
                                        </div>
                                        <Tooltip.Arrow className="TooltipArrow" />
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            </Tooltip.Root>
                        </Tooltip.Provider>
                    </div>
                    <div>
                        <Tooltip.Provider>
                            <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                    <button onClick={()=>{
                                        setChat([]);
                                        setMode(0);
                                        setText("");
                                        setPlaceholder("");
                                        setSession(false)
                                    }}>
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
                    <div>
                        <Roadmap rating={user ? (user.rating + 700) : 1500}/>
                    </div>
                    <div>
                        <POTD rating={user ? (user.rating + 700) : 1500} step={user ? user.step : 0} email={user ? user.email : ""}/>
                    </div>
                </div>
                <div className='text-[#67c2ec] bg-[#319dce]/30 px-4 py-1 rounded-full font-semibold cursor-pointer flex flex-row items-center gap-2'>
                    <div className='text-white'><Target/></div>
                    Echo
                </div>
                <div className='flex flex-row items-center gap-2 text-lg text-white font-semibold cursor-pointer'>
                    <Avatar className='bg-[#42d0ec]' icon={<UserOutlined />} />
                </div>
            </div>
            <div className="w-full p-4 rounded-md overflow-y-auto custom-scrollbar h-full" ref={scrollRef}>
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
                    if(item.text.startsWith('plot', 0)){
                        let tmp = item.text.slice(4).split('||').slice(1,-1)
                        let forecast = tmp.map((pred)=>{
                            return parseFloat(pred)
                        })
                        return <div className="self-start text-[#c8eacc] bg-[#c8eacc]/30 border-[1px] border-[#c8eacc] py-2 px-4 rounded-lg w-[320px] md:w-[400px] md:h-[400px] shadow">
                                    <Bar 
                                        
                                        data={
                                        {
                                            labels: ['contest-1', 'contest-2', 'contest-3', 'contest-4', 'contest-5'],
                                            datasets: [
                                            {
                                                label: 'Predicted Rating',
                                                data: forecast,
                                                borderWidth: 1,
                                            }
                                            ]
                                        }
                                        }
                                        options={
                                        {scales:{
                                            y:{
                                                min: Math.min(...forecast) - 20,
                                                max: Math.max(...forecast)
                                            }
                                        }}
                                        }
                                    />
                                </div>
                    }
                    if(item.text.startsWith('problem', 0)){
                        let tmp = JSON.parse(item.text.slice(9))
                        let difficulty_styles = `text-[#67ec79] bg-[#67ec79]/30 border-[1px] border-[#67ec79] text-center rounded-md`;
                        if(tmp.difficulty === 'Medium'){
                            difficulty_styles = `text-[#d1e64e] bg-[#d1e64e]/30 border-[1px] border-[#d1e64e] text-center rounded-md`;
                        }
                        else if(tmp.difficulty === 'Hard'){
                            difficulty_styles = `text-[#ef7a7a] bg-[#ef7a7a]/30 border-[1px] border-[#ef7a7a] text-center rounded-md`;
                        }
                        let premium_styles = `text-[#67ec79] bg-[#67ec79]/30 border-[1px] border-[#67ec79] text-center rounded-md`;
                        if(tmp.premium === true){
                            premium_styles = `text-[#d1e64e] bg-[#d1e64e]/30 border-[1px] border-[#d1e64e] text-center rounded-md`;
                        }
                        let certainty_styles = `text-[#c8eacc] bg-[#c8eacc]/30 border-[1px] border-[#c8eacc] text-center rounded-md`;
                        if(tmp.similarity === 'Very High'){
                            certainty_styles = `text-[#6a00ff] bg-[#6a00ff]/30 border-[1px] border-[#6a00ff] text-center rounded-md`;
                        }
                        else if(tmp.similarity === 'High'){
                            certainty_styles = `text-[#c04beb] bg-[#c04beb]/30 border-[1px] border-[#c04beb] text-center rounded-md`;
                        }
                        else if(tmp.similarity === 'Medium'){
                            certainty_styles = `text-[#F3C6F0] bg-[#F3C6F0]/30 border-[1px] border-[#F3C6F0] text-center rounded-md`;
                        }
                        const celebration = ['🎉🎀🎈🎊', '✅✅⤵️⤵️', '🧡💛💚💙', '✨🎍🎏⭐', '✅✅🔥🔥', '🌟🌈❤️🩷']
                        return  <div className="self-start text-[#c8eacc] bg-[#c8eacc]/30 border-[1px] border-[#c8eacc] py-2 px-4 rounded-lg w-[320px] md:w-[400px] md:h-[400px] shadow cursor-pointer pb-4">
                                    <div>{tmp.title} {celebration[Math.floor(Math.random() * celebration.length)]}</div>
                                    <div className='py-2 text-slate-50 text-sm'>{tmp.problem_description.slice(0, 100)}....</div>
                                    <div className='flex flex-col gap-2 mt-2'>
                                        <div className={difficulty_styles}>Difficulty: {tmp.difficulty}</div>
                                        <div className={premium_styles}>{tmp.is_premium ? "premium" : "free"}</div>
                                        <div className={certainty_styles}>Certainty: {tmp.similarity}</div>
                                    </div>
                                    <div className='flex flex-col items-center justify-center py-2'>
                                        <div className='text-center text-blue-400 hover:text-blue-600 duration-200 underline'><a href={`${tmp.problem_URL}`} target='_blank'>Click Here To Solve The Problem</a></div>
                                    </div>
                                </div>
                    }
                    if(item.text.startsWith('tags')){
                        let tags = item.text.slice(6)
                        let arr = tags.split(', ')
                        return <div className='self-start text-[#c8eacc] bg-[#c8eacc]/30 border-[1px] border-[#c8eacc] py-2 px-4 rounded-lg max-w-xs shadow'>
                            {
                                arr.map((tag, index)=>{
                                    return <div key={index}>{tag} 🔥💯</div>
                                })
                            }
                        </div>
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
                    {
                        isLoading &&
                        <div className="self-start bg-[#062109]/30 border-[1px] border-[#c8eacc] py-2 px-4 rounded-lg max-w-xs shadow text-white w-[200px]">
                            Loading... ({loading}%)
                            <div>
                                <MiniHole/>
                            </div>
                        </div>
                    }
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
                    (<div className='cursor-pointer flex flex-row items-center gap-2'>
                        <div>
                            <Select
                                showSearch
                                placeholder="Select Mode"
                                optionFilterProp="label"
                                className='text-white'
                                
                                onChange={(value)=>{
                                    setMode(value)
                                    setPlaceholder("Describe Problem")
                                    if(value === 1)
                                        setPlaceholder("");
                                }}
                                
                                options={[
                                    {
                                        value: 1,
                                        label: 'Rating Forecast',
                                    },
                                    {
                                        value: 2,
                                        label: 'Recommend Similar Problems',
                                    },
                                    {
                                        value: 3,
                                        label: 'Tag Predictor',
                                    },
                                    {
                                        value: 4,
                                        label: 'Complete Analysis',
                                    },
                                ]}
                            />
                        </div>
                        {
                            mode === 1 && (
                                <div>
                                    <Select
                                        showSearch
                                        placeholder="Select Platform"
                                        optionFilterProp="label"
                                        className='text-white'

                                        onChange={(value)=>{
                                            setPlatform(value);
                                            setPlaceholder('Enter a valid username')
                                        }}

                                        options={[
                                            {
                                                value: 1,
                                                label: 'Leetcode',
                                            },
                                            {
                                                value: 2,
                                                label: 'Codeforces',
                                            }
                                        ]}
                                    />
                                </div>
                            )
                        }
                    </div>)
                }
                <div className='w-full flex flex-row items-center gap-2'>
                    <div className='w-full'>
                        <Input variant="filled" 
                            className='bg-[#1e8296]/10 hover:bg-[#1e8296]/20 focus:bg-[#1e8296]/20 outline-none border-[#1e8296] text-slate-200 disabled:text-slate-200 placeholder:text-slate-200' 
                            disabled={
                                placeholder === ''
                            } value={text}
                            onChange={(event)=>{
                                if(placeholder === '') return;
                                setText(event.target.value);
                            }}
                            placeholder={placeholder}
                        />
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
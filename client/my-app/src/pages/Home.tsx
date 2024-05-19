import React from 'react'
import {Brain, BrainCircuit, CodeXml, Laptop} from 'lucide-react'
const Home = () => {
  return (
    <div className='relative bg-white min-h-[100vh] overflow-x-hidden'>
        <div className='bg-[#74d36f] absolute top-[-6rem] -z-5 right-[-15rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]'></div>
        <div className='bg-[#5348d6] absolute top-[-1rem] -z-5 left-[-15rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]'></div>
        <div className='relative z-10 pt-5 px-4 min-w-[320px] w-[60%] mx-auto flex flex-col items-center gap-4'>
            <h1 className='text-4xl mx-auto bg-gradient-to-r from-slate-800 to-slate-600 font-bold inline-block text-transparent bg-clip-text'>LeetAssist</h1>
            <p className='mx-auto bg-gradient-to-r text-center from-slate-800 to-slate-600 inline-block text-transparent bg-clip-text'>
                Ever forgotten the name of a LeetCode question but remember its essence? LeetAssist has you covered! Simply describe the problem, and our system will predict the most likely LeetCode question for you.  
            </p>
            <div className='text-slate-950 flex flex-col items-center gap-8 mt-8'>
                <div className='flex flex-col items-center'>
                    <div className='text-black shadow-lg cursor-pointer hover:scale-105 duration-200 bg-white p-4 bg-opacity-25 rounded-full'>
                        <Brain size={30}/>
                    </div>
                    <p>Problem Prediction</p>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='text-black shadow-lg cursor-pointer hover:scale-105 duration-200 bg-white p-4 bg-opacity-25 rounded-full'>
                        <BrainCircuit size={30}/>
                    </div>
                    <p>Similar Problem Recommendations</p>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='text-black cursor-pointer hover:scale-105 duration-200 bg-white shadow-lg p-4 bg-opacity-25 rounded-full'>
                        <Laptop size={30}/>
                    </div>
                    <p>Interview Preparation</p>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='text-black cursor-pointer hover:scale-105 duration-200 bg-white shadow-lg p-4 bg-opacity-25 rounded-full'>
                        <CodeXml size={30}/>
                    </div>
                    <p>Competitive Programming</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
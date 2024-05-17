import React from 'react'

const Guess = () => {
  return (
    <div className='relative bg-stone-900 min-h-[100vh] overflow-x-hidden'>
        <div className='bg-[#417a3e] absolute top-[-6rem] -z-5 right-[-15rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]'></div>
        <div className='bg-[#676394] absolute top-[-1rem] -z-5 left-[-15rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]'></div>
        <div className='relative z-10 pt-5 px-4 min-w-[320px] w-[60%] mx-auto flex flex-col items-center gap-4'>
            <div className='text-4xl mx-auto bg-gradient-to-r from-slate-400 to-slate-100 font-bold inline-block text-transparent bg-clip-text'>Echo</div>
            <p className='mx-auto bg-gradient-to-r text-center from-slate-200 to-slate-100 inline-block text-transparent bg-clip-text'>
                Ever forgotten the name of a LeetCode question but remember its essence?  
            </p>
            <p className='mx-auto bg-gradient-to-r text-center from-slate-200 to-slate-100 inline-block text-transparent bg-clip-text'> 
                CodeComrade's AI powered model - ECHO got you covered ! 
            </p>
            <div>
                
            </div>
        </div>
    </div>
  )
}

export default Guess
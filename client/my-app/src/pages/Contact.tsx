import React from 'react'
import contact_us from "../assests/logoX.png"
const Contact = () => {
  return (
    <div className='relative bg-white min-h-[100vh] overflow-x-hidden'>
        <div className='bg-[#74d36f] absolute top-[-6rem] -z-5 right-[-15rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]'></div>
        <div className='bg-[#5348d6] absolute top-[-1rem] -z-5 left-[-15rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]'></div>
        <div className='relative z-10'>
            <div className="mx-auto bg-gradient-to-r from-slate-800 to-slate-600 font-bold inline-block text-transparent bg-clip-text w-full text-4xl text-center">Got an Idea? We’ve got the skills. Let’s team up</div>
            <div className="mx-auto bg-gradient-to-r from-slate-800 to-slate-600 font-bold inline-block text-transparent bg-clip-text w-full text-base text-center mb-8 pt-4">Tall us more about yourself and what you’re got in mind.</div>
            <div className='w-full flex flex-col items-center justify-center'>
                <form className="flex items-center justify-around gap-2 p-2 w-full">
                    <div className=''>
                        <div>
                        <label htmlFor='fname' className='cursor-pointer'>First Name:</label>
                        <input type='text' id='fname' className='bg-slate-400/20 p-2 w-full rounded-sm border-2 border-slate-900/40 outline-none' spellCheck={false}/>
                        <label htmlFor='lname' className='cursor-pointer'>Last Name:</label>
                        <input type='text' id='lname' className='bg-slate-400/20 p-2 w-full rounded-sm border-2 border-slate-900/40 outline-none' spellCheck={false}/>
                        </div>
                        <label htmlFor='email' className='cursor-pointer'>Enter your email:</label>
                        <input type='email' id='email' className='bg-slate-400/20 p-2 w-full rounded-sm border-2 border-slate-900/40 outline-none' spellCheck={false}/>
                        <label className='cursor-pointer'>Tell us about your idea</label>
                        <textarea className='bg-slate-400/20 p-2 w-full rounded-sm border-2 border-slate-900/40 outline-none' rows={8}>
                        </textarea>
                    </div>
                    <div >
                        <img src={contact_us} width={500} className='rounded-md shadow-slate-600 shadow-md'/>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Contact
import React, {useState} from 'react'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Tags = () => {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [text, setText] = useState<String>("");
    const [tags, setTags] = useState<String[]>([])
    const [certainty, setCertainty] = useState<Number>(0)
    const getTags = async() => {
        const id = toast.loading("Please Wait");
        setIsDisabled(true);
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/getTags`, {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                "problem": text
            })
        });
        const data = await response.json()
        setTags(data?.topics)
        setCertainty(data?.certainty)
        setIsDisabled(false);
        toast.update(id, {render: "Task successfull", type: "success", isLoading: false, autoClose: 3000})
    }
    return (
    <div className='relative bg-white min-h-[100vh] overflow-x-hidden'>
        <div className='bg-[#74d36f] absolute top-[-6rem] -z-5 right-[-15rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]'></div>
        <div className='bg-[#5348d6] absolute top-[-1rem] -z-5 left-[-15rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]'></div>
        <>
            <div className='relative z-10 pt-5 px-4 min-w-[320px] w-[60%] mx-auto flex flex-col items-center gap-4'>
                <div className='text-4xl mx-auto bg-gradient-to-r  from-slate-800 to-slate-600 font-bold inline-block text-transparent bg-clip-text'>Echo</div>
                <p className='mx-auto bg-gradient-to-r text-center from-slate-800 to-slate-600 inline-block text-transparent bg-clip-text'>
                    Quickly identify question types to target your study efforts and improve your understanding of specific topics. 
                </p>
                <p className='mx-auto bg-gradient-to-r text-center  from-slate-800 to-slate-600 inline-block text-transparent bg-clip-text'> 
                    LeetAssist's AI powered model - ECHO got you covered ! 
                </p>
                <div className='flex flex-col gap-4 items-center justify-center'>
                    <p className='text-slate-800'>
                        1. Input Your Question
                        Just paste your question into our input box.
                    </p>
                    <p className='text-slate-800'>
                        2. Predict Category
                        Click on the 'Predict' button to analyze the question.
                    </p>
                    <p className='text-slate-800'>
                        3. Get Instant Results
                        Receive the category of your question instantly.
                    </p>
                    <textarea className='w-[400px] rounded-md p-4 resize-none bg-stone-100 bg-opacity-40 backdrop-blur-md outline-none text-zinc-900 shadow-sm' onChange={(e )=>{ setText(e.target.value) }} rows={8} />
                </div>
                <button disabled={isDisabled} onClick={()=>{getTags()}} className='border-black border-2 p-2 rounded-md bg-gradient-to-r from-slate-800 to-slate-600 font-bold inline-block text-transparent bg-clip-text hover:scale-95 duration-200'>
                    Predict
                </button>
                <div>
                    {
                        tags.length > 0 && (<div className='flex flex-col items-center gap-2'>
                            <div className='flex flex-row items-center gap-4'>
                                {
                                    tags.map((tag, index) => {
                                        return (<div key={index} className='text-2xl capitalize bg-green-400/80 backdrop-blur-md p-2 rounded-md cursor-pointer'>
                                            {
                                                tag
                                            }
                                        </div>)
                                    })
                                }    
                            </div>
                            <p>Certainty : {certainty.toString()} %</p>
                        </div>)
                    }
                </div>
            </div>
        </>
    </div>
  )
}

export default Tags
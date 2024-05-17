import { useState, useEffect } from 'react'
import { SearchBar } from '../components/SearchBar'

export interface problemInterface{
    id: number,
    name: string,
    description: string,
    is_premium: 0 | 1,
    difficulty: string,
    acceptance_rate: Number,
    url: string,
    accepted: string,
    submissions: string,
    companies: string[],
    related_topics: string[],
    likes: Number,
    dislikes: Number,
    asked_by_faang: 0 | 1,
}

const Recommend = () => {
    const [problem, setProblem] = useState<string>("")
    const [problems, setProblems] = useState<problemInterface[]>([])
    const [recProblems, setRecProblems] = useState<problemInterface[]>([])
    const [RecommendX, setRecommendX] = useState<boolean>(false)
    const [text, setText] = useState("");

    useEffect(()=>{
        (async()=>{
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/problems`)
            const data = await res.json()
            setProblems(data.problems);
        })()  
    }, [])

    const getRecommendations = async() => {
        if(RecommendX){
            console.log(text.split(' '))
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/recommendX`, {
                method: 'post',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    "tags": text.split(' ')
                })
            });
            const data = await response.json()
            setRecProblems(data.recommended_problems)
        }
        else{
            if(problem === "") return;
    
            const problem_id = problems.find((prob)=>{
                return prob.name.toLowerCase() === problem
            })?.id
    
            if(problem_id){
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/recommend/${problem_id}`);
                const data = await response.json()
                console.log(data)
                setRecProblems(data.recommended_problems)
            }
        }
    }
  return (
    <div className='relative bg-stone-900 min-h-[100vh] overflow-x-hidden'>
        <div className='bg-[#417a3e] absolute top-[-6rem] -z-5 right-[-15rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]'></div>
        <div className='bg-[#676394] absolute top-[-1rem] -z-5 left-[-15rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]'></div>
        {
            !RecommendX ? (
                <>               
                    <div className='relative z-10 pt-5 px-4 min-w-[320px] w-[60%] mx-auto flex flex-col items-center gap-4'>
                        <div className='text-4xl mx-auto bg-gradient-to-r from-slate-400 to-slate-100 font-bold inline-block text-transparent bg-clip-text'>Echo</div>
                        <p className='mx-auto bg-gradient-to-r text-center from-slate-200 to-slate-100 inline-block text-transparent bg-clip-text'>
                            Stuck on a problem and seeking more practice? 
                        </p>
                        <p className='mx-auto bg-gradient-to-r text-center from-slate-200 to-slate-100 inline-block text-transparent bg-clip-text'> 
                            CodeComrade's AI powered model - ECHO got you covered ! 
                        </p>
                        <div >
                            <SearchBar problems={problems} value={problem} setValue={setProblem}/>
                        </div>
                        <button onClick={getRecommendations} className='border-slate-400 border-2 p-2 rounded-md bg-gradient-to-r from-slate-400 to-slate-100 font-bold inline-block text-transparent bg-clip-text hover:scale-95 duration-200'>
                            Recommend Me
                        </button>
                        <button onClick={()=>{setRecommendX(true)}} className='text-center bg-black p-2 rounded-md text-slate-100 bg-opacity-60 backdrop-blur-md hover:scale-95 duration-200'> 
                            Problem Not on Leetcode?
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className='relative z-10 pt-5 px-4 min-w-[320px] w-[60%] mx-auto flex flex-col items-center gap-4'>
                        <div className='text-4xl mx-auto bg-gradient-to-r from-slate-400 to-slate-100 font-bold inline-block text-transparent bg-clip-text'>Echo</div>
                        <p className='mx-auto bg-gradient-to-r text-center from-slate-200 to-slate-100 inline-block text-transparent bg-clip-text'>
                            Stuck on a problem and seeking more practice? 
                        </p>
                        <p className='mx-auto bg-gradient-to-r text-center from-slate-200 to-slate-100 inline-block text-transparent bg-clip-text'> 
                            CodeComrade's AI powered model - ECHO got you covered ! 
                        </p>
                        <div className='flex flex-col gap-4 items-center justify-center'>
                            <p className='text-slate-300'>
                                Can You Describe the question?
                            </p>
                            <textarea className='w-[400px] rounded-md p-4 resize-none bg-stone-900 bg-opacity-40 backdrop-blur-md outline-none text-zinc-300 shadow-sm' onChange={(e )=>{ setText(e.target.value) }} rows={8} />
                        </div>
                        <button onClick={getRecommendations} className='border-slate-400 border-2 p-2 rounded-md bg-gradient-to-r from-slate-400 to-slate-100 font-bold inline-block text-transparent bg-clip-text hover:scale-95 duration-200'>
                            Recommend Me
                        </button>
                        <button onClick={()=>{setRecommendX(false)}} className='text-center bg-black p-2 rounded-md text-slate-100 bg-opacity-60 backdrop-blur-md hover:scale-95 duration-200'> 
                            Problem on Leetcode?
                        </button>
                    </div>
                </>
            )
        }
        <div className='relative z-10 mt-20 flex flex-wrap gap-4 p-4 items-center justify-center'>
            {
                recProblems.map((prob)=>{
                    return (<div key={prob.id} className='min-w-[320px] w-[400px] flex flex-col gap-4 bg-black bg-opacity-40 p-4 backdrop-blur-md rounded-md'>
                        <p className=' text-xl font-bold bg-gradient-to-r text-center from-slate-400 to-slate-100 inline-block text-transparent bg-clip-text'>{prob.name.substr(0, 20)}...</p>
                        <p className='text-sm text-slate-300 font-bold text-center'>{prob.description.substr(0, 200)}...</p>
                        <p className='text-sm text-slate-300 font-bold text-center'>{prob.is_premium ? "Premium" : "Free"}</p>
                        <a href={prob.url} className='text-center bg-blue-600 p-2 rounded-md text-slate-100 bg-opacity-80 backdrop-blur-md hover:scale-95 duration-200'>Solve Now</a>
                    </div>)
                })
            }
        </div>
    </div>
  )
}

export default Recommend
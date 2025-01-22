import axios from 'axios';
import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Hole from '../components/hole';
interface BlogContent {
    title?: string;
    content: string;
    imageUrl?: string;
}

interface Problem {
  problemName: string;
  problemLink: string;
  hints: string[];
}

interface Blog {
  topic: string;
  title: string;
  code?: string;
  content: BlogContent[];
  problems?: Problem[];
}
  
const Blogs = () => {
    const {slug} = useParams();
    const nodeBase = `https://codeassist-q2nt.onrender.com/blogs/fetch`
    const [blog, setBlog] = useState<Blog | null>(null);
    useEffect(()=>{
        (async()=>{
            try{
                const response = await axios.get(`${nodeBase}/${slug}`);
                setBlog(response.data.data);
            } catch(err){
                console.log(err);
            }
        })()
    }, []);
    if(blog === null){
        return <Hole/>
    }
    return (
        <div className='relative bg-[#11192D] min-h-[100vh] overflow-x-hidden w-full min-w-[320px] p-8'>
            <div className='bg-[#1e8296] absolute top-[4rem] -z-5 left-[-35rem] h-[15.25rem] w-[15.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]'></div>
            <div className='relative z-10'>
                <div className='text-4xl text-slate-100 font-bold'>{blog.title}</div>
                <div className='my-8 w-[80%] min-w-[320px] mx-auto'>{
                    blog.content.map((para, ind)=>{
                        return <div key = {ind}>
                            {
                                para.title &&
                                <div className='text-2xl py-2 text-slate-200 font-semibold'>{para.title}</div>
                            }
                            {
                                para.imageUrl && <div className='rounded-md'><img src={para.imageUrl} className=''/></div>
                            }
                            <div className='text-slate-300 py-2 translate-x-10'>✅ {para?.content}</div>
                        </div>
                    })    
                }</div>
                <div className='my-8 w-[80%] min-w-[320px] mx-auto'>{
                    blog.problems && 
                    <div>
                        {
                            blog.problems.map((para, ind)=>{
                                return <div key = {ind} className=''>
                                    {
                                        para.problemName &&
                                        <div className='py-2 text-sky-500 underline font-semibold'>
                                        <a href={para.problemLink} target='_blank'>✅ {para.problemName}</a></div>
                                    }
                                    <div className='text-slate-300 py-2 translate-x-10'>{para.hints.map((hint, ind)=>{
                                        return <div key={ind} className='py-2'>
                                            📌  {hint}
                                        </div>
                                    })}</div>
                                </div>
                            })    
                        }
                    </div>
                }</div>
            </div>
        </div>
    )
}

export default Blogs
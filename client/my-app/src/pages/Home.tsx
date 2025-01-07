import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
  return (
    <div className='relative bg-[#11192D] min-h-[100vh] overflow-x-hidden w-full min-w-[320px]'>
        <div className='bg-[#1e8296] absolute top-[4rem] -z-5 left-[-35rem] h-[15.25rem] w-[15.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] -z-2'></div>
        <div className='text-center mt-4 text-4xl font-bold text-slate-200 relative z-10'>CodeAssist: Revolutionizing Coding Learning with Adaptive AI</div>
        <div className='text-[#67c2ec] px-4 py-4 cursor-pointer flex flex-row items-center justify-center gap-2 relative z-10'>Welcome to CodeAssist, the world's first adaptive learning platform designed to personalize your coding journey based on your unique abilities, psychological traits, and learning behavior.</div>
        <div className='flex flex-col items-center justify-center mt-8'>
            <button className='w-[300px] bg-[#1e8296] cursor-pointer border-2 border-white text-white text-center py-1 rounded-md hover:bg-[#1e5296] duration-200'>Register Now</button>
        </div>

        <div className='mx-[1rem] md:mx-[4rem] my-[4rem]'>
            <span className='text-xl text-white bg-[#1e8296]/50 relative z-10 px-2 rounded-full'>Introducing Echo:</span>
            <div className='relative z-10 text-sm text-slate-300 pt-2'>Stuck on a problem and seeking more practice? LeetAssist recommends similar LeetCode questions tailored to your current challenge, helping you strengthen your problem-solving skills efficiently.</div>
            <div className='shadow-xl mt-4 shadow-gray-600'>
                <video muted autoPlay loop> 
                    <source src={'https://res.cloudinary.com/dinouvzsz/video/upload/v1736152245/Screen_Recording_2025-01-06_135558_i5birs.mp4'}/>
                </video>
            </div>
        </div>
        <div className='mx-[1rem] md:mx-[4rem] my-[4rem]'>
            <div className='relative z-10 text-sm text-slate-300 pt-2'>Unlock the future of your coding journey with LeetForesight! Our AI-powered model predicts your next contest rating, helping you strategize and improve your performance.</div>
            <div className='shadow-xl mt-4 shadow-gray-600'>
                <video muted autoPlay loop> 
                    <source src={'https://res.cloudinary.com/dinouvzsz/video/upload/v1736154809/Screen_Recording_2025-01-06_144143_jrb5xq.mp4'}/>
                </video>
            </div>
        </div>
        <div className='flex flex-col items-center justify-center my-8'>
            <button onClick={()=>{
                navigate('/echo')
            }} className='w-[300px] bg-[#1e8296] cursor-pointer border-2 border-white text-white text-center py-1 rounded-md hover:bg-[#1e5296] duration-200'>Try Echo</button>
        </div>
    </div>
  )
}

export default Home
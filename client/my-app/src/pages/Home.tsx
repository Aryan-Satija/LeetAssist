import { useNavigate } from 'react-router-dom';
import ConfettiExplosion from '../components/background'
import code from '../assests/code.png';
import { WandSparkles, MoveRight } from 'lucide-react';
import '../index.css'
const Home = () => {
    const navigate = useNavigate();
  return (
    <div className='relative bg-[#000000] min-h-[100vh] overflow-x-hidden w-full min-w-[320px]'>
        <div className='flex flex-col items-center justify-center h-[100vh]'>
            <ConfettiExplosion/>
            <div className='flex flex-col-reverse md:flex-row items-center justify-center h-full w-full gap-8 px-[2rem]'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='bg-gradient-to-b from-[#727273] to-[#9d9c9c] inline-block text-transparent bg-clip-text text-4xl md:text-8xl font-bold'>Introducing</div>
                    <div className='bg-[#ffffff] inline-block text-transparent bg-clip-text text-4xl md:text-8xl font-bold'>CodeAssist</div>
                    <div className='text-slate-400 pt-4 text-center text-sm md:text-md'>Welcome to CodeAssist, the world's first adaptive learning platform designed to personalize your coding journey based on your unique abilities, psychological traits, and learning behavior.</div>
                    <div className='flex flex-row items-center justify-between pt-4 gap-8'>
                        <div>
                            <button className="button flex items-center justify-center" onClick={()=>{
                                navigate('/register')
                            }}>
                                <span className='flex flex-row items-center text-center justify-center gap-4 text-xs md:text-lg'>Register Now</span>
                            </button>
                        </div>
                        <div>
                            <button className="button flex items-center justify-center" onClick={()=>{
                                navigate('/login')
                            }}>
                                <span className='flex flex-row items-center text-center justify-center text-xs md:text-lg'>Login Now </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={code} alt="Code" className='w-[320px] md:w-[820px] rounded-md rotate-12'/>
                </div>
            </div>
        </div>
        <div className='mx-[1rem] md:mx-[4rem] my-[4rem]'>
            <div className='bg-gradient-to-b from-[#727273] to-[#9d9c9c] inline-block text-transparent bg-clip-text text-4xl md:text-8xl font-bold'>Introducing Echo:</div>
            <div className='flex flex-col md:flex-row items-center justify-center gap-4 pb-[4rem]'>
                <div className='text-md text-slate-300 pt-2 text-center flex flex-col'>
                    <div>
                        <div className='text-xs md:text-lg text-slate-300 pt-2 text-center'>
                            Stuck on a problem and seeking more practice?
                        </div>
                        <div className='text-xs md:text-lg text-slate-300 pt-2 text-center'> 
                            LeetAssist recommends similar LeetCode questions tailored to your current challenge, helping you strengthen your problem-solving skills efficiently.
                        </div>
                        <div className='my-8'> 
                            <button className="button" onClick={()=>{
                                navigate('/echo')
                            }}>
                                <span className='flex flex-row items-center justify-center gap-4 text-xs md:text-lg'>Try Out <WandSparkles/></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='shadow-xl mt-4 shadow-gray-800 rounded-md'>
                    <video muted autoPlay loop className='rounded-md'> 
                        <source src={'https://res.cloudinary.com/dinouvzsz/video/upload/v1736152245/Screen_Recording_2025-01-06_135558_i5birs.mp4'}/>
                    </video>                
                </div>
            </div>
            <div className='flex flex-col md:flex-row-reverse items-center justify-center gap-4 pb-[4rem]'>
                <div className='text-md text-slate-300 pt-2 text-center flex flex-col'>
                    <div>
                        <div className='text-xs md:text-lg text-slate-300 pt-2 text-center'>
                            Unlock the future of your coding journey with CodeForesight!
                        </div>
                        <div className='text-xs md:text-lg text-slate-300 pt-2 text-center'> 
                            Our AI-powered model predicts your next contest rating, helping you strategize and improve your performance.
                        </div>
                        <div>
                            <div className='my-8'> 
                                <button className="button" onClick={()=>{
                                    navigate('/echo')
                                }}>
                                    <span className='flex flex-row items-center justify-center gap-4 text-xs md:text-lg'>Try Out <WandSparkles/></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='shadow-xl mt-4 shadow-gray-800 rounded-md'>
                    <video muted autoPlay loop className='rounded-md'> 
                        <source src={'https://res.cloudinary.com/dinouvzsz/video/upload/v1736154809/Screen_Recording_2025-01-06_144143_jrb5xq.mp4'}/>
                    </video>                
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home

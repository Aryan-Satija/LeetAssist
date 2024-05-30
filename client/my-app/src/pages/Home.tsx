import {Brain, BrainCircuit, CodeXml, Laptop} from 'lucide-react';
import Footer from '../components/footer';
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
        <div className='w-[60%] min-w-[320px] mt-[4rem] mx-auto flex flex-col gap-4'>
            <div className='text-center text-2xl bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent font-semibold'>Predicting Leetcode Questions</div>
            <p className='text-center text-slate-600'>
                Stuck on a problem and seeking more practice? LeetAssist recommends similar LeetCode questions tailored to your current challenge, helping you strengthen your problem-solving skills efficiently.
            </p>
        </div>
        <div className='mx-[1rem] md:mx-[4rem] my-[4rem] shadow-xl shadow-slate-500'>
            <video autoPlay loop muted>
                <source src={'https://res.cloudinary.com/dinouvzsz/video/upload/v1717065704/echo.mp4'}/>
            </video>
        </div>

        <div className='w-[60%] min-w-[320px] mt-[4rem] mx-auto flex flex-col gap-4'>
            <div className='text-center text-2xl bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent font-semibold'>Predict Your Next LeetCode Rating</div>
            <p className='text-center text-slate-600'>
                Unlock the future of your coding journey with LeetForesight! Our AI-powered model predicts your next LeetCode contest rating, helping you strategize and improve your performance.
            </p>
        </div>
        <div className='mx-[1rem] md:mx-[4rem] my-[4rem] shadow-xl shadow-slate-500'>
            <video muted autoPlay loop> 
                <source src={'https://res.cloudinary.com/dinouvzsz/video/upload/v1717068447/echo_rating.mp4'}/>
            </video>
        </div>
        <Footer/>
    </div>
  )
}

export default Home
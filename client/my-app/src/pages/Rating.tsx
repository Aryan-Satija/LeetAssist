import { useState } from 'react'
import {Bar} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Rating = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [forecast, setForecast] = useState<number[]>([]);
  const predictRating = async() => {
    console.log('loading....');
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/predict_my_rating/${username}`)
    const data = await response.json()
    setUser(data.user)
    setForecast(data.forecast)
  }
  return (
    <div className='relative bg-white min-h-[100vh] overflow-x-hidden'>
        <div className='bg-[#74d36f] absolute top-[-6rem] -z-5 right-[-15rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]'></div>
        <div className='bg-[#5348d6] absolute top-[-1rem] -z-5 left-[-15rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]'></div>
        <div className='relative z-10 pt-5 px-4 min-w-[320px] w-[60%] mx-auto flex flex-col items-center gap-4'>
            <div className='text-4xl mx-auto bg-gradient-to-r from-slate-800 to-slate-600 font-bold inline-block text-transparent bg-clip-text'>Echo</div>
            <p className='mx-auto bg-gradient-to-r text-center from-slate-800 to-slate-600 font-bold inline-block text-transparent bg-clip-text'>
                Predict the Future: See Your Ratings Before They Happen!
            </p>
            <p className='mx-auto bg-gradient-to-r text-center from-slate-800 to-slate-600 font-bold inline-block text-transparent bg-clip-text'> 
              Welcome to LeetAssist, where future ratings are just a click away. Our advanced AI model predicts user ratings to help you stay ahead of the curve.
            </p>
            <div className='flex flex-col items-center gap-2'>
              <div className='flex flex-col gap-4 items-center justify-center'>
                <p className='text-slate-800/80 font-bold'>
                    Enter your username below to see your predicted rating.
                </p>
                <input className='w-[400px] rounded-md p-2 border-2 border-black/60 resize-none bg-stone-100 bg-opacity-40 backdrop-blur-md outline-none text-zinc-900 shadow-sm' spellCheck={false} onChange={(e)=>{setUsername(e.target.value)}}/>
              </div>
              <button onClick={predictRating} className='border-black border-2 p-2 rounded-md bg-gradient-to-r from-slate-800 to-slate-600 font-bold inline-block text-transparent bg-clip-text hover:scale-95 duration-200 '>
                  Predict My Rating
              </button>
            </div>
        </div>
        <div className='flex flex-col items-center'>
        {
          forecast.length > 0  && 
          <Bar height={100}
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
        }
        </div>
    </div>
  )
}

export default Rating
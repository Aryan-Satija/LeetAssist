import { NavData } from '../data/NavData'
import {Link} from 'react-router-dom';
import logo from '../assests/logoX.png'
import 'video-react/dist/video-react.css';
const Navbar = () => {
  return (
    <div className='sticky z-20 backdrop-blur-md top-0 bg-slate-100/10 shadow-xl flex items-center py-2 px-4 justify-between'>
        <div>
            <img src={logo} className='h-14 w-14 rounded-full'/>
        </div>
        <div className='hidden sm:flex items-center justify-between gap-4 sm:gap-0 sm:w-[60%] py-4 text-md text-slate-950'>
            {
                NavData.map((nav) => {
                    return <Link to={nav.path} key={nav.id}>
                        {
                            nav.name
                        }
                        {
                            nav.icon
                        }
                    </Link>
                })
            }        
        </div>
        <div>

        </div>
    </div>
  )
}

export default Navbar
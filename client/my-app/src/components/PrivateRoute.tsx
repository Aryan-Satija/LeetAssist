import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Hole from "../components/hole"
interface PrivateRoutesProps {
    children: ReactNode;
}

function PrivateRoutes({children}: PrivateRoutesProps){
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState<Boolean>(true);
    const [valid, setValid] = useState<Boolean>(false);
    const base = `https://codeassist-q2nt.onrender.com`
    useEffect(()=>{
        (async()=>{
            try{
                const response = await axios.post(`${base}/auth/validate`, null, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if(response.data.success)
                    setValid(true);
            } catch(err){
                console.log(err);
            }
            setLoading(false);
        })();
    }, [])
    if(loading){
        return <Hole/>
    }
    return (
        <div>
            {
                valid ? (children): (<Navigate to="/login" />)
            }
        </div>
    )
};

export default PrivateRoutes;


import {Dispatch, SetStateAction} from "react";
import { SendHorizontal } from 'lucide-react';
import {  Input, Select } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
interface props{
    setChat : Dispatch<SetStateAction<{text: string, sender: string}[]>>,
    setMode: Dispatch<SetStateAction<number>>,
    setText: Dispatch<SetStateAction<string>>,
    setPlaceholder: Dispatch<SetStateAction<string>>,
    setSession: Dispatch<SetStateAction<Boolean>>,
    setIsloading: Dispatch<SetStateAction<Boolean>>,
    setLoading: Dispatch<SetStateAction<number>>,
    setPlatform: Dispatch<SetStateAction<number>>,
    mode: number,
    platform: number,
    text: string,
    placeholder: string,
    session: Boolean,
};
const Query = ({setChat, setMode, setText, setPlaceholder, setSession, setIsloading, setLoading, setPlatform, mode, platform, text, placeholder, session}: props) => {
    const base = 'https://codeassist-1-4r2r.onrender.com' 
    // const base = 'http://localhost:8000' 
    const startSession = async()=>{
        let hasError = false;
        setIsloading(true);
        setLoading(0)
        try {
            const response = await axios.get(`${base}`, {
              onDownloadProgress: (progressEvent) => {
                if(progressEvent.progress == undefined) return;
                const percentCompleted = (progressEvent.progress * 100);
                setLoading(percentCompleted);
              },
            });
        } catch (error) {
            hasError = true;
            setIsloading(false);
            setLoading(0);
            setChat((prev)=>{
                return [...prev, {
                    sender: 'echo',
                    text: 'Something Went Wrong 😅🫤🥲❌',
                }]
            });
        } finally {
            if(hasError) return;
            setIsloading(false);
            setLoading(0);
            setSession(true);
            setChat((prev)=>{
                return [...prev, {
                    sender: 'echo',
                    text: 'Session Started 🎉🎊🎈🎀',
                }]
            });
        }
    }
    
    const predictRating = async()=>{
        let hasError = false;
        setIsloading(true);
        setLoading(0)
        try {
            const url = (platform === 1 ? `${base}/echo/ratings/lc/${text}` : `${base}/echo/ratings/cf/${text}`)
            const response = await axios.get(url, {
              onDownloadProgress: (progressEvent) => {
                if(progressEvent.progress == undefined) return;
                const percentCompleted = (progressEvent.progress * 100);
                setLoading(percentCompleted);
              },
            });
            if(response.data.status !== 200){
                setChat((prev)=>{
                    return [...prev, {
                        sender: 'echo',
                        text: response.data.message,
                    }]
                });
            }
            else{
                setChat((prev)=>{
                    return [...prev, {
                        sender: 'echo',
                        text: `Here\'s the forecast:`,
                    }]
                });
                setChat((prev)=>{
                    return [...prev, {
                        sender: 'echo',
                        text: `plot||${response.data.forecast[0]}||${response.data.forecast[1]}||${response.data.forecast[2]}||${response.data.forecast[3]}||${response.data.forecast[4]}||`,
                    }]
                });
            }
        } catch (error) {
            hasError = true;
            setIsloading(false);
            setLoading(0);
            setChat((prev)=>{
                return [...prev, {
                    sender: 'echo',
                    text: 'Something Went Wrong 😅🫤🥲❌\n\n\n\nMake Sure The User exists!',
                }]
            });
        } finally {
            if(hasError) return;
            setIsloading(false);
            setLoading(0);
        }
    }

    const recommend = async()=>{
        setIsloading(true);
        setLoading(0)
        try{
            const url = `${base}/echo/recommendFromText`
            const response = await axios.post(url, {
                tags: text.split(' ')
            }, {
                onDownloadProgress: (progressEvent) => {
                  if(progressEvent.progress == undefined) return;
                  const percentCompleted = (progressEvent.progress * 100);
                  setLoading(percentCompleted);
                }
            }
        );
            let problems = response.data 
            problems.forEach((problem : null | {difficulty: string, is_premium: Boolean, problem_URL: string, problem_description: string, similarity: number, title: string}) => {
                if(problem === null) return;
                const prob = {
                    difficulty:  problem.difficulty,
                    is_premium:  problem.is_premium,
                    problem_URL:  problem.problem_URL,
                    similarity:  (problem.similarity > 0.75 ? 'Very High' : (problem.similarity > 0.5 ? 'High' : (problem.similarity > 0.25 ? 'Medium' : ('Low')))),
                    title:  problem.title,
                    problem_description: problem.problem_description
                }
                setChat((prev)=>{
                    return [...prev, {
                        sender: 'echo',
                        text: `problem||${JSON.stringify(prob)}`,
                    }]
                });
            })
        } catch(error){
            console.log(error); 
            setChat((prev)=>{
                return [...prev, {
                    sender: 'echo',
                    text: 'Something Went Wrong 😅🫤🥲❌',
                }]
            });
        } finally{
            setIsloading(false);
            setLoading(0);
        }
    }

    const tagsRecommend = async()=>{
        setIsloading(true);
        setLoading(0)
        try{
            const url = `${base}/echo/tags`
            const response = await axios.post(url, {
                tags: text
            }, {
                onDownloadProgress: (progressEvent) => {
                  if(progressEvent.progress == undefined) return;
                  const percentCompleted = (progressEvent.progress * 100);
                  setLoading(percentCompleted);
                },
            });
            let mx = 0, tags = "";
            const response_array : {certainty: number, tags: string}[] = Object.values(response.data)
            response_array.forEach((prob : {certainty: number, tags: string})=>{
                if(prob.certainty > mx){
                    mx = prob.certainty
                    tags = prob.tags
                }
            })
            setChat((prev)=>{
                return [...prev, {
                    sender: 'echo',
                    text: `tags||${tags}`,
                }]
            })
        } catch(error){
            console.log(error); 
            setChat((prev)=>{
                return [...prev, {
                    sender: 'echo',
                    text: 'Something Went Wrong 😅🫤🥲❌',
                }]
            });
        } finally{
            setIsloading(false);
            setLoading(0);
        }
    }
    
    const completeAnalysis = async()=>{
        setIsloading(true);
        setLoading(0)
        try{
            const url = `${base}/echo/tags`
            let response = await axios.post(url, {
                tags: text
            }, {
                onDownloadProgress: (progressEvent) => {
                  if(progressEvent.progress == undefined) return;
                  const percentCompleted = (progressEvent.progress * 100);
                  setLoading(percentCompleted);
                },
            });
            let mx = 0, probtags : string = "";
            const response_array : {certainty: number, tags: string}[] = Object.values(response.data)
            response_array.forEach((prob : {certainty: number, tags: string})=>{
                if(prob.certainty > mx){
                    mx = prob.certainty
                    probtags = prob.tags
                }
            })
            let tags = probtags.split(', ') 
            tags = tags.map(tag=> tag.slice(1, -1))
            response = await axios.post(`${base}/echo/recommendFromText`, {
                tags: text.split(' ')
            }, {
                onDownloadProgress: (progressEvent) => {
                  if(progressEvent.progress == undefined) return;
                  const percentCompleted = (progressEvent.progress * 100);
                  setLoading(percentCompleted);
                }
            });
            let problems = response.data 
            const nodeBase = `https://codeassist-q2nt.onrender.com`;
            response = await axios.post(`${nodeBase}/blogs/fetchBlogs`, {
                topics: tags
            });
            const blogs = response.data.data
            const analysis = {
                blogs,
                problems,
                tags
            }
            setChat((prev)=>{
                return [...prev, {sender: 'echo', text: 'analysis||' + JSON.stringify(analysis)}];
            })
        } catch(error){
            console.log(error); 
            setChat((prev)=>{
                return [...prev, {
                    sender: 'echo',
                    text: 'Something Went Wrong 😅🫤🥲❌',
                }]
            });
        } finally{
            setIsloading(false);
            setLoading(0);
        }
    }
    const sendMessage = async()=>{
        if(text.length == 0){
            toast.info('Invalid Message', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        setChat((prev)=>{
            return [...prev, {
                text:text,
                sender:'user'
            }]
        });
        if(text == "Hey Echo!"){
            setChat((prev)=>{
                return [...prev, {
                    text:'Hey User, Starting the session! 😊',
                    sender:'echo'
                }]
            });
            await startSession();
        }
        else if(mode == 1){
            setChat((prev)=>{
                return [...prev, {
                    text:`Crunching past performances of ${text}!\nUsing it to forecast! 😊`,
                    sender:'echo'
                }]
            });
            await predictRating();
        }
        else if(mode == 2){
            setChat((prev)=>{
                return [...prev, {
                    text:`Searching for similar problems😊`,
                    sender:'echo'
                }]
            });
            await recommend();
        }
        else if(mode == 3){
            setChat((prev)=>{
                return [...prev, {
                    text:`Analyzing😊`,
                    sender:'echo'
                }]
            });
            await tagsRecommend();
        }
        else {
            await completeAnalysis();
        }
        setText("");
    }
    return (
    <div className="px-8 flex flex-row items-center justify-between gap-2 mt-4 w-full">
      {/* footer */}
      {!session ? (
        <div
          className="w-[108px] text-[#67c2ec] bg-[#319dce]/30 p-1 rounded-md cursor-pointer duration-200 animate-bounce"
          onClick={() => {
            setText("Hey Echo!");
          }}
        >
          Start Session
        </div>
      ) : (
        <div className="cursor-pointer flex flex-row items-center gap-2">
          <div>
            <Select
              showSearch
              placeholder="Select Mode"
              optionFilterProp="label"
              className="text-white"
              onChange={(value) => {
                setMode(value);
                setPlaceholder("Describe Problem");
                if (value === 1) setPlaceholder("");
              }}
              options={[
                {
                  value: 1,
                  label: "Rating Forecast",
                },
                {
                  value: 2,
                  label: "Recommend Similar Problems",
                },
                {
                  value: 3,
                  label: "Tag Predictor",
                },
                {
                  value: 4,
                  label: "Complete Analysis",
                },
              ]}
            />
          </div>
          {mode === 1 && (
            <div>
              <Select
                showSearch
                placeholder="Select Platform"
                optionFilterProp="label"
                className="text-white"
                onChange={(value) => {
                  setPlatform(value);
                  setPlaceholder("Enter a valid username");
                }}
                options={[
                  {
                    value: 1,
                    label: "Leetcode",
                  },
                  {
                    value: 2,
                    label: "Codeforces",
                  },
                ]}
              />
            </div>
          )}
        </div>
      )}
      <div className="w-full flex flex-row items-center gap-2">
        <div className="w-full">
          <Input
            variant="filled"
            className="bg-[#1e8296]/10 hover:bg-[#1e8296]/20 focus:bg-[#1e8296]/20 outline-none border-[#1e8296] text-slate-200 disabled:text-slate-200 placeholder:text-slate-200"
            disabled={placeholder === ""}
            value={text}
            onChange={(event) => {
              if (placeholder === "") return;
              setText(event.target.value);
            }}
            placeholder={placeholder}
          />
        </div>
        <div
          className="text-[#67c2ec] bg-[#319dce]/30 p-1 rounded-md cursor-pointer duration-200 hover:scale-95"
          onClick={sendMessage}
        >
          <SendHorizontal />
        </div>
      </div>
    </div>
  );
};

export default Query;

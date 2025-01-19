import React, { useState } from 'react';
import { Carousel, Modal, Table } from 'antd';
import { Braces, Send } from 'lucide-react';
import * as Tooltip from "@radix-ui/react-tooltip";
import axios from 'axios';
import { toast } from 'react-toastify';
interface timelineObj{
    children: String
}
interface props {
  rating: Number,
  step: number,
  email: String
}
interface problem{
    id: String,
    title: String,
    slug: String,
    solved: Boolean
}
const POTD: React.FC<props> = ({rating, step, email}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const nodeBase = 'https://codeassist-q2nt.onrender.com';
//   const nodeBase = 'http://127.0.0.1:5173';
  const [timeline, setTimeline] = useState<timelineObj[]>([]);
  const [timeTaken, setTimeTaken] = useState<string>('100');
  const showModal = () => {
    setOpen(true);
  };
  const [sheet, setSheet] = useState<problem[]>([]);
  const increment = async(problem : String)=>{
    const id = toast.loading("Please Wait....")
    try {
        await axios.post(`${nodeBase}/potd/increment`, {
            email: email,
            timeTaken: timeTaken,
            problem
        })
        toast.update(id, {render: "Task Successful", type: "success", isLoading: false, autoClose: 3000})
    } catch(err){
        console.log(err);
        toast.update(id, {render: "Task Failed", type: "error", isLoading: false, autoClose: 3000})
    }
  }
  const roadMap = async()=>{
      try{
        let tag = "dynamic-programming" 
        console.log("pls wait");
        const response = await axios.post(`${nodeBase}/roadmap/roadmap`, {
            lc_rating: rating
        });
        setTimeline(response.data.data.map((top : String) => {
            return {
                children: top
            }
        }));
        tag = response.data.data[step % response.data.data.length];
        const sotd = await axios.post(`${nodeBase}/potd/potd`, {
            rating: rating,
            email: email,
            tags: [tag]
        });
        setSheet(sotd.data.data)
        setOpen(true);
    } catch(err){
        console.log(err);
    }
}
  const handleOk = () => {
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
        <Tooltip.Provider>
              <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                        <button onClick={roadMap}>
                            <Braces />
                        </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content className="TooltipContent" sideOffset={5}>
                              <div className='opacity-100'>
                                  Sheet Of The Day
                              </div>
                              <Tooltip.Arrow className="TooltipArrow" />
                        </Tooltip.Content>
                    </Tooltip.Portal>
              </Tooltip.Root>
        </Tooltip.Provider>
        <Modal
          title="Sheet Of The Day"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel} 
        >
            <div>
                <Carousel arrows infinite={false} className='bg-[#11192D] h-full'>
                    {
                        sheet.map((prob, ind)=>{
                            return (<div key={ind} className='bg-[#11192D] h-full flex flex-col items-center justify-between p-4'>
                                <div className='text-start text-slate-100 text-4xl font-bold'>#{prob.id}</div>
                                <div className='text-center text-slate-400 text-md py-4'>{prob.title}</div>
                                <div>
                                    <button className="button" >
                                        <a href={`https://leetcode.com/problems/${prob.slug}`} target='_blank'>
                                            <span className='flex flex-row items-center justify-center gap-4 text-md'>
                                                Solve
                                            </span>
                                        </a>
                                    </button>
                                </div>
                                <div className='flex flex-row items-center w-full justify-between py-4 gap-4'>
                                    <div className='w-full'>
                                        <input
                                            type='text'
                                            className='bg-slate-800 text-slate-100 rounded-md p-2 text-sm w-full'
                                            placeholder='Enter time in minutes'
                                            name='timeField'
                                            value={timeTaken}
                                            onChange={(event : React.ChangeEvent<HTMLInputElement>)=>{
                                                setTimeTaken(event.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className='text-slate-100 cursor-pointer bg-blue-400 p-1 flex flex-col items-center justify-center rounded-md' onClick={()=>{
                                        increment(prob.title);
                                    }}>
                                        <Send/>
                                    </div>
                                </div>
                            </div>)
                        })
                    }
                </Carousel>
            </div>
        </Modal>
    </>
  );
};

export default POTD;
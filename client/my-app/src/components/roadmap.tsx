import React, { useState } from 'react';
import { Timeline, Modal } from 'antd';
import {Network} from 'lucide-react';
import * as Tooltip from "@radix-ui/react-tooltip";
import axios from 'axios';
interface timelineObj{
    children: String
}
interface props {
  rating: Number
}
const Roadmap: React.FC<props> = ({rating}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const nodeBase = 'http://localhost:5173';
  const [timeline, setTimeline] = useState<timelineObj[]>([]);
  const showModal = () => {
    setOpen(true);
  };
  const roadMap = async()=>{
    try{
        console.log("pls wait");
        const response = await axios.post(`${nodeBase}/roadmap/roadmap`, {
            lc_rating: rating
        });
        setTimeline(response.data.data.map((top : String) => {
            return {
                children: top
            }
        }));
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
                      <Network />
                  </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                  <Tooltip.Content className="TooltipContent" sideOffset={5}>
                      <div className='opacity-100'>
                          Roadmap
                      </div>
                      <Tooltip.Arrow className="TooltipArrow" />
                  </Tooltip.Content>
              </Tooltip.Portal>
          </Tooltip.Root>
      </Tooltip.Provider>
      <Modal
        title="Roadmap"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel} 
      >
        <p className='mt-16'>
            <Timeline
                items={timeline}
            />
        </p>
      </Modal>
    </>
  );
};

export default Roadmap;
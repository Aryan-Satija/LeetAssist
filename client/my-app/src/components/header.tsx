import {useEffect, useState, Dispatch, SetStateAction} from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { CopyPlus, Bot, BookOpenText, PencilRuler, LogOut, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import POTD from "./potd";
import Roadmap from "./roadmap";
import Focus from "./focus";
interface props{
    setChat : Dispatch<SetStateAction<{text: string, sender: string}[]>>,
    setMode: Dispatch<SetStateAction<number>>,
    setText: Dispatch<SetStateAction<string>>,
    setPlaceholder: Dispatch<SetStateAction<string>>,
    setSession: Dispatch<SetStateAction<Boolean>>
};
const Header = ({setChat, setMode, setText, setPlaceholder, setSession}: props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<null | {
        rating: number,
        step: number,
        email: String
    }>(null);

    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        if(storedUser != null){
            try{
                setUser(JSON.parse(storedUser));
            } catch(err){
                console.log(err);
            }
        }
    }, []);
  return (
    <div
      className="w-full flex flex-row items-center justify-between pb-2 px-16"
      style={{ boxShadow: "0 5px 10px rgba(0, 0, 0, 0.3)" }}
    >
      {/* header */}
      <div className="flex flex-row items-center gap-6 text-md text-white font-semibold cursor-pointer">
        <div>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                >
                  <LogOut />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="TooltipContent" sideOffset={5}>
                  <div className="opacity-100">LogOut</div>
                  <Tooltip.Arrow className="TooltipArrow" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
        <div>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  onClick={() => {
                    setChat([]);
                    setMode(0);
                    setText("");
                    setPlaceholder("");
                    setSession(false);
                  }}
                >
                  <CopyPlus />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="TooltipContent" sideOffset={5}>
                  <div className="opacity-100">New Chat</div>
                  <Tooltip.Arrow className="TooltipArrow" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
        <div>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button onClick={() => {navigate('?games=true')}}>
                  <PencilRuler />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="TooltipContent" sideOffset={5}>
                  <div className="opacity-100">Mini Games</div>
                  <Tooltip.Arrow className="TooltipArrow" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
        <div>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button onClick={() => {}}>
                  <BookOpenText />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="TooltipContent" sideOffset={5}>
                  <div className="opacity-100">Read (Coming Soon)</div>
                  <Tooltip.Arrow className="TooltipArrow" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
        <div>
          <Roadmap rating={user ? user.rating + 700 : 1500} />
        </div>
        <div>
          <POTD
            rating={user ? user.rating + 700 : 1500}
            step={user ? user.step : 0}
            email={user ? user.email : ""}
          />
        </div>
        <div>
          <Focus/>
        </div>
        <div>
          {
            user &&
            <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div className="border-2 px-2 rounded-md cursor-pointer">
                  {user.rating.toFixed(0)}
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="TooltipContent" sideOffset={5}>
                  <div className="opacity-100">Rating</div>
                  <Tooltip.Arrow className="TooltipArrow" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>

          }
        </div>
      </div>
      <div className="text-[#67c2ec] bg-[#319dce]/30 px-4 py-1 rounded-full font-semibold cursor-pointer flex flex-row items-center gap-2">
        <div className="text-white">
          <Bot />
        </div>
        Echo
      </div>
    </div>
  );
};

export default Header;

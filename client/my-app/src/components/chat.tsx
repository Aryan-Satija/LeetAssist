import {useEffect, useRef} from "react";
import {Bar} from 'react-chartjs-2';
import MiniHole from "./MiniHole";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
const Chat = ({chat, isLoading, loading} : {chat: {text: string, sender: string}[], isLoading: Boolean, loading: number}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(()=>{
      if(scrollRef.current){
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
  }, [chat]);
  return (
    <div
      className="w-full p-4 rounded-md overflow-y-auto custom-scrollbar h-full"
      ref={scrollRef}
    >
      {/* Chat */}
      <div className="w-full flex flex-col item-start gap-4 h-full">
        {chat.map((item, index) => {
          if (item.sender === "user") {
            return (
              <div
                key={index}
                className="self-end text-[#67c2ec] bg-[#319dce]/30 border-[1px] border-[#67c2ec] py-2 px-4 rounded-lg max-w-xs text-right shadow"
              >
                {item.text}
              </div>
            );
          }
          if (item.text.startsWith("plot", 0)) {
            let tmp = item.text.slice(4).split("||").slice(1, -1);
            let forecast = tmp.map((pred) => {
              return parseFloat(pred);
            });
            return (
              <div className="self-start text-[#c8eacc] bg-[#c8eacc]/30 border-[1px] border-[#c8eacc] py-2 px-4 rounded-lg w-[320px] md:w-[400px] md:h-[400px] shadow">
                <Bar
                  data={{
                    labels: [
                      "contest-1",
                      "contest-2",
                      "contest-3",
                      "contest-4",
                      "contest-5",
                    ],
                    datasets: [
                      {
                        label: "Predicted Rating",
                        data: forecast,
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      y: {
                        min: Math.min(...forecast) - 20,
                        max: Math.max(...forecast),
                      },
                    },
                  }}
                />
              </div>
            );
          }
          if (item.text.startsWith("problem", 0)) {
            let tmp = JSON.parse(item.text.slice(9));
            let difficulty_styles = `text-[#67ec79] bg-[#67ec79]/30 border-[1px] border-[#67ec79] text-center rounded-md`;
            if (tmp.difficulty === "Medium") {
              difficulty_styles = `text-[#d1e64e] bg-[#d1e64e]/30 border-[1px] border-[#d1e64e] text-center rounded-md`;
            } else if (tmp.difficulty === "Hard") {
              difficulty_styles = `text-[#ef7a7a] bg-[#ef7a7a]/30 border-[1px] border-[#ef7a7a] text-center rounded-md`;
            }
            let premium_styles = `text-[#67ec79] bg-[#67ec79]/30 border-[1px] border-[#67ec79] text-center rounded-md`;
            if (tmp.premium === true) {
              premium_styles = `text-[#d1e64e] bg-[#d1e64e]/30 border-[1px] border-[#d1e64e] text-center rounded-md`;
            }
            let certainty_styles = `text-[#c8eacc] bg-[#c8eacc]/30 border-[1px] border-[#c8eacc] text-center rounded-md`;
            if (tmp.similarity === "Very High") {
              certainty_styles = `text-[#6a00ff] bg-[#6a00ff]/30 border-[1px] border-[#6a00ff] text-center rounded-md`;
            } else if (tmp.similarity === "High") {
              certainty_styles = `text-[#c04beb] bg-[#c04beb]/30 border-[1px] border-[#c04beb] text-center rounded-md`;
            } else if (tmp.similarity === "Medium") {
              certainty_styles = `text-[#F3C6F0] bg-[#F3C6F0]/30 border-[1px] border-[#F3C6F0] text-center rounded-md`;
            }
            const celebration = [
              "🎉🎀🎈🎊",
              "✅✅⤵️⤵️",
              "🧡💛💚💙",
              "✨🎍🎏⭐",
              "✅✅🔥🔥",
              "🌟🌈❤️🩷",
            ];
            return (
              <div className="self-start text-[#c8eacc] bg-[#c8eacc]/30 border-[1px] border-[#c8eacc] py-2 px-4 rounded-lg w-[320px] md:w-[400px] md:h-[400px] shadow cursor-pointer pb-4">
                <div>
                  {tmp.title}{" "}
                  {celebration[Math.floor(Math.random() * celebration.length)]}
                </div>
                <div className="py-2 text-slate-50 text-sm">
                  {tmp.problem_description.slice(0, 100)}....
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <div className={difficulty_styles}>
                    Difficulty: {tmp.difficulty}
                  </div>
                  <div className={premium_styles}>
                    {tmp.is_premium ? "premium" : "free"}
                  </div>
                  <div className={certainty_styles}>
                    Certainty: {tmp.similarity}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="text-center text-blue-400 hover:text-blue-600 duration-200 underline">
                    <a href={`${tmp.problem_URL}`} target="_blank">
                      Click Here To Solve The Problem
                    </a>
                  </div>
                </div>
              </div>
            );
          } else if (item.text.startsWith("tags")) {
            let tags = item.text.slice(6);
            let arr = tags.split(", ");
            return (
              <div className="self-start text-[#c8eacc] bg-[#c8eacc]/30 border-[1px] border-[#c8eacc] py-2 px-4 rounded-lg max-w-xs shadow">
                {arr.map((tag, index) => {
                  return <div key={index}>{tag} 🔥💯</div>;
                })}
              </div>
            );
          } else if (item.text.startsWith("analysis")) {
            let report = item.text.slice(10);
            let reportObj: {
              tags: string[];
              blogs: {
                title: string;
                content: { title: string; content: string; imageUrl: string }[];
                slug: string;
              }[];
              problems: {
                difficulty: string;
                is_premium: boolean;
                problem_URL: string;
                similarity: string;
                title: string;
                problem_description: string;
              }[];
            } = JSON.parse(report);

            return (
              <div className="self-start text-[#c8eacc] bg-[#c8eacc]/30 border-[1px] border-[#c8eacc] py-2 px-4 rounded-lg w-[320px] md:w-[400px] shadow">
                <div className="pb-4">The Problem Can Be Solved By: </div>
                <div className="pb-4">
                  {reportObj.tags.map((tag, index) => {
                    return <div key={index}>{tag} 🔥💯</div>;
                  })}
                </div>
                <div className="pb-4">Learn About These Topics From Here:</div>
                <div>
                  {reportObj.blogs.map((blog, ind) => {
                    let imageUrl = "";
                    for (let cn of blog.content) {
                      if (cn.imageUrl) imageUrl = cn.imageUrl;
                    }
                    return (
                      <div
                        key={ind}
                        className="self-start text-[#c8eacc] bg-[#c8eacc]/30 border-[1px] border-[#c8eacc] py-2 my-2 px-4 rounded-lg max-w-xs shadow"
                      >
                        <div className="pb-2">{blog.title}</div>
                        <div className="text-sm">
                          {blog.content[0].content}...
                        </div>
                        {imageUrl && <img src={imageUrl} />}
                        <div className="text-blue-400 hover:text-blue-600 duration-200 underline cursor-pointer">
                          <a href={`/blogs/${blog.slug}`} target="_blank">
                            Click Here...
                          </a>
                        </div>
                      </div>
                    );
                  })}
                  {reportObj.blogs.length === 0 && (
                    <div className="self-start text-[#f6563a] bg-[#f6563a]/30 border-[1px] border-[#f6563a] py-2 my-2 px-4 rounded-lg max-w-xs shadow">
                      No Blogs Found
                    </div>
                  )}
                </div>
                <div className="pb-4">Find Similar Problems Here:</div>
                <div className="flex flex-col items-center gap-2">
                  {reportObj.problems.slice(0, 2).map((tmp, ind) => {
                    let difficulty_styles = `text-[#67ec79] bg-[#67ec79]/30 border-[1px] border-[#67ec79] text-center rounded-md`;
                    if (tmp.difficulty === "Medium") {
                      difficulty_styles = `text-[#d1e64e] bg-[#d1e64e]/30 border-[1px] border-[#d1e64e] text-center rounded-md`;
                    } else if (tmp.difficulty === "Hard") {
                      difficulty_styles = `text-[#ef7a7a] bg-[#ef7a7a]/30 border-[1px] border-[#ef7a7a] text-center rounded-md`;
                    }
                    let premium_styles = `text-[#67ec79] bg-[#67ec79]/30 border-[1px] border-[#67ec79] text-center rounded-md`;
                    if (tmp.is_premium === true) {
                      premium_styles = `text-[#d1e64e] bg-[#d1e64e]/30 border-[1px] border-[#d1e64e] text-center rounded-md`;
                    }
                    let certainty_styles = `text-[#c8eacc] bg-[#c8eacc]/30 border-[1px] border-[#c8eacc] text-center rounded-md`;
                    if (tmp.similarity === "Very High") {
                      certainty_styles = `text-[#6a00ff] bg-[#6a00ff]/30 border-[1px] border-[#6a00ff] text-center rounded-md`;
                    } else if (tmp.similarity === "High") {
                      certainty_styles = `text-[#c04beb] bg-[#c04beb]/30 border-[1px] border-[#c04beb] text-center rounded-md`;
                    } else if (tmp.similarity === "Medium") {
                      certainty_styles = `text-[#F3C6F0] bg-[#F3C6F0]/30 border-[1px] border-[#F3C6F0] text-center rounded-md`;
                    }
                    const celebration = [
                      "🎉🎀🎈🎊",
                      "✅✅⤵️⤵️",
                      "🧡💛💚💙",
                      "✨🎍🎏⭐",
                      "✅✅🔥🔥",
                      "🌟🌈❤️🩷",
                    ];
                    return (
                      <div className="self-start text-[#c8eacc] bg-[#c8eacc]/30 border-[1px] border-[#c8eacc] py-2 px-4 rounded-lg max-w-xs shadow cursor-pointer pb-4">
                        <div>
                          {tmp.title}{" "}
                          {
                            celebration[
                              Math.floor(Math.random() * celebration.length)
                            ]
                          }
                        </div>
                        <div className="py-2 text-slate-50 text-sm">
                          {tmp.problem_description.slice(0, 100)}....
                        </div>
                        <div className="flex flex-col items-center justify-center py-2">
                          <div className="text-center text-blue-400 hover:text-blue-600 duration-200 underline">
                            <a href={`${tmp.problem_URL}`} target="_blank">
                              Click Here To Solve The Problem
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
          return (
            <div
              key={index}
              className="self-start text-[#67ec79] bg-[#67ec79]/30 border-[1px] border-[#67ec79] py-2 px-4 rounded-lg max-w-xs shadow"
            >
              {item.text}
            </div>
          );
        })}
        {isLoading && (
          <div className="self-start bg-[#062109]/30 border-[1px] border-[#c8eacc] py-2 px-4 rounded-lg max-w-xs shadow text-white w-[200px] h-[200px]">
            Loading... ({loading}%)
            <div>
              <MiniHole />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;

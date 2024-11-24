import { useEffect } from "react";
import { ScrollArea } from "../components/ui/scroll-area";
import Chatters from "./Chatters";
import { IntegratedPopover } from "./integratedComponents/IntegratedPopover";
import { MessageStore, useSwitcherStore } from "./MessageStore";
import { AntagBubble, ProtagBubble } from "./TextBubbles";
import TextInput from "./Textinput";

export default function ConversationPage() {
  const text = MessageStore((state) => state.MessageData);
  const CurrentGroupName = useSwitcherStore((state) => state.name);
  const CurrentGroupCode = useSwitcherStore((state) => state.code);

  useEffect(() => {
    console.log(CurrentGroupCode);
    console.log(CurrentGroupName);
  }, [CurrentGroupCode]);
  return (
    <>
      <div className=" h-screen flex">
        <Chatters></Chatters>
        <div className=" w-full h-full flex flex-col justify-between  bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:30px_30px] z-0">
          <div>
            <div className="font-semibold flex  w-full items-start justify-end">
              <IntegratedPopover></IntegratedPopover>
            </div>
            <div className=" flex items-center justify-center space-x-3">
              <div className=" h-[6rem] aspect-square rounded-full bg-slate-900"></div>
              <div>
                <h1 className="text-4xl font-bold font-Geist">
                  {CurrentGroupName}
                </h1>
                <h1 className="text-xl font-mono">{CurrentGroupCode}</h1>
              </div>
            </div>
          </div>
          <div className=" h-auto flex justify-center">
            <ScrollArea className="w-full px-[20%] flex h-[42rem] flex-col space-y-1">
              {text.map((item, index) => {
                return (
                  <div key={index}>
                    {" "}
                    {item.side === "right" && (
                      <div className="w-full flex justify-end">
                        <ProtagBubble textContent={item.value}></ProtagBubble>
                      </div>
                    )}
                    {item.side === "left" && (
                      <div className="w-full flex justify-start">
                        <AntagBubble textContent={item.value}></AntagBubble>
                      </div>
                    )}
                  </div>
                );
              })}
            </ScrollArea>
          </div>
          <div className="m-10">
            <TextInput></TextInput>
          </div>
        </div>
      </div>
    </>
  );
}

import { ScrollArea } from "../components/ui/scroll-area";
import Chatters from "./Chatters";
import { IntegratedPopover } from "./integratedComponents/IntegratedPopover";
import { AntagBubble, ProtagBubble } from "./TextBubbles";
import TextInput from "./Textinput";

export default function ConversationPage() {
  return (
    <>
      <div className=" h-screen flex">
        <Chatters></Chatters>
        <div className=" w-full h-full flex flex-col justify-between  bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:100px_100px] z-0">
          <div>
            <div className="font-semibold flex  w-full border items-start justify-end">
              <IntegratedPopover></IntegratedPopover>
            </div>
            <div className=" flex items-center justify-center space-x-3">
              <div className=" h-[6rem] aspect-square rounded-full bg-slate-900"></div>
              <div>
                <h1 className="text-4xl font-bold font-Geist">
                  Profile user-Name
                </h1>
                <h1 className="text-xl font-mono">
                  Some tagline, i havent decided yet
                </h1>
              </div>
            </div>
          </div>
          <div className=" h-auto flex justify-center">
            <ScrollArea className="w-[60%] p-8 flex h-[42rem]  flex-col  space-y-1">
              {Array.from({ length: 10 }).map(() => {
                return (
                  <>
                    <div className="w-full flex justify-end">
                      <ProtagBubble></ProtagBubble>
                    </div>
                    <div className="w-full flex justify-start">
                      <AntagBubble></AntagBubble>
                    </div>
                  </>
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

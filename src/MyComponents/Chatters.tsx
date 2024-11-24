import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircleMoreIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGroupStore, useSwitcherStore } from "./MessageStore";
import { useEffect } from "react";

export default function Chatters() {
  const Icons = useGroupStore((state) => state.groups);
  const SetCurrentRoomInfo = useSwitcherStore((state) => state.SetCurrentRoom);

  useEffect(() => {
    console.log(Icons);
  }, [Icons]);
  return (
    <>
      <div className="w-max">
        <div className="flex  justify-start w-full  h-[99.6vh] ">
          <div className=" relative flex flex-col  p-0 font-semibold w-full">
            <div className="relative shadow-2xl shadow-black outline-8 ">
              <MessageCircleMoreIcon
                className={
                  "w-full h-full  border-2 border-dashed p-2 shadow-3xl shadow-black border-black rounded-lg "
                }
                size={30}
                strokeWidth={1}
              ></MessageCircleMoreIcon>
            </div>

            <ScrollArea className="m-0 absolute inset-0 z-0 ms-2 h-full w-full  ">
              {Icons.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex  my-2 space-x-3"
                    onClick={() => {
                      console.log(item.group_name);
                      SetCurrentRoomInfo(item.group_name, item.description);
                    }}
                  >
                    <Profimage></Profimage>
                  </div>
                );
              })}
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}

function Profimage() {
  const nav = useNavigate();
  return (
    <Button
      onMouseUp={() => {
        nav("/conversations");
      }}
      className="aspect-square rounded-full h-[2rem] w-[2rem]"
    ></Button>
  );
}

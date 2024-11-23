import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircleMoreIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Chatters() {
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
              {Array.from({ length: 30 }).map(() => {
                return (
                  <>
                    <div className="flex  my-2 space-x-3">
                      <Profimage></Profimage>
                    </div>
                  </>
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
  return (
    <Link to="/conversations">
      <Button className="aspect-square rounded-full h-[2rem] w-[2rem]"></Button>
    </Link>
  );
}

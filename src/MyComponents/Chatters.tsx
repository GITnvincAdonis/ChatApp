import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Chatters() {
  return (
    <>
      <ScrollArea className="m-0  ms-5 h-full w-full  ">
        {Array.from({ length: 30 }).map(() => {
          return (
            <>
              <div className="flex  my-2 space-x-3 w-full">
                <Profimage></Profimage>
                <div>
                  {" "}
                  <div className="font-Geist">Lorem, ipsum dolor sit </div>
                  <div className="leading-3 text-xs font-light font-mono w-[20rem] max-h-[1rem] ">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Eveniet{" "}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </ScrollArea>
    </>
  );
}

function Profimage() {
  return (
    <Button className="aspect-square rounded-full h-[3rem] w-[3rem]"></Button>
  );
}

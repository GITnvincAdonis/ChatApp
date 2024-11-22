import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import TextInput from "@/MyComponents/Textinput";
import { IntegratedPopover } from "./IntegratedPopover";
import Chatters from "@/MyComponents/Chatters";
import { Input } from "../ui/input";

export function Resizable() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-screen rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel className="" defaultSize={25} minSize={15}>
        <div className="flex justify-start w-full  h-[99.6vh] ">
          <div className="flex flex-col  p-0 font-semibold w-full">
            <div className="px-4">
              <Input placeholder="filter Chats" className=" mt-3 outline outline-1 w-full"></Input>
            </div>
            <Chatters></Chatters>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75} minSize={60}>
        <div className="flex h-full  flex-col ">
          <div className="font-semibold h-[100%] flex items-start justify-end">
            <IntegratedPopover></IntegratedPopover>
          </div>
          <div className="align-self-end border w-full p-3 ">
            <TextInput></TextInput>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

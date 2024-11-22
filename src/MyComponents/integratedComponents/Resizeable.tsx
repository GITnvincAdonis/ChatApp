import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Chatters from "@/MyComponents/Chatters";
import IntroToChat from "@/MyComponents/introToChat";

export function Resizable() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-screen rounded-lg md:min-w-[450px]"
    >
      <Chatters></Chatters>

      <ResizablePanel defaultSize={75} minSize={60}>
        <IntroToChat></IntroToChat>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

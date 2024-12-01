import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Chatters from "@/MyComponents/Chatters";
import IntroToChat from "@/MyComponents/introToChat";
import { motion } from "framer-motion";

export function Resizable() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: 100 }}

    >
      <ResizablePanelGroup
        direction="horizontal"
        className="h-screen rounded-lg md:min-w-[450px]"
      >
        <Chatters></Chatters>

        <ResizablePanel defaultSize={75} minSize={60}>
          <IntroToChat></IntroToChat>
        </ResizablePanel>
      </ResizablePanelGroup>
    </motion.div>
  );
}

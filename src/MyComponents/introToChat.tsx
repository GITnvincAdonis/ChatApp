import { PlusIcon, UsersRound } from "lucide-react";
import { IntegratedModal } from "@/MyComponents/integratedComponents/IntegratedModal";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IntegratedPopover } from "@/MyComponents/integratedComponents/IntegratedPopover";
import { PlayCarousel } from "@/MyComponents/integratedComponents/PlayingCarousel";
import { io } from "socket.io-client";
import {
  AcModal2,
  AcModal3,
} from "../P_Clean Code Abstractions/ModelActivatedContent";

const socket = io("http://localhost:2000");

socket.on("connect", () => {
  console.log(`${socket.id} connected`);
});

export default function IntroToChat() {
  const ModalOptions = [
    // {
    //   header: "One-on-One",
    //   tag: "Chat privately with an individual",
    //   modalContent: <AcModal1></AcModal1>,
    // },
    {
      header: "Connect to Chat Room",
      tag: "Group conversation between multiple people",
      modalContent: <AcModal2></AcModal2>,
    },
    {
      header: "ADD A NEW ROOM",
      tag: "",
      modalContent: <AcModal3></AcModal3>,
    },
  ];
  return (
    <>
      {" "}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative h-full w-full"
      >
        {/* Background Div */}
        <Background></Background>
        {/* Content */}
        <div className="relative flex h-full flex-col z-10">
          <div className="font-semibold flex items-start justify-end">
            <IntegratedPopover></IntegratedPopover>
          </div>
          <div className="h-full flex flex-col items-center justify-center space-y-2">
            {CardOptions.map((item, index) => {
              return (
                <IntegratedModal
                  key={index}
                  header={ModalOptions[index].header}
                  tagline={ModalOptions[index].tag}
                  modalContent={ModalOptions[index].modalContent}
                  trigger={
                    <motion.div whileHover={{ scale: 1.04 }} key={index}>
                      <Card className="flex bg-black border-primary">
                        <CardHeader>
                          <h1 className="text-end text-white font-bold font-Geist text-sm w-[10rem]">
                            {item.text}
                          </h1>
                          <h2 className="text-end font-mono  text-white text-xs leading-4 w-[10rem]">
                            {item.tagline}
                          </h2>
                        </CardHeader>
                        <CardContent className="me-4 p-0 my-4 w-auto flex items-center justify-center">
                          {item.icon}
                        </CardContent>
                      </Card>
                    </motion.div>
                  }
                ></IntegratedModal>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
}
function Background() {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute inset-0  bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:26px_24px] z-0"
        >
          <div className="w-full h-full flex flex-col items-center space-y-[30rem] justify-center">
            <PlayCarousel direction="backward"></PlayCarousel>
            <PlayCarousel direction="forward"></PlayCarousel>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
const CardOptions = [
  // {
  //   text: "START A PRIVATE CONVERSATION",
  //   tagline: "Start a chat with a co-worker or friend",
  //   icon: <SendIcon color="white" size={40}></SendIcon>,
  // },
  {
    text: "JOIN A PUBLIC CHAT ROOM",
    tagline: "have a group with individuals over a shared connection",

    icon: <UsersRound color="white" size={40}></UsersRound>,
  },
  {
    text: "CREATE A NEW ROOM",
    tagline: "Start your own group chat where others can join",

    icon: <PlusIcon color="white" size={40}></PlusIcon>,
  },
];

import { SendIcon, UsersRound } from "lucide-react";
import { IntegratedModal } from "@/MyComponents/integratedComponents/IntegratedModal";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IntegratedPopover } from "@/MyComponents/integratedComponents/IntegratedPopover";
import { PlayCarousel } from "@/MyComponents/integratedComponents/PlayingCarousel";
import { SearchBox } from "./integratedComponents/SearchBox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { io } from "socket.io-client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGroupStore } from "./MessageStore";

const socket = io("http://localhost:2000");

socket.on("connect", () => {
  console.log(`${socket.id} connected`);
});

export default function IntroToChat() {
  const [roomName, setRoomName] = useState("");
  const [passcode, setPassCode] = useState("");

  const UpdateChatList = useGroupStore((state) => state.UpdateGroups);

  const ModalOptions = [
    {
      header: "One-on-One",
      tag: "Chat privately with an individual",
      modalContent: <SearchBox></SearchBox>,
    },
    {
      header: "Connect to Chat Room",
      tag: "Group conversation between multiple people",
      modalContent: (
        <>
          <div className="py-4">
            <div className="flex flex-col items-center gap-2">
              <Label htmlFor="name" className="text-start w-full">
                Code
              </Label>
              <Input
                id="name"
                placeholder="Room Code "
                className=""
                onChange={(e) => {
                  setRoomName(e.target.value || "");
                }}
              />
            </div>
            <div className="flex flex-col items-center py-5 gap-3 ">
              <Label htmlFor="username" className="text-start w-full">
                Passcode
              </Label>
              <Input
                onChange={(e) => {
                  setPassCode(e.target.value || "");
                }}
                id="username"
                placeholder="Enter passcode"
              />
            </div>
            <Button
              disabled={!(roomName != "" && passcode != "")}
              className="w-full"
              onClick={() => {
                UpdateChatList(roomName, passcode);
              }}
            >
              Join Room
            </Button>
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      {" "}
      <div className="relative h-full w-full">
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
                      <Card className="flex bg-black">
                        <CardHeader>
                          <h1 className="text-end text-secondary font-bold font-Geist text-sm w-[10rem]">
                            {item.text}
                          </h1>
                          <h2 className="text-end font-mono text-secondary text-xs leading-4 w-[10rem]">
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
      </div>
    </>
  );
}
function Background() {
  return (
    <>
      <div className="absolute inset-0  bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:26px_24px] z-0">
        <div className="w-full h-full flex flex-col items-center space-y-[30rem] justify-center">
          <PlayCarousel direction="backward"></PlayCarousel>
          <PlayCarousel direction="forward"></PlayCarousel>
        </div>
      </div>
    </>
  );
}
const CardOptions = [
  {
    text: "START A PRVIATE CONVERSATION",
    tagline: "Start a chat with a co-worker or friend",
    icon: <SendIcon color="white" size={40}></SendIcon>,
  },
  {
    text: "JOIN A PUBLIC CHAT ROOM",
    tagline: "have a group with individuals over a shared connection",

    icon: <UsersRound color="white" size={40}></UsersRound>,
  },
];

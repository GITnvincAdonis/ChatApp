import { useEffect, useState } from "react";
import { ScrollArea } from "../components/ui/scroll-area";
import Chatters from "./Chatters";
import { IntegratedPopover } from "./integratedComponents/IntegratedPopover";
import { MessageStore, useSwitcherStore } from "../STORES/MessageStore";
import { AntagBubble, ProtagBubble } from "./TextBubbles";
import TextInput from "./Textinput";
import { useQuery } from "@tanstack/react-query";
import { GetGroupMessages } from "@/API endpoints/API";
import { UserIDStore } from "@/STORES/userAuthStore";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Message {
  message_id: string;
  message_string: string;
  message_senddate: string;
  group_id: string;
  user_id: string;
}
export default function ConversationPage() {
  const text = MessageStore((state) => state.MessageData);
  const CurrentGroupName = useSwitcherStore((state) => state.name);
  const CurrentGroupCode = useSwitcherStore((state) => state.code);
  const UserID = UserIDStore((state) => state.id);
  const [OldMessages, SetOldMessages] = useState<Message[]>([]);
  const [_messages, setMessages] = useState<Message[]>([]);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["FetchedMessages", CurrentGroupCode],
    queryFn: async () => {
      const messages = await GetGroupMessages(CurrentGroupCode);
      return messages; // Ensure this returns the correct data type
    },
    enabled: CurrentGroupCode != "",
    staleTime: Infinity,
  });
  if (isError) console.error(error);
  if (isLoading) console.log("loading previous mesages");
  useEffect(() => {
    if (data) {
      SetOldMessages(data);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const uniqueMessages = new Map(); // Prevent duplicates
      [...data, ...text].forEach((msg) => {
        uniqueMessages.set(msg.message_id, msg);
      });
      setMessages(Array.from(uniqueMessages.values()));
    }
  }, [data]);

  const navigate = useNavigate();
  if (!CurrentGroupCode) navigate("/home");
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className=" h-screen flex"
      >
        <Chatters></Chatters>
        <div className="relative h-full w-full ">
          <Background></Background>
          <div className="relative flex flex-col z-10">
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
              {OldMessages.map((item, index) => {
                return (
                  <div key={index}>
                    {" "}
                    {item.user_id === UserID && (
                      <div className="w-full flex justify-end">
                        <ProtagBubble
                          textContent={item.message_string}
                        ></ProtagBubble>
                      </div>
                    )}
                    {item.user_id !== UserID && (
                      <div className="w-full flex justify-start">
                        <AntagBubble
                          textContent={item.message_string}
                        ></AntagBubble>
                      </div>
                    )}
                  </div>
                );
              })}
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
          <div className="m-10 relative">
            <TextInput></TextInput>
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
        ></motion.div>
      </AnimatePresence>
    </>
  );
}

import { ScrollArea } from "../components/ui/scroll-area";
import Chatters from "./Chatters";
import { IntegratedPopover } from "./integratedComponents/IntegratedPopover";
import { MessageStore, useSwitcherStore } from "../STORES/MessageStore";
import { AntagBubble, ProtagBubble } from "./TextBubbles";
import TextInput from "./Textinput";
import { UserIDStore } from "@/STORES/userAuthStore";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  useGetGroupMembers,
  useGetGroupMessages,
} from "@/P_Clean Code Abstractions/tanStackQueries";
import { useEffect, useRef } from "react";
import Loader from "./Loader";

export default function ConversationPage() {
  const text = MessageStore((state) => state.MessageData);

  const CurrentGroupName = useSwitcherStore((state) => state.name);
  const CurrentGroupCode = useSwitcherStore((state) => state.code);
  const UserID = UserIDStore((state) => state.id);
  const { OldMessages, isLoading: loadingMessages } = useGetGroupMessages();
  const { fetchMembers, isLoading: loadingMembers } = useGetGroupMembers();
  const navigate = useNavigate();
  if (!CurrentGroupCode) navigate("/home");

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableElement = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollableElement) {
        console.log("found scrollable element");
        console.log(scrollableElement);
        scrollableElement.scrollTop += scrollableElement.scrollHeight;
      }
    }
  }, [text, OldMessages]);

  return (
    <>
      <AnimatePresence>
        {(loadingMembers || loadingMessages) && (
          <>
            <Loader></Loader>
          </>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex  h-screen w-[100vw]"
      >
        <div>
          <Chatters></Chatters>
        </div>
        <div className="bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:25px_25px] z-0 w-full  ">
          <div className="flex flex-col z-10">
            <div className="font-semibold flex lg:px-4 items-start justify-end">
              <IntegratedPopover></IntegratedPopover>
            </div>
            <div className=" flex items-center justify-center space-x-3 px-2">
              <div className=" lg:h-[6rem] h-[3.5rem] aspect-square rounded-full bg-slate-900"></div>
              <div>
                <h1 className="text-4xl font-bold font-Geist">
                  {CurrentGroupName}
                </h1>
                <h1 className="lg:text-xl font-mono">
                  {fetchMembers.map((item, index) => {
                    return (
                      <>
                        {item.username}
                        {index == fetchMembers.length - 1 ? "" : ", "}
                      </>
                    );
                  })}
                </h1>
              </div>
            </div>
          </div>
          <div className=" h-auto flex justify-center">
            <ScrollArea
              ref={scrollAreaRef}
              type="always"
              className="w-full lg:px-[20%] flex lg:h-[45em] h-[75vh] flex-col space-y-1"
            >
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
          <div className=" ">
            <TextInput></TextInput>
          </div>
        </div>
      </motion.div>
    </>
  );
}

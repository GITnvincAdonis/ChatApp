import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { MessageStore, useSwitcherStore } from "../STORES/MessageStore";

import { motion } from "framer-motion";
import { UserIDStore } from "@/STORES/userAuthStore";

const socket = io("http://localhost:2000");

socket.on("connect", () => {
  console.log(`${socket.id} connected`);
});

socket.on("send-to-client", ({ text }) => {
  console.log(text);
});
export default function TextInput() {
  const [textInput, Setinput] = useState("");
  const AddToMessage = MessageStore((state) => state.UpdateMessage);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleServerMessage = (string: any) => {
      console.log(`${string.text} : from server`);
      AddToMessage(string.text, "left", `${Date()}`);
    };

    socket.on("send-to-client", handleServerMessage);
    return () => {
      socket.off("send-to-client", handleServerMessage);
    };
  }, []);

  const CurrentRoomName = useSwitcherStore((state) => state.name);
  const CurrentRoomID = useSwitcherStore((state) => state.code);
  const UserID = UserIDStore((state) => state.id);

  useEffect(() => {
    console.log(CurrentRoomName);
    socket.emit("join-group", { group_name: CurrentRoomName });
    return () => {
      socket.emit("leave-group", { group_name: CurrentRoomName });
    };
  }, [CurrentRoomName]);

  return (
    <>
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.31,
          delay: 0.31,
          type: "tween",
          ease: "circOut",
        }}
        className="flex justify-center lg:px-20 space-x-1 "
      >
        <Input
          className=" lg:w-[30rem] w-[10rem] outline outline-1 text-sm"
          placeholder="Send message to ..."
          onChange={(e) => {
            Setinput(e.target.value || "");
          }}
        ></Input>
        <Button
          disabled={textInput == "" ? true : false}
          onMouseDown={() => {
            SendMessageToServer(
              textInput,
              CurrentRoomName,
              CurrentRoomID,
              UserID,
              AddToMessage
            );
          }}
          onMouseUp={() => {}}
        >
          Send Message
        </Button>
      </motion.div>
    </>
  );
}

interface textData {
  roomName: string;
  text: string;
  grp_ID: string;
  user_ID: string;
}

function SendMessageToServer(
  textMessage: string,
  Room: string,
  CurrentRoomID: string,
  user_id: string,
  AddMessageFn: CallableFunction
) {
  const text: textData = {
    roomName: Room,
    text: textMessage,
    grp_ID: CurrentRoomID,
    user_ID: user_id,
  };
  socket.emit(
    "send-to-server",
    text,
    ({ message, data }: { message: string; data: any }) => {
      console.log("Sent message to server callback");
      AddMessageFn(textMessage, "right", data.message_senddate);
      console.log(data.message_senddate);
      console.log(message);
    }
  );
}

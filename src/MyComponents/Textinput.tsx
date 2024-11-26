import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { MessageStore, useSwitcherStore } from "../STORES/MessageStore";

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
    const handleServerMessage = (string: any) => {
      console.log(`${string.text} : from server`);
      AddToMessage(string.text, "left");
    };

    socket.on("send-to-client", handleServerMessage);
    return () => {
      socket.off("send-to-client", handleServerMessage);
    };
  }, []);

  const CurrentRoomName = useSwitcherStore((state) => state.name);

  useEffect(() => {
    console.log(CurrentRoomName);
    socket.emit("join-group", { group_name: CurrentRoomName });
    return () => {
      socket.emit("leave-group", { group_name: CurrentRoomName });
    };
  }, [CurrentRoomName]);
  return (
    <>
      <div className="flex justify-center px-20 space-x-1">
        <Input
          className=" w-[30rem] outline outline-1 text-sm"
          placeholder="Send message to ..."
          onChange={(e) => {
            Setinput(e.target.value || "");
          }}
        ></Input>
        <Button
          disabled={textInput == "" ? true : false}
          onClick={() => {
            SendMessageToServer(textInput, CurrentRoomName);
            AddToMessage(textInput, "right");
          }}
        >
          Send Message
        </Button>
      </div>
    </>
  );
}

interface textData {
  roomName: string;
  text: string;
}

function SendMessageToServer(textMessage: string, Room: string) {
  const text: textData = {
    roomName: Room,
    text: textMessage,
  };
  socket.emit("send-to-server", text);
}

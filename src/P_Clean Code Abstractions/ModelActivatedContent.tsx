import { Label } from "@/components/ui/label";
import { SearchBox } from "../MyComponents/integratedComponents/SearchBox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useGroupStore } from "@/STORES/MessageStore";
import { useAddToGroupMembersQ, useAddToUserQ } from "./tanStackQueries";

export function AcModal1() {
  return <SearchBox></SearchBox>;
}
export function AcModal2() {
  const [roomName, setRoomName] = useState("");
  const [passcode, setPassCode] = useState("");
  const UpdateChatList = useGroupStore((state) => state.UpdateGroups);
  return (
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
  );
}
export function AcModal3() {
  const UpdateChatList = useGroupStore((state) => state.UpdateGroups);
  const {
    mutateAsync: AddGrp,
    setNewPassCode,
    setNewRoomName,
    SetAddGroup,
    newpasscode,
    newroomName,
    clickedAddGroup,
  } = useAddToUserQ();
  const { mutateAsync: AddGrpMem } = useAddToGroupMembersQ();
  return (
    <div className="py-4">
      <div className="flex flex-col items-center gap-2">
        <Label htmlFor="name" className="text-start w-full">
          Room Name
        </Label>
        <Input
          id="name"
          placeholder="Room Code "
          className=""
          onChange={(e) => {
            setNewRoomName(e.target.value || "");
          }}
        />
      </div>
      <div className="flex flex-col items-center py-5 gap-3 ">
        <Label htmlFor="username" className="text-start w-full">
          Passcode
        </Label>
        <Input
          onChange={(e) => {
            setNewPassCode(e.target.value || "");
          }}
          id="username"
          placeholder="Enter passcode"
        />
      </div>
      <Button
        disabled={!(newroomName != "" && newpasscode != "")}
        className="w-full"
        onClick={async () => {
          console.log(newroomName);
          if (clickedAddGroup) {
            await AddGrp();
            await AddGrpMem();
          }
          SetAddGroup(true);
          UpdateChatList(newroomName, newpasscode);
        }}
      >
        Create Room
      </Button>
    </div>
  );
}

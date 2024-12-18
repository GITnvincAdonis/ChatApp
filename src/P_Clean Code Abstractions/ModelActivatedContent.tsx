import { Label } from "@/components/ui/label";
import { SearchBox } from "../MyComponents/integratedComponents/SearchBox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  useAddToGroupMembersQ,
  useAddToUserQ,
  useGetGroupIDQ,
} from "./tanStackQueries";

export function AcModal1() {
  return <SearchBox></SearchBox>;
}
export function AcModal2() {
  const [roomName, setRoomName] = useState("");
  const [passcode, setPassCode] = useState("");
  const [id, setID] = useState("");
  const { toggleFetch } = useGetGroupIDQ(roomName, passcode, id);
  const { toggleFetch: AddGrpMem, setName } = useAddToGroupMembersQ();

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
      <div className="flex flex-col items-center pt-5 gap-3 ">
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
      <div className="flex flex-col items-center py-5 gap-3 ">
        <Label htmlFor="username" className="text-start w-full">
          Group ID
        </Label>
        <Input
          onChange={(e) => {
            setID(e.target.value || "");
          }}
          id="username"
          placeholder="Enter Group ID"
        />
      </div>
      <Button
        disabled={!(roomName != "" && passcode != "" && id != "")}
        className="w-full bg-black text-white"
        onClick={() => {}}
        onMouseDown={() => {
          toggleFetch(true);
          AddGrpMem(true);
          setName(roomName);
        }}
        onMouseUp={() => {
          toggleFetch(false);
          AddGrpMem(false);
        }}
      >
        Join Room
      </Button>
    </div>
  );
}
export function AcModal3() {
  const {
    setNewPassCode,
    setNewRoomName,
    SetAddGroup,
    newpasscode,
    newroomName,
  } = useAddToUserQ();
  const { toggleFetch, setName } = useAddToGroupMembersQ();
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
        className="w-full bg-black text-white"
        onMouseDown={() => {
          console.log(newroomName);
          SetAddGroup(true);
          setName(newroomName);
          toggleFetch(true);
        }}
        onMouseUp={() => {
          SetAddGroup(false);
          toggleFetch(false);
        }}
      >
        Create Room
      </Button>
    </div>
  );
}

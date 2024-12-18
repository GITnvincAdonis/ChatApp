import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircleMoreIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  MessageStore,
  useGroupStore,
  useSwitcherStore,
} from "../STORES/MessageStore";

import { useGetUserGroups } from "@/P_Clean Code Abstractions/tanStackQueries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustTooltip } from "./integratedComponents/Tooltip";

export default function Chatters() {
  const Icons = useGroupStore((state) => state.groups);
  const { returnedGroupData, SetCurrentRoomInfo } = useGetUserGroups();
  const navigate = useNavigate();
  return (
    <>
      <div className="w-max">
        <div className="flex  justify-start w-full  h-[99.6vh] ">
          <div className=" relative flex flex-col  p-0 font-semibold w-full">
            <div className="relative shadow-2xl shadow-black outline-8 ">
              <CustTooltip
                content={
                  <MessageCircleMoreIcon
                    onClick={() => {
                      navigate("/home");
                    }}
                    className={
                      "w-12 h-12  border-2 border-dashed p-2 shadow-3xl shadow-black border-black rounded-lg "
                    }
                    size={30}
                    strokeWidth={1}
                  ></MessageCircleMoreIcon>
                }
                hoverContent={"Use to Navigate back to homepage..."}
              ></CustTooltip>
            </div>

            <ScrollArea className="m-0 absolute inset-0 z-0 ms-2 h-full w-full  ">
              {returnedGroupData.map((item, index) => {
                const firstLetter = item.group_name.split("")[0];
                return (
                  <div
                    key={index}
                    className="flex  my-2 space-x-3"
                    onClick={() => {
                      console.log(item.group_name);
                      console.log(item.group_id);
                      SetCurrentRoomInfo(item.group_name, item.group_id);
                    }}
                  >
                    <Profimage GroupLetter={firstLetter}></Profimage>
                  </div>
                );
              })}
              {Icons.map((item, index) => {
                const firstLetter = item.group_name.split("")[0];
                return (
                  <div
                    key={index}
                    className="flex  my-2 space-x-3"
                    onClick={() => {
                      console.log(item.group_name);
                      SetCurrentRoomInfo(item.group_name, item.groupID);
                    }}
                  >
                    <Profimage GroupLetter={firstLetter}></Profimage>
                  </div>
                );
              })}
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}

function Profimage(props: { GroupLetter: string }) {
  const { GroupLetter } = props;
  const CurrentRoomID = useSwitcherStore((state) => state.ID);
  const querrclient = useQueryClient();
  const ClearTexts = MessageStore((state) => state.ClearMessage);
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      console.log("refetched messages");
    },
    onSuccess: () => {
      querrclient.invalidateQueries({
        queryKey: ["FetchedMessages", CurrentRoomID],
        exact: true,
      });
    },
  });
  const nav = useNavigate();
  return (
    <Button
      onMouseUp={() => {
        ClearTexts();
        mutateAsync();
        nav("/conversations");
      }}
      className="aspect-square rounded-full h-[2rem] w-[2rem]"
    >
      {GroupLetter}
    </Button>
  );
}

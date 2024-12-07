import {
  AddToGroupMembersEP,
  AddToGroupsEP,
  GetAllGroups,
  GetGroup,
  GetGroupMembers,
  GetGroupMessages,
  LoginEndpoint,

  SignUpEndpoint,
  TokenUserInfo,
} from "@/API endpoints/API";
import {
  useFetchedGroupsStore,
  useGroupStore,
  useSwitcherStore,
} from "@/STORES/MessageStore";
import { UserIDStore } from "@/STORES/userAuthStore";
import {  useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Member,GroupData,Message } from "./CustomTypes";
import { toast } from "sonner";



function QUERYConstructor(Fn: CallableFunction, Params: string[], activationParam: boolean[],QKey:string)
:{ data: any[]| any| undefined, isError: boolean, error:Error|null,isLoading: boolean}{
  const checks = activationParam.reduce((acc, current) => acc && current, true)
  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => {
      return await Fn(...Params)},
    queryKey: [`${QKey}`,...Params],
    enabled: checks,
    staleTime: Infinity,
    retry: false,
  });

  //if(isError) console.log( `error at callbackfn ${Fn}: ${error}`);
  //if (isLoading) console.log( `loading ${Fn.name}`);
  return {data, isError, error, isLoading}
}






export function useSignUpAddUserQ() {
  
  const [signInData, SetSignInData] = useState<{
    name: string;
    passcode: string;
  }>({ name: "", passcode: "" });

  const [clicked, SetClicked] = useState(false);
  const {data} = QUERYConstructor(SignUpEndpoint,[signInData.name, signInData.passcode],[clicked],"user_id")
 
  useEffect(() => {
    //console.log(data != undefined);
    if (data && clicked) {
      //console.log("clicking data");
      localStorage.setItem("jwt", data.token);
      window.location.reload();
    }
  }, [data]);

  return { SetSignInData, SetClicked };
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
export function useLoginGetUserQ() {
  
  const [LoginInData, SetlogInData] = useState<{
    name: string;
    passcode: string;
  }>({ name: "", passcode: "" });

  const [clicked, SetClicked] = useState(false);
  const {data} = QUERYConstructor(LoginEndpoint,[LoginInData.name, LoginInData.passcode],[clicked],"user_id");
  useEffect(() => {
    //console.log(`login ${data}`);
    if (data && clicked) {
     // console.log("clicking data");
      localStorage.setItem("jwt", data.token);
      window.location.reload();
    }
  }, [data]);
  return { SetlogInData, SetClicked };
}
////////////////////////////////////////////////////////////////////////////////////////////////
export function useTokenRetrieve() {
  const token = localStorage.getItem("jwt");

  const {data} = QUERYConstructor(TokenUserInfo,[],[token != null], "user_information")
  
  const SetStoreUserID = UserIDStore((state) => state.ChangeID);
  const SetStoreUserName = UserIDStore((state) => state.ChangeName);

  useEffect(() => {
   // console.log(`login ${data}`);

    if (data && data.authData) {
      localStorage.setItem("userAuthData", JSON.stringify(data.authData));
      const userData = JSON.parse(localStorage.getItem("userAuthData") || "{}");
      const userId = userData?.user?.user_id;
      const username = userData?.user?.username;

      SetStoreUserID(userId);
      SetStoreUserName(username);
      //console.log("User ID:", userId);
      //console.log("Username:", username);
    } else {
      console.log("authData is missing from data");
    }
    //
  }, [data]);
}
/////////////////////////////////////////////////////////////////////////////
export function useAddToUserQ() {
  const UpdateCurrentNewGroupID = UserIDStore((state) => state.setNewGroupID);
  const Groups = useFetchedGroupsStore(state=>state.group )
  const [newroomName, setNewRoomName] = useState("");
  const [newpasscode, setNewPassCode] = useState("");
  const [clickedAddGroup, SetAddGroup] = useState(false);

  const {data:ReturnedGroupPost,error}= QUERYConstructor(AddToGroupsEP,[newroomName, newpasscode],[clickedAddGroup ,newroomName != "" ,newpasscode != null],"newGroup")
   
  useEffect(() => {
    if (ReturnedGroupPost != "" && ReturnedGroupPost != undefined){
      const alreadyInGroup = Groups.some(g =>g.group_name === newroomName)
      if(!alreadyInGroup){
        //console.log(Groups);
        
        UpdateCurrentNewGroupID(ReturnedGroupPost)
        toast("Successfully created group.");
      } else toast.error("Group already exists.");
      }
      
    if(error)console.log(error);
   
  }, [ReturnedGroupPost]);

  return {
    newroomName,
    newpasscode,
    clickedAddGroup,
    setNewRoomName,
    setNewPassCode,
    SetAddGroup,
  };
}
//////////////////////////////////////////////////////////////////////////////////////////////////
export function useAddToGroupMembersQ() {
  const UpdateChatList = useGroupStore((state) => state.UpdateGroups);
  const CurrentUserID = UserIDStore((state) => state.id);
  const CurrentgroupID = UserIDStore((state) => state.newGroupID);
  const [canFetchGRPMEM, toggleFetch] = useState(false);
  const [GroupName, setName] = useState<string>("");

  const {data,isError} = QUERYConstructor(AddToGroupMembersEP,[CurrentgroupID, CurrentUserID],[
    canFetchGRPMEM ,
    GroupName != "" ,
    CurrentgroupID != undefined ,
    CurrentgroupID != "" ,
    CurrentUserID != ""],'newGroupMember')

  useEffect(() => {
    console.log(`creating group member ${data}`);
  }, [data]);

  useEffect(() => {
    //console.log(CurrentgroupID);
    if (data) {
      console.log(data.data.group_id);
      if(!isError)UpdateChatList(GroupName, data.data.group_id);
    }
   
  }, [data]);
  return { toggleFetch, setName };
}

////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////
export function useGetGroupIDQ(roomName: string, passcode: string) {
  const UpdateChatList = useGroupStore((state) => state.UpdateGroups);
  const [triggerGroupIdFetch, toggleFetch] = useState(false);
  const SetGroupID = UserIDStore((state) => state.setNewGroupID);
  const FetchedGroups = useFetchedGroupsStore((state) => state.group);

  const {data,isError} = QUERYConstructor(GetGroup, [roomName, passcode],[triggerGroupIdFetch],'join-unknown-group')
  
  useEffect(() => {
  
    if (data) {
      SetGroupID(data.group_ID);

      const alreadyPreset = FetchedGroups.some(group => group.group_id === data.group_ID);
      console.log(alreadyPreset);
      if (alreadyPreset === undefined && !isError ) UpdateChatList(roomName, data.group_ID);
    }
  }, [data]);
  return { toggleFetch };
}
////////////////////////////////////////////////////////////////////////////////////////


export function useGetGroupMessages() {
  const CurrentGroupCode = useSwitcherStore((state) => state.code);
  const [OldMessages, SetOldMessages] = useState<Message[]>([]);

  const {data,isLoading}= QUERYConstructor(GetGroupMessages,[CurrentGroupCode],[ CurrentGroupCode != ""], "FetchedMessages" )
  
  useEffect(() => {
    if (data) {
      SetOldMessages(data);
    }
  }, [data]);
  return { OldMessages,isLoading };
}
////////////////////////////////////////////////////////////////////////////////////////////////////

export function useGetGroupMembers() {
  const CurrentGroupCode = useSwitcherStore((state) => state.code);
  const [fetchMembers, SetMembers] = useState<Member[]>([]);

  const {data:GroupMembers,isLoading} = QUERYConstructor(GetGroupMembers, [CurrentGroupCode],[CurrentGroupCode != ''],"group_members")

  useEffect(() => {
    if (GroupMembers) {
      //console.log(GroupMembers.members);
      SetMembers(GroupMembers.members);
    }
  }, [GroupMembers]);
  return { fetchMembers , isLoading };
}
///////////////////////////////////////////////////////////////////////////////////

export function useGetUserGroups() {
  const SetCurrentRoomInfo = useSwitcherStore((state) => state.SetCurrentRoom);
  const UpdateFetchedGroups = useFetchedGroupsStore((state) => state.SetGroups);
  const [returnedGroupData, setData] = useState<GroupData[]>([]);

  const userID = JSON.parse(localStorage.getItem("userAuthData") || "{}");
  const id = userID?.user?.user_id;

  const {data: userdata} = QUERYConstructor(GetAllGroups, [id], [],'user_Info' )
    
  useEffect(() => {
    if (userdata) {
      setData(userdata);
    }
  }, [userdata]);

  useEffect(() => {
    returnedGroupData.map((item) => {
      //console.log(item);
      UpdateFetchedGroups(item.group_id, item.group_name, item.chat_password);
    });
  }, [returnedGroupData]);

  return { returnedGroupData,SetCurrentRoomInfo };
}

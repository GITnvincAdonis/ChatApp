import {
  AddToGroupMembersEP,
  AddToGroupsEP,
  GetGroup,
  LoginEndpoint,
  PostMessage,
  SignUpEndpoint,
  TokenUserInfo,
} from "@/API endpoints/API";
import {
  useFetchedGroupsStore,
  useGroupStore,
  useSwitcherStore,
} from "@/STORES/MessageStore";
import { UserIDStore } from "@/STORES/userAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useSignUpAddUserQ() {
  const [signInData, SetSignInData] = useState<{
    name: string;
    passcode: string;
  }>({ name: "", passcode: "" });

  const [clicked, SetClicked] = useState(false);
  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => SignUpEndpoint(signInData.name, signInData.passcode),
    queryKey: ["user_id"],
    enabled: clicked,
  });

  if (isError) console.log(error);
  if (isLoading) console.log("loading UserID");

  useEffect(() => {
    console.log(data != undefined);
    if (data && clicked) {
      console.log("clicking data");
      localStorage.setItem("jwt", data.token);
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
  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => LoginEndpoint(LoginInData.name, LoginInData.passcode),
    queryKey: ["user_id"],
    enabled: clicked,
  });

  if (isError) console.log(error);
  if (isLoading) console.log("loading UserID");

  useEffect(() => {
    console.log(`login ${data}`);
    if (data && clicked) {
      console.log("clicking data");
      localStorage.setItem("jwt", data.token);
    }
  }, [data]);
  return { SetlogInData, SetClicked };
}
////////////////////////////////////////////////////////////////////////////////////////////////
export function useTokenRetrieve() {
  const token = localStorage.getItem("jwt");

  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => TokenUserInfo(),
    queryKey: ["user_information"],
    enabled: token != null,
  });

  if (isError) console.log(error);
  if (isLoading) console.log("loading UserID");
  const SetStoreUserID = UserIDStore((state) => state.ChangeID);
  const SetStoreUserName = UserIDStore((state) => state.ChangeName);

  useEffect(() => {
    console.log(`login ${data}`);

    if (data && data.authData) {
      localStorage.setItem("userAuthData", JSON.stringify(data.authData));
      const userData = JSON.parse(localStorage.getItem("userAuthData") || "{}");
      const userId = userData?.user?.user_id;
      const username = userData?.user?.username;

      SetStoreUserID(userId);
      SetStoreUserName(username);
      console.log("User ID:", userId);
      console.log("Username:", username);
    } else {
      console.log("authData is missing from data");
    }
    //
  }, [data]);
}
/////////////////////////////////////////////////////////////////////////////
export function useAddToUserQ() {
  const queryClient = useQueryClient();
  const UpdateCurrentNewGroupID = UserIDStore((state) => state.setNewGroupID);

  const [newroomName, setNewRoomName] = useState("");
  const [newpasscode, setNewPassCode] = useState("");
  const [clickedAddGroup, SetAddGroup] = useState(false);
  const {
    data: ReturnedGroupPost,
    isError: isError2,
    isLoading: isLoading2,
    error: error2,
  } = useQuery({
    queryFn: async () => AddToGroupsEP(newroomName, newpasscode),
    queryKey: ["newGroup", newroomName, newpasscode],
    enabled: clickedAddGroup && newroomName != "" && newpasscode != null,
  });
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      console.log("mutateat");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["newGroup", newroomName, newpasscode],
        exact: true, // Ensures only the exact query key is invalidated
      });
    },
  });
  if (isError2) console.log(error2);
  if (isLoading2) console.log("loading");

  useEffect(() => {
    if (ReturnedGroupPost != "" && ReturnedGroupPost != undefined)
      UpdateCurrentNewGroupID(ReturnedGroupPost);
  }, [ReturnedGroupPost]);

  const newGroupID = UserIDStore((state) => state.newGroupID);
  useEffect(() => {
    console.log(`creating group `);
  }, [newGroupID]);
  return {
    mutateAsync,
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
  const CurrentUserID = UserIDStore((state) => state.id);
  const CurrentgroupID = UserIDStore((state) => state.newGroupID);
  const [canFetchGRPMEM, toggleFetch] = useState(false);

  const {
    data,
    isError: isError2,
    isLoading: isLoading2,
    error: error2,
  } = useQuery({
    queryFn: async () => {
      console.log(CurrentgroupID);
      return await AddToGroupMembersEP(CurrentgroupID, CurrentUserID);
    },
    queryKey: ["newGroupMember", CurrentgroupID, CurrentUserID],
    enabled:
      canFetchGRPMEM &&
      CurrentgroupID != undefined &&
      CurrentgroupID != "" &&
      CurrentUserID != "",
    retry: false,
  });
  if (isError2) console.log(error2);
  if (isLoading2) console.log("loading");

  useEffect(() => {
    console.log(`creating group member ${data}`);
  }, [data]);
  useEffect(() => {
    console.log(CurrentgroupID);
  }, [data]);
  return { toggleFetch };
}

////////////////////////////////////////////////////////////////////////////
export function usePostMessageQ(textInput: string) {
  const [buttonClicked, setClicked] = useState(false);
  const GroupID = useSwitcherStore((state) => state.code);
  const UserID = UserIDStore((state) => state.id);

  const queryClient = useQueryClient();

  const { data, isLoading, error, isError } = useQuery({
    queryFn: async () => {
      return await PostMessage(textInput, GroupID, UserID); // Ensure this returns a value
    },
    queryKey: ["messages", textInput, GroupID, UserID],
    enabled: buttonClicked && textInput !== "",
  });

  const { mutateAsync: RepostMessage } = useMutation({
    mutationFn: async () => {
      setClicked(false);
      console.log("mutated message post");
      // Include mutation logic here if needed
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["messages", textInput, GroupID, UserID],
        exact: true,
      }),
  });

  if (isError) console.error(error);
  if (isLoading) console.log("loading message return");
  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  return { RepostMessage, setClicked, buttonClicked };
}

////////////////////////////////////////////////////////////////////////////////////
export function useGetGroupIDQ(roomName: string, passcode: string) {
  const UpdateChatList = useGroupStore((state) => state.UpdateGroups);
  const [triggerGroupIdFetch, toggleFetch] = useState(false);
  const SetGroupID = UserIDStore((state) => state.setNewGroupID);
  const FetchedGroups = useFetchedGroupsStore((state) => state.group);
  const { data, isError, error, isLoading } = useQuery({
    queryFn: async () => {
      return await GetGroup(roomName, passcode);
    },
    queryKey: ["join-unknown-group", roomName, passcode],
    enabled: triggerGroupIdFetch,
    staleTime: Infinity,
    retry: false,
  });
  if (isError && error.message === "group not found")
    console.log("GROUP ISNT AVAILABLE");
  if (isLoading) console.log("loading");

  useEffect(() => {
    // console.log(error);
    if (data) {
      SetGroupID(data);
      FetchedGroups.map((item) => {
        console.log(item.group_id);
        console.log(data);
      });
      const alreadyPreset = FetchedGroups.find(
        (item) => item.group_id === data
      );
      console.log(alreadyPreset);
      if (!alreadyPreset) UpdateChatList(roomName, data);
    }
    console.log(`Joined group  ${data}`);
  }, [data]);
  return { toggleFetch };
}

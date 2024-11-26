import {
  AddToGroupMembersEP,
  AddToGroupsEP,
  LoginEndpoint,
  SignUpEndpoint,
} from "@/API endpoints/API";
import { UserIDStore } from "@/STORES/userAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useSignUpAddUserQ() {
  //STATE VARS
  const [signInData, SetSignInData] = useState<{
    name: string;
    passcode: string;
  }>({ name: "", passcode: "" });

  const [clicked, SetClicked] = useState(false);
  /////////////////////////////

  //FETCHING FROM BACKEND
  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => SignUpEndpoint(signInData.name, signInData.passcode),
    queryKey: ["user_id"],
    enabled: clicked,
  });

  if (isError) console.log(error);
  if (isLoading) console.log("loading UserID");

  //////
  ///SETTING STORE DATA
  const navigate = useNavigate();
  const SetStoreUserID = UserIDStore((state) => state.ChangeID);
  useEffect(() => {
    console.log(data != undefined);
    if (data && clicked) {
      console.log("clicking data");
      SetStoreUserID(`${data}`);
      navigate("/home");
    }
  }, [data]);

  return { SetSignInData, SetClicked };
}

export function useLoginGetUserQ() {
  const [LoginInData, SetlogInData] = useState<{
    name: string;
    passcode: string;
  }>({ name: "", passcode: "" });

  const [clicked, SetClicked] = useState(false);
  /////////////////////////////

  //FETCHING FROM BACKEND
  const { data, isLoading, isError, error } = useQuery({
    queryFn: async () => LoginEndpoint(LoginInData.name, LoginInData.passcode),
    queryKey: ["user_id"],
    enabled: clicked,
  });

  if (isError) console.log(error);
  if (isLoading) console.log("loading UserID");

  //////
  ///SETTING STORE DATA
  const navigate = useNavigate();
  const SetStoreUserID = UserIDStore((state) => state.ChangeID);
  useEffect(() => {
    console.log(`login ${data}`);
    if (data && clicked) {
      console.log("clicking data");
      SetStoreUserID(`${data}`);
      navigate("/home");
    }
  }, [data]);
  return { SetlogInData, SetClicked };
}

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

export function useAddToGroupMembersQ() {
  const queryClient = useQueryClient();
  const CurrentUserID = UserIDStore((state) => state.id);
  const CurrentgroupID = UserIDStore((state) => state.newGroupID);

  const {
    data,
    isError: isError2,
    isLoading: isLoading2,
    error: error2,
  } = useQuery({
    queryFn: async () => {
      console.log(CurrentgroupID);
      AddToGroupMembersEP(CurrentgroupID, CurrentUserID);
    },
    queryKey: ["newGroupMember", CurrentgroupID, CurrentUserID],
    enabled: CurrentgroupID != "" && CurrentUserID != "",
  });
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      console.log("mutateat");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["newGroupMember", CurrentgroupID, CurrentUserID],
        exact: true, // Ensures only the exact query key is invalidated
      });
    },
  });
  if (isError2) console.log(error2);
  if (isLoading2) console.log("loading");

  useEffect(() => {
    console.log(`creating group member ${data}`);
  }, [data]);
  useEffect(() => {
    console.log(CurrentgroupID);
  }, [data]);
  return { mutateAsync };
}

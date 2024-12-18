import { create } from "zustand";
type ChatMessage = {
  value: string;
  sentDate: string;
  side: "right" | "left";
};

interface storeType {
  MessageData: ChatMessage[];
  UpdateMessage: (input: string, side: "right" | "left",sentDate:string) => void;
  ClearMessage: ()=> void;
}
export const MessageStore = create<storeType>((set) => ({
  MessageData: [],
  UpdateMessage: (input: string, side: "right" | "left", sentDate:string) => {
    set((state) => ({
      MessageData: [...state.MessageData, { value: input, side: side, sentDate: sentDate}],
    }));
  },
  ClearMessage: ()=> {
    set(() => ({MessageData: []})); //
  }
}));
///////////////////////////////////////////////////
interface Group {
  group_name: string;
  groupID: string;
}

interface GroupStoreType {
  groups: Group[];
  UpdateGroups: (name: string, desc: string) => void;
}
export const useGroupStore = create<GroupStoreType>((set) => ({
  groups: [],
  UpdateGroups(name: string, desc: string) {
    set((state) => ({
      groups: [...state.groups, { group_name: name, groupID: desc }],
    }));
  },
}));
/////////////////////////////////////////////
interface RoomID {
  name: string;
  ID: string;

  SetCurrentRoom: (name: string, ID: string) => void;

}

export const useSwitcherStore = create<RoomID>((set) => ({
  name: "",
  ID: "",

  SetCurrentRoom: (name, ID) => {
    set(() => ({ name: name }));
    set(() => ({ ID: ID }));
  },

}));
///fetched
interface groupData {
  group_id: string;
  group_name: string;
  chat_password: string;
}
interface FetchedGroups {
  group: groupData[];
  SetGroups: (
    group_id: string,
    group_name: string,
    chat_password: string
  ) => void;
  
}

export const useFetchedGroupsStore = create<FetchedGroups>((set) => ({
  group: [],
  SetGroups: (group_id: string, group_name: string, chat_password: string) => {
    set((state) => ({
      group: [...state.group, { group_id, group_name, chat_password }],
    }));
  },
}));

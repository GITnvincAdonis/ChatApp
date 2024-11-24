import { create } from "zustand";
type ChatMessage = {
  value: string;
  side: "right" | "left";
};

interface storeType {
  MessageData: ChatMessage[];
  UpdateMessage: (input: string, side: "right" | "left") => void;
}
export const MessageStore = create<storeType>((set) => ({
  MessageData: [],
  UpdateMessage: (input: string, side: "right" | "left") => {
    set((state) => ({
      MessageData: [...state.MessageData, { value: input, side: side }],
    }));
  },
}));
///////////////////////////////////////////////////
interface Group {
  group_name: string;
  description: string;
}

interface GroupStoreType {
  groups: Group[];
  UpdateGroups: (name: string, desc: string) => void;
}
export const useGroupStore = create<GroupStoreType>((set) => ({
  groups: [],
  UpdateGroups(name: string, desc: string) {
    set((state) => ({
      groups: [...state.groups, { group_name: name, description: desc }],
    }));
  },
}));
/////////////////////////////////////////////
interface RoomCode {
  name: string;
  code: string;
  SetCurrentRoom: (name: string, code: string) => void;
}

export const useSwitcherStore = create<RoomCode>((set) => ({
  name: "",
  code: "",
  SetCurrentRoom: (name, code) => {
    set(() => ({ name: name }));
    set(() => ({ code: code }));
  },
}));

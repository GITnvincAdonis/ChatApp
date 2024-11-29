import { create } from "zustand";

interface UIDStoreType {
  id: string;
  name: string;
  newGroupID: string;

  ChangeID: (value: string) => void;
  ChangeName: (value: string) => void;
  setNewGroupID: (value: string) => void;
}
export const UserIDStore = create<UIDStoreType>((set) => ({
  id: "",
  name: "",
  newGroupID: "",
  ChangeID: (nextID: string) => {
    console.log("Setting user ID:", typeof nextID);
    set(() => ({ id: nextID }));
  },

  ChangeName: (nextName: string) => {
    set(() => ({ name: nextName }));
  },

  setNewGroupID: (nextID: string) => {
    set(() => ({ newGroupID: nextID }));
  },
}));

import { create } from "zustand";

interface UIDStoreType {
  id: string;
  newGroupID: string;
  setNewGroupID: (value: string) => void;
  ChangeID: (value: string) => void;
}
export const UserIDStore = create<UIDStoreType>((set) => ({
  id: "",
  newGroupID: "",
  ChangeID: (nextID: string) => {
    set(() => ({ id: nextID }));
  },

  setNewGroupID: (nextID: string) => {
    set(() => ({ newGroupID: nextID }));
  },
}));

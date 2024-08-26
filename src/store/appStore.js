import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

export const appStore = create((set) => ({
    idEditNote: null,
    setIdEditNote: (id) => set({idEditNote: id}),
    isShown: false,
    setIsShown: (bool) => set({isShown: bool}),
    typeAddEdit: 'add',
    setTypeAddEdit: (string) => set({typeAddEdit: string}),
    allNotes: null,
    setAllNotes: (notes) => set({allNotes: notes}),
}));

if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Store', appStore);
  }
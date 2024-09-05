import { create } from "zustand";
import React from 'react'

const initialState=[];
const Store = (set) => ({
    actionList1: [],
    actionList2: [],
    addActionList1: (action) => {
        set((state) => ({
            actionList1: action,
        }));
    },
    addActionList2: (action) => {
        set((state) => ({
            actionList2: action,
        }));
    },
    reset: () => set(initialState)
})

const useStore = create(Store);
export default useStore

import { create } from "zustand";
import React from 'react'

const Store = (set, get) => ({
     actionList: [],
    addActionList: (action) => {
        set((state) => ({
            actionList: action,
        }));
    },
})

const useStore = create(Store);
export default useStore

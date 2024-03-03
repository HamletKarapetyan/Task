import { configureStore } from "@reduxjs/toolkit";
import { ToDosSLice } from "./features/todoListSlices";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export const store = configureStore({
    reducer:{
        toDo:ToDosSLice.reducer
    }
})


export const useAppDispatch:()=>typeof store.dispatch=useDispatch;
export const appSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
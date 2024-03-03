import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { match } from "assert"

export interface ToDo {
    content:string
}

const initialState:ToDo = {
    content:"",
}

export const ToDosSLice = createSlice({
    name:"toDo",
    initialState,
    reducers:{
        addTodo:(state,action:PayloadAction<{content:string}>)=>{
            { localStorage.setItem("content",action.payload.content)}
        }
    }
})


export default ToDosSLice.reducer

export const {addTodo} = ToDosSLice.actions
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignUp from "../components/signUp/SignUp";
import UserPage from "../components/userPage/UserPage";
import ToDoList from "../components/todolist/ToDoList";
import Weather from "../components/weather/Weather";



export const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"",
                element:<SignUp/>
            },
            {
                path:"/userPage",
                element:<UserPage/>,
               
            }
            
        ]
    }
])

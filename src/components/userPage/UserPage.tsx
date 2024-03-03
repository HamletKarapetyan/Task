import React, { ChangeEvent, useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import './UserPage.css';
import ToDoList from '../todolist/ToDoList';
import News from "../news/News";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Weather from '../weather/Weather';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const UserPage: React.FC = () => {
    const name = localStorage.getItem('Name');
    const mail = localStorage.getItem('Email');
    const [newImg, setNewImg] = useState<string>('');
    const [pageArr, setPageArr] = useState<React.ReactNode[]>([<Weather />, <ToDoList />, <News />]);

    const removeItem = (index: number) => {
        const updatedArr = pageArr.filter((el,i) => i !== index);
        setPageArr(updatedArr);
    };

    
const postNewImg = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                localStorage.setItem('photo', reader.result as string)
                if (!newImg) {
                    setNewImg(localStorage.getItem("photo") as string);
                }

            }
        };
    }
};
    
    useEffect(() => {
        if (!newImg) {
            setNewImg(localStorage.getItem('photo') as string);
        }
    }, []); 
 
    
    return (
        <div className="main">
            <div className="userInfo">
                <div className='imageHolder'>
                    <img src={newImg} alt="User" />
                    <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                />

                <label htmlFor="fileInput" className="fileInputButton">
                    <FontAwesomeIcon icon={faImage} />
                </label>
                </div>
                <h1>{name}</h1>
                <h3>{mail}</h3>
            </div>
            <div className="dashboard">
                {pageArr.map((el,index:number)=>{
                        return(
                            <div className="dashboard">
                                {pageArr.map((el, index: number) => (
                                    <div key={index} className="dashboard-item">
                                        {el}
                                        <button className="deleteButton" onClick={() => removeItem(index)}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )})}
                </div>
            </div>
        );
    };

export default UserPage;
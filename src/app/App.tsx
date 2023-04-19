import React from 'react';
import './App.css';
import {ButtonAppBar} from "../components/ButtonAppBar";
import Container from '@mui/material/Container';
import {TodolistsList} from "../features/todolistsList/TodolistsList";
import {Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";

type PropsType = {
    demo?: boolean
}
export const App = ({demo = false}: PropsType) => {
    return (
        <div className={'App'}>
            <ButtonAppBar/>
            <Container fixed>
                <Routes>
                    <Route path='*' element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path='/' element={<TodolistsList demo={demo}/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </Container>
        </div>
    );
}


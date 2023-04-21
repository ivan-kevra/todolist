import React, {useEffect} from 'react';
import './App.css';
import {ButtonAppBar} from "../components/ButtonAppBar";
import Container from '@mui/material/Container';
import {TodolistsList} from "../features/todolistsList/TodolistsList";
import {Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store";
import CircularProgress from '@mui/material/CircularProgress';
import {initializeAppTC} from "./app-reducer";

type PropsType = {
    demo?: boolean
}
export const App = ({demo = false}: PropsType) => {

    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

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


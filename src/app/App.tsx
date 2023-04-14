import React from 'react';
import './App.css';
import {ButtonAppBar} from "../components/ButtonAppBar";
import Container from '@mui/material/Container';
import {TodolistsList} from "../features/todolistsList/TodolistsList";


export const App = () => {
    return (
        <div className={'App'}>
            <ButtonAppBar/>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}


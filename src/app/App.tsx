import React from 'react';
import './App.css';
import {ButtonAppBar} from "../components/ButtonAppBar";
import Container from '@mui/material/Container';
import {TodolistsList} from "../features/todolistsList/TodolistsList";

type PropsType = {
    demo?: boolean
}
export const App = ({demo = false}: PropsType) => {
    return (
        <div className={'App'}>
            <ButtonAppBar/>
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    );
}


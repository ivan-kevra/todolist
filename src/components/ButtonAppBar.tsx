import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackBar} from "./errorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../app/store";
import {RequestStatusType} from "../app/app-reducer";
import {useCallback} from "react";
import {logOutTC} from '../features/Login/auth-reducer';

export const ButtonAppBar = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const logOutHandler = useCallback(() => {
        dispatch(logOutTC())
    }, [])

    return (
        <Box sx={{flexGrow: 1}}>
            <ErrorSnackBar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    {isLoggedIn && <Button onClick={logOutHandler} color="inherit">Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
        </Box>
    );
}
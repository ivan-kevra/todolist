import Button from "@mui/material/Button";
import React from "react";

type ButtonWithMemoPropsType = {
    title: string
    onClick: () => void
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    variant: 'text' | 'outlined' | 'contained'


}

export const ButtonWithMemo = (props: ButtonWithMemoPropsType) => {
    return (
        <Button variant={props.variant}
                color={props.color}
                onClick={props.onClick}>
            {props.title}
        </Button>
    )
}

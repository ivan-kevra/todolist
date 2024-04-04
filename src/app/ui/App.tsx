import { FC, useEffect } from "react";
import { ErrorSnackbar } from "../../common/components/errorSnackbar/ErrorSnackbar";
import { Loader } from "../../common/components/loader/Loader";
import { useActions } from "../../common/hooks/useActions";
import { useAppSelector } from "../../common/hooks/useAppDispatch";
import { authThunks } from "../../features/auth/model/auth.slice";
import { Login } from "../../features/auth/ui/Login";
import { TodolistList } from "../../features/todolistList/ui/TodolistList";
import { isInitializedSelector } from "../model/app.selector";
import CircularProgress from "@mui/joy/CircularProgress";
import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "@/common/header";

type Props = {
  demo: boolean;
};
export const App: FC<Props> = ({ demo = false }) => {
  const isInitialized = useAppSelector(isInitializedSelector);

  const { initializeApp } = useActions(authThunks);

  useEffect(() => {
    initializeApp();
  });

  if (!isInitialized) {
    return <CircularProgress />;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/todolist/" element={<TodolistList demo={demo} />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/404" element={<h1>PAGE NOT FOUND</h1>} />
        <Route path="*" element={<Navigate to={"/404"} />} />
      </Routes>
      <Loader />
      <ErrorSnackbar />
    </>
  );
};

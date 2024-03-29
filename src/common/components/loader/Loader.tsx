import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { FC } from "react";
import { statusSelector } from "@/app/model/app.selector";
import { useAppSelector } from "@/common/hooks/useAppDispatch";

export const Loader: FC = () => {
  const status = useAppSelector(statusSelector);
  return status === "loading" ? (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <LinearProgress />
    </Box>
  ) : null;
};

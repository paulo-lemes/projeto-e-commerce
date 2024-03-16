import { CircularProgress } from "@mui/material";
import style from "./style.module.css";

const Loading = () => {
  return (
    <div className={style.loading}>
      <CircularProgress />
    </div>
  );
};

export default Loading;

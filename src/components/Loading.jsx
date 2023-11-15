import React from "react";
import { CircularProgress } from "@mui/joy";

const Loading = () => {
  return (
    <div className={"flex h-[500px] w-full items-center justify-center"}>
      <div>
        <CircularProgress />
      </div>
    </div>
  );
};

export default Loading;

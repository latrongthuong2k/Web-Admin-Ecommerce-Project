import React from "react";
import Notifications from "@/components/Notification";

const ClientWrapper = ({ Props }) => {
  return (
    <div className={"w-full pr-10"}>
      <div className={"flex h-auto justify-center"}>
        <Notifications />
      </div>
      {Props}
    </div>
  );
};

export default ClientWrapper;

"use client";
import React from "react";
import { motion } from "framer-motion";
import { Alert, AlertTitle } from "@mui/material";
import { useNotification } from "@/app/context/NotificationContext";

const Notifications = () => {
  const { notification } = useNotification();

  if (!notification) return null;

  const renderMultilineText = (str) => {
    return str.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {"- " + line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      style={{
        position: "absolute",
        top: "10px", // Đặt khoảng cách từ đỉnh màn hình
        left: "50%", // Đặt ở giữa theo trục ngang
        transform: "translateX(-50%)", // Dịch chuyển nửa độ rộng của thông báo để căn giữa
        zIndex: 1000,
      }}
    >
      <Alert severity={notification.type}>
        <AlertTitle>
          {notification.type.charAt(0).toUpperCase() +
            notification.type.slice(1)}
        </AlertTitle>
        {renderMultilineText(notification.message)}
      </Alert>
    </motion.div>
  );
};

export default Notifications;

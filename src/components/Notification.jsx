"use client";
import React from "react";
import { Alert, AlertTitle } from "@mui/material";

export const successNotification = (description, strong) => {
  return (
    <Alert severity="success">
      <AlertTitle>Success</AlertTitle>
      {description} — <strong>{strong}</strong>
    </Alert>
  );
};

export const errorNotification = (description, strong) => {
  return (
    <Alert severity="warning">
      <AlertTitle>Warning</AlertTitle>
      description — <strong>{strong}</strong>
    </Alert>
  );
};

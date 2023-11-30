"use client";
import React, { createContext, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { AdminDataContext } from "@/app/context/AdminDataContext";
import { CategoryContextData } from "@/app/context/CategoryDataContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ModalContext = createContext({
  handleOpen: () => {},
  handleClose: () => {},
  setTitle: () => {},
  setContent: () => {},
});

export const GeneralModal = ({
  title,
  content,
  open,
  handleClose,
  handleSubmit,
  mode,
}) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box className="absolute left-1/2 top-1/2 h-auto w-[600px] -translate-x-1/2 -translate-y-1/2 transform rounded-[20px] bg-white p-4 shadow-lg">
      <Box
        className={"text-center text-lg font-bold uppercase text-gray-600"}
        id="modal-modal-title"
        variant="h6"
        component="h2"
      >
        {title}
      </Box>
      <Box
        className={"flex h-auto flex-col gap-6 p-5"}
        id="modal-modal-description"
        sx={{ mt: 2 }}
      >
        {content}
        <Button
          onClick={handleSubmit}
          variant="contained"
          className={
            "w-1/2 self-center bg-gray-500 uppercase hover:bg-teal-800 "
          }
        >
          {mode.toLowerCase() === "add" ? "Add" : "Update"}
        </Button>
      </Box>
    </Box>
  </Modal>
);

export const UserModalProvider = ({ children }) => {
  const { handleSubmit } = useContext(AdminDataContext);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Default Title");
  const [content, setContent] = useState("Default Content");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ModalContext.Provider
      value={{ handleOpen, handleClose, setTitle, setContent }}
    >
      {children}
      <GeneralModal
        title={title}
        content={content}
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </ModalContext.Provider>
  );
};

// And do the same for CategoryModalProvider
export const CategoryModalProvider = ({ children }) => {
  const { handleSubmit, setDropdownCategories } =
    useContext(CategoryContextData);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Default Title");
  const [content, setContent] = useState("Default Content");
  const [mode, setMode] = useState("add");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ModalContext.Provider
      value={{
        handleOpen,
        handleClose,
        setTitle,
        setContent,
        setMode,
        setDropdownCategories,
      }}
    >
      {children}
      <GeneralModal
        title={title}
        content={content}
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        mode={mode}
      />
    </ModalContext.Provider>
  );
};

// And do the same for CategoryModalProvider

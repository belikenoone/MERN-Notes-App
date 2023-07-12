import React, { useState, useContext } from "react";
import axios from "axios";
import AppContext from "../context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const AddNote = () => {
  const {
    setAllNotes,
    showTitleWordCount,
    showBodyWordCount,
    setShowTitleWordCount,
    setShowBodyWordCount,
    titleLimit,
    bodyLimit,
  } = useContext(AppContext);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [disbaleBtn, setDisableBtn] = useState(false);

  const notify = () => toast("Note Added");
  const addNote = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3001/", {
      noteTitle,
      noteBody,
    });
    const newNote = response.data;
    setAllNotes((prev) => [...prev, newNote]);
    setNoteTitle("");
    setNoteBody("");
    notify();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ scale: 0 }}
    >
      <form
        className="flex w-[90%] mx-auto flex-col my-14 gap-5 overflow-hidden px-3 "
        onSubmit={addNote}
      >
        <span className="text-3xl font-bold">
          Hello, Today is {new Date().toDateString()}
        </span>
        <input
          placeholder="Note Title"
          className="py-3 px-2 text-black outline-primary outline-offset-4 rounded-md"
          value={noteTitle}
          maxLength={titleLimit}
          onChange={(e) => setNoteTitle(e.target.value)}
          onBlur={() => setShowTitleWordCount(false)}
          onFocus={() => setShowTitleWordCount(true)}
        />
        {showTitleWordCount && (
          <span>Characters Left:{titleLimit - noteTitle.length}</span>
        )}
        <input
          placeholder="Note Body"
          className="py-3 px-2 text-black outline-primary outline-offset-4 rounded-md"
          value={noteBody}
          maxLength={bodyLimit}
          onChange={(e) => setNoteBody(e.target.value)}
          onBlur={() => setShowBodyWordCount(false)}
          onFocus={() => setShowBodyWordCount(true)}
        />
        {showBodyWordCount && (
          <span>Characters Left:{bodyLimit - noteBody.length}</span>
        )}
        <button
          className="bg-[#E966A0] py-3 hover:scale-105 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={disbaleBtn}
        >
          Add Note
        </button>
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </motion.div>
  );
};

export default AddNote;

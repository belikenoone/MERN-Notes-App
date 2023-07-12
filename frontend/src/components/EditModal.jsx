import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import AppContext from "../context";
import { useEffect } from "react";
const EditModal = ({
  setTitle,
  setBody,
  title,
  body,
  updateNote,
  editId,
  setEditing,
}) => {
  const {
    showTitleWordCount,
    showBodyWordCount,
    setShowTitleWordCount,
    setShowBodyWordCount,
    titleLimit,
    bodyLimit,
  } = useContext(AppContext);
  const [btnDisbaled, setbtnDisbaled] = useState(null);
  const enableBtn = () => {
    if (title.length < 1 && body.length < 1) {
      setbtnDisbaled(true);
    } else {
      setbtnDisbaled(false);
    }
  };
  useEffect(() => {
    if (title.length < 1 && body.length < 1) {
      setbtnDisbaled(true);
    }
  }, []);
  return (
    <motion.div
      className="z-[1000] fixed top-0 left-0 bg-[rgba(0,0,0,0.7)] h-full w-full grid place-items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-matte-blue rounded-xl opacity-90 h-1/2 w-1/2 flex flex-col justify-center items-center gap-6"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
      >
        <div className="flex flex-col justify-center">
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              enableBtn();
            }}
            className="py-2 px-3 rounded-md text-black"
            onBlur={() => setShowTitleWordCount(false)}
            onFocus={() => setShowTitleWordCount(true)}
          />
          {showTitleWordCount && (
            <span>Characters Left:{titleLimit - title.length}</span>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <textarea
            type="text"
            placeholder="body"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              enableBtn();
            }}
            className="py-2 px-3 rounded-md text-black resize-none"
            onBlur={() => setShowBodyWordCount(false)}
            onFocus={() => setShowBodyWordCount(true)}
          />
          {showBodyWordCount && (
            <span>Characters Left:{bodyLimit - body.length}</span>
          )}
        </div>
        <div className="flex gap-6">
          <button
            onClick={() => setEditing(false)}
            className="py-2 px-3 bg-red-500"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              updateNote(editId, title, body);
              setEditing(false);
            }}
            className="py-2 px-3 bg-green-500 disabled:bg-gray-700 disabled:cursor-not-allowed"
            disabled={btnDisbaled}
          >
            Update
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditModal;

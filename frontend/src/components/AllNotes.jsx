import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context";
import { AnimatePresence, motion } from "framer-motion";
import { MdDeleteOutline } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import EditModal from "./EditModal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AllNotes = () => {
  const { getAllNotes, allNotes, deleteNote, setAllNotes } =
    useContext(AppContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const updated = () => toast("Note Updated");
  const deleted = () => toast("Note Deleted");
  useEffect(() => {
    getAllNotes();
  }, []);
  const updateNote = async (editId, title, body) => {
    try {
      await axios.put("http://localhost:3001/", {
        _id: editId,
        noteTitle: title,
        noteBody: body,
      });
      setAllNotes((prev) =>
        prev.map((note) =>
          note._id === editId
            ? { ...note, noteTitle: title, noteBody: body }
            : note
        )
      );
      updated();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
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
      {editing && (
        <EditModal
          title={title}
          body={body}
          setTitle={setTitle}
          setBody={setBody}
          updateNote={updateNote}
          editId={editId}
          setEditing={setEditing}
        />
      )}
      <AnimatePresence>
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-col4 gap-4 w-[90%] mx-auto my-11 z-20">
            {allNotes.map((note) => {
              return (
                <motion.div
                  className="min-h-fit flex flex-col bg-matte-blue text-white p-3 relative shadow-sm shadow-white gap-3 rounded-md group r overflow-hidden"
                  key={note._id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <span className="text-2xl font-bold break-words text-tertiary">
                    {note.noteTitle}
                  </span>
                  <span>{note.noteBody}</span>
                  <span>{new Date(note.updatedAt).toDateString()}</span>
                  <div className="absolute group-hover:top-0 -top-full left-0 z-30 bg-[#dad7cd] bg-opacity-50 grid place-items-center h-full w-full transition-all">
                    <div className="flex justify-center items-center gap-5">
                      <button
                        onClick={() => {
                          deleteNote(note._id);
                          deleted();
                        }}
                        className="bg-white text-red-500 rounded-full p-3"
                      >
                        <MdDeleteOutline size={25} />
                      </button>
                      <button
                        onClick={() => {
                          setEditing(true);
                          setEditId(note._id);
                          setTitle(note.noteTitle);
                          setBody(note.noteBody);
                        }}
                        className="bg-white text-green-500 rounded-full p-3"
                      >
                        <AiFillEdit size={25} />
                      </button>
                    </div>
                  </div>
                  {/* <button
                    onClick={() => {
                      deleteNote(note._id);
                      deleted();
                    }}
                    className="absolute right-2 top-2 focus:scale-75"
                  >
                    <MdDeleteOutline size={20} />
                  </button>
                  <button
                    className="absolute right-8 top-2 focus:scale-75"
                    onClick={() => {
                      setEditing(true);
                      setEditId(note._id);
                      setTitle(note.noteTitle);
                      setBody(note.noteBody);
                    }}
                  >
                    <AiFillEdit size={20} />
                  </button> */}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            className="w-[90%] mx-auto my-11 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h1 className="text-5xl font-bold text-red">There are no notes</h1>
            <Link to={"/add-note"} className="py-2 underline text-lg">
              Add One
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AllNotes;

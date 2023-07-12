import { createContext, useState, useEffect } from "react";
import axios from "axios";
const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const titleLimit = 60;
  const bodyLimit = 300;
  const [allNotes, setAllNotes] = useState([]);
  const [showTitleWordCount, setShowTitleWordCount] = useState(false);
  const [showBodyWordCount, setShowBodyWordCount] = useState(false);
  const getAllNotes = async () => {
    const response = await axios.get("http://localhost:3001/");
    setAllNotes(response.data);
  };
  const deleteNote = async (id) => {
    await axios.delete("http://localhost:3001/" + id);
    setAllNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
  };
  return (
    <AppContext.Provider
      value={{
        allNotes,
        setAllNotes,
        getAllNotes,
        deleteNote,
        titleLimit,
        bodyLimit,
        showTitleWordCount,
        showBodyWordCount,
        setShowTitleWordCount,
        setShowBodyWordCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;

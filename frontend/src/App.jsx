import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import AllNotes from "./components/AllNotes";
import AddNote from "./components/AddNote";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route index element={<AllNotes />} />
      <Route path="/add-note" element={<AddNote />} />
    </Route>
  )
);
const App = () => {
  return (
    <div className="min-h-screen dark:bg-bg-dark dark:text-white w-full">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

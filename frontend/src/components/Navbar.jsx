import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FiSun, FiMoon, FiMenu } from "react-icons/fi";
const Navbar = () => {
  const [darkMode, setDarkMode] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const handleDarkMode = () => {
    setDarkMode(darkMode === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
      setDarkMode("dark");
    } else {
      setDarkMode("light");
    }
  }, []);
  useEffect(() => {
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <>
      <header className="sticky top-0 left-0 w-full bg-dark-blue text-white z-[99999]">
        <nav className="w-[90%] mx-auto flex justify-between items-center py-3">
          <Link to={"/"} className="text-3xl">
            Note-E-Fy
          </Link>
          <div className="sm:flex gap-4 hidden  ">
            <NavLink to={"/"} className={"py-2 px-3"}>
              All Notes
            </NavLink>
            <NavLink to={"/add-note"} className={"py-2 px-3"}>
              Add Note
            </NavLink>

            <button onClick={handleDarkMode}>
              {darkMode === "dark" ? <FiMoon /> : <FiSun />}
            </button>
          </div>
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className={`block sm:hidden z-[100] transition-all ${
              showMenu ? "rotate-180" : "rotate-0"
            }`}
          >
            <FiMenu size={35} />
          </button>

          <div
            className={`flex gap-4 flex-col fixed  h-screen w-full bg-slate-900 text-white  left-0 py-16 px-10 justify-center  ease-in-out duration-300 z-50 ${
              showMenu ? "top-0" : "-top-full"
            }`}
          >
            <NavLink
              to={"/"}
              className={"text-4xl py-3 px-4 tracking-[5px] font-bold"}
              onClick={() => setShowMenu(false)}
            >
              All Notes
            </NavLink>
            <NavLink
              to={"/add-note"}
              className={"text-4xl py-3 px-4 tracking-[5px] font-bold"}
              onClick={() => setShowMenu(false)}
            >
              Add Note
            </NavLink>

            <button onClick={handleDarkMode} className="px-4">
              {darkMode === "dark" ? <FiMoon size={50} /> : <FiSun size={50} />}
            </button>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Navbar;

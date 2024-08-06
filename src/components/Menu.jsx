import { useUser } from "@auth0/nextjs-auth0/client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { createUserIfNotExists } from "@/app/api/user"; // Đảm bảo đường dẫn đúng

export default function Menu() {
  const { user, isLoading } = useUser();
  const pathname = usePathname();

  const getClassName = (path) => {
    return pathname === path
      ? "p-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-600"
      : "p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300";
  };

  useEffect(() => {
    if (user) {
      createUserIfNotExists(user);
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <nav className="bg-white py-2 md:py-4">
      <div className="container px-4 mx-auto md:flex md:items-center">
        <div className="flex justify-between items-center">
          <a href="/" className="font-bold text-xl text-indigo-600">
            Mindmap Flow
          </a>
          <button
            className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden"
            id="navbar-toggle"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="bars"
              className="svg-inline--fa fas fa-bars"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0"
          id="navbar-collapse"
        >
          <a href="/" className={getClassName("/")}>
            Home
          </a>
          <a href="/abouts" className={getClassName("/abouts")}>
            About
          </a>
          <a href="/features" className={getClassName("/features")}>
            Features
          </a>
          <a href="/price" className={getClassName("/price")}>
            Price
          </a>
          <a href="/contact" className={getClassName("/contact")}>
            Contacts
          </a>
          {user ? (
            <>
              <div className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded">
                Hi, {user.name} !
              </div>
              <a href="/mindmap" className={getClassName("/mindmap")}>
                My Mindmap
              </a>
              <a
                href="/api/auth/logout"
                className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <a
                href="/api/auth/login"
                className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300"
              >
                Login
              </a>
              <a
                href="/api/auth/signup"
                className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
              >
                SignUp
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

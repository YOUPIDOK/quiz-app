'use client';
import React from "react";
import {useAppContext} from "@/context/AppContext";

const Header = () => {
    const {username} = useAppContext();

    return (
            <>
                { username !== '' &&
                  <div className="d-flex justify-content-between mb-3 align-items-center bg-white p-1">
                    <h1 className="text-center fw-bold">Quiz App</h1>
                    <div className="border-primary bg-white px-2 py-1 rounded-3 border fw-bold">{ username }<i className="bi bi-person-circle ms-1 text-primary"></i></div>
                  </div>
                }
            </>
    );
};

export default Header;

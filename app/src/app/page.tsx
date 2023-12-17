"use client";
import React from "react";
import SetUsername from "@/components/SetUsername";
import Menu from "@/components/Menu";
import Quiz from "@/components/Quiz";

export default function Home() {

    return (
        <>
            <SetUsername/>
            <Menu/>
            <Quiz/>
        </>
    );
}

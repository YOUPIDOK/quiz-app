import './globals.css'
import {AppProvider} from "@/context/AppContext";
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import Header from "@/partials/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
      // @ts-ignore
      <AppProvider>
        <html lang="en">
          <body className="bg-primary-subtle">
            <ToastContainer/>
            <Header/>
            <main>
              {children}
            </main>
          </body>
        </html>
      </AppProvider>
  )
}

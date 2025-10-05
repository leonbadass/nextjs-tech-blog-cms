import React from "react";
import './globals.css';
import Header from "./component/header";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-full">
      <body className="w-full min-h-screen m-0 p-0 " >
        <Header/>
      
        <main className="w-full min-h-screen bg-gray-50 ">
          {children}
        </main>
      </body>
    </html>
  );
}

"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import { LoadingProvider } from "@/context/LoadingContext";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingProvider>
          <UserProvider>
            <Menu />
            {children}
            <Footer />
          </UserProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}

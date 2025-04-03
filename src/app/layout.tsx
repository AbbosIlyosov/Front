import type { Metadata } from "next";
import { Passion_One, Poppins } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/AppHeader";

const poppins = Poppins({
  variable: "--font-poppins",
  weight:"400"
});

const passionOne = Passion_One({
  variable: "--font-passion-one",
  weight:'400'
});

export const metadata: Metadata = {
  title: "Servicar",
  description: "Car Serving Application"
}

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const isAuthenticated = true;

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${passionOne.variable} antialiased relative`}
      >
        {!isAuthenticated && 
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10 before:content-[''] before:fixed before:inset-0 before:backdrop-blur-md"
          style={{backgroundImage: "url('/images/Background.png')"}}
        >
        </div>}
          <AppHeader/>
          {children}
      </body>
    </html>
  );
}

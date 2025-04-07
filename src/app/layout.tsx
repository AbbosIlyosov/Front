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

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${passionOne.variable} antialiased relative`}
      >
          <AppHeader/>
          {children}
      </body>
    </html>
  );
}

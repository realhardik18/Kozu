import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const roboto_mono = Roboto_Mono({  
  subsets: ["latin"],
});

export const metadata = {
  title: "HandyMan",
  description: "cool shi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto_mono} ${roboto_mono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

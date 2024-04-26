import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "./components/ReactQueryProvider";

const inter = Lato({ weight: ["300", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Api Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ReactQueryProvider>
  );
}

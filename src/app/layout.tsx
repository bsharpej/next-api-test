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
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1 className="text-white mx-auto text-xl font-bold text-center mt-8">
            A really useful list of Pies
          </h1>
        </header>
        <ReactQueryProvider>
          <main>{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

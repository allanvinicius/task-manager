import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/styles/globals.css";
import { TaskProvider } from "@/context/task-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gerenciador de Tarefas",
  description: "Gerenciador de tarefas",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <main className="w-full flex flex-1 justify-between gap-8">
          <TaskProvider>{children}</TaskProvider>
        </main>
      </body>
    </html>
  );
}

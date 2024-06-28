import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getUser } from "@/actions/auth/user.action";
import AuthHeader from "@/components/AuthHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "투두리스트",
  description: "나만의 투두리스트를 만들어보세요!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser({ serverComponent: true });

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthHeader user={user} />
        {children}
      </body>
    </html>
  );
}

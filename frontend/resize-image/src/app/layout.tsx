"use client"
import "./globals.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"



const client = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body
      >
      <QueryClientProvider client={client}>
        <div className="w-full h-svh flex justify-center items-center ">{children}</div>
    </QueryClientProvider>
      </body>
    </html>
  );
}

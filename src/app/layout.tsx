import "./globals.css";

// import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased dark">
        {children}
        {/* <Toaster position="top-right" /> */}
      </body>
    </html>
  );
}

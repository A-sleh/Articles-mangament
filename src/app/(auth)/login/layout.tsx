export const metadata = {
  title: "Login",
  description: "Login page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-yellow-200">
      {children}
    </div>
  );
}

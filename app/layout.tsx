export const metadata = {
  title: "Pump Pilot",
  description: "Hypertrophy, handled."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-black text-zinc-200">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}

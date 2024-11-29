import localFont from "next/font/local";
import "@/app/globals.css";
import Link from "next/link";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-[#20403b] text-white text-center py-2 font-medium text-2xl">
          <Link href="/">Mental Health Tracker</Link>
        </header>
        {children}
        <footer className="bg-[#20403b] text-white text-center py-2">
          <p>© {new Date().getFullYear()} Mental Health Tracker</p>
        </footer>
      </body>
    </html>
  );
}

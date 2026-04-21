import { Toaster } from 'react-hot-toast';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Task Manager | Productivity App',
  description: 'Manage your tasks, set deadlines, and track your progress all in one place.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col pt-16 lg:pt-0`}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}

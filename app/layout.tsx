import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Life: Open World',
  description: 'A living Nigerian open-world life simulation.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

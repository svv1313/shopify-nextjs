import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Layout from '../../components/Layout';
import { ShopProvider } from '../../context/shopContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Ecommerce",
  description:
    "This is a modern ecommerce site built with Next.js and Shopify.",
  openGraph: {
    title: "Modern Ecommerce",
    type: "website",
    locale: "en_US",
    url: "https://shopify-nextjs-bice.vercel.app/",
    images: ["https://shopify-nextjs-bice.vercel.app/images/share.png"],
    description: "This is a modern ecommerce site built with Next.js and Shopify.",
    siteName: "Modern Ecommerce",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ShopProvider>
          <Layout>{children}</Layout>
        </ShopProvider>
      </body>
    </html>
  );
}

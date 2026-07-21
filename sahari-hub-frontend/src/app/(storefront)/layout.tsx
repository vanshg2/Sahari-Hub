import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
    </>
  );
}

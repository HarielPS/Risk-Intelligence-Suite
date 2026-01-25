import Navbar from "@/app/components/landing/Navbar";
import Footer from "@/app/components/landing/Footer";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

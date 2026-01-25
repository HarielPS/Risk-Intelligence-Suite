// import NavbarCliente from "@/app/components/landing/Navbar";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <NavbarCliente /> */}
      {children}
    </>
  );
}

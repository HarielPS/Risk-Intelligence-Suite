
// import Navbar from "@/app/components/Navbar";
// import Footer from "@/app/components/Footer";
// import "./globals.css"; 

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="es">
//       <body>
//         <Navbar />
//         {children}
//         <Footer />
//       </body>
//     </html>
//   );
// }


// src/app/layout.tsx
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

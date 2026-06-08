import type { ReactNode } from "react";
import { Navbar } from "../organisms/Navbar";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}


import { AppHeader } from "@/components/Header";

export default function GlobalLayout({ children }) {
  return (
    <div>
      <AppHeader />
      <main>{children}</main>
    </div>
  );
}

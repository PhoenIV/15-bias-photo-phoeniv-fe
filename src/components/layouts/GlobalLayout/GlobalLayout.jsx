import { Header } from "@/components/Header";

export default function GlobalLayout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}

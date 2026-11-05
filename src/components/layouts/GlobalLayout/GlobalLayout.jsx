import { HeaderContainer } from "@/components/Header";

export default function GlobalLayout({ children }) {
  return (
    <div>
      <HeaderContainer />
      <main>{children}</main>
    </div>
  );
}

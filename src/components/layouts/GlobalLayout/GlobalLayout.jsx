import HeaderContainer from "@/components/Header/HeaderContainer";

export default function GlobalLayout({ children }) {
  return (
    <div>
      <HeaderContainer />
      <main>{children}</main>
    </div>
  );
}

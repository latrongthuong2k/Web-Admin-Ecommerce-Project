import Navbar from "@/components/Navbar";
export default function Layout({ children }) {
  return (
    <nav className={"flex"}>
      <Navbar />
      {children}
    </nav>
  );
}

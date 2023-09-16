import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="px-4">{children}</main>
    </>
  );
}

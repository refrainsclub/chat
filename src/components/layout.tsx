import { UserProvider } from "~/hooks/use-user";
import Header from "./header";
import { ThemeProvider } from "next-themes";
import Meta from "./meta";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Meta />
        <Header />
        <main className="px-4">{children}</main>
      </ThemeProvider>
    </UserProvider>
  );
}

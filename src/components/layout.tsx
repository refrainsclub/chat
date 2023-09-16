import { UserProvider } from "~/hooks/useUser";
import Header from "./header";
import { ThemeProvider } from "next-themes";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Header />
        <main className="px-4">{children}</main>
      </ThemeProvider>
    </UserProvider>
  );
}

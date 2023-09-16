import SignedIn from "~/components/auth/signed-in";
import SignedOut from "~/components/auth/signed-out";

export default function Home() {
  return (
    <>
      <SignedIn>
        <p>You are signed in!</p>
      </SignedIn>
      <SignedOut>
        <p>You are signed out!</p>
      </SignedOut>
    </>
  );
}

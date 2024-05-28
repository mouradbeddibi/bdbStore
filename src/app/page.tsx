import { auth } from "@/auth";
import SignInButton from "@/components/SignInButton";
import prisma from "@/utils/db";

export default async function Home() {
  const session = await auth()
  if (!session?.user) {
    return <SignInButton />
  }
  return (
    <div>LOGGED IN WITH {session.user.userRole} ACCOUNT </div>
  );
}

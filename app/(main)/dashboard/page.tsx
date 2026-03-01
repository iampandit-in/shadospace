import LoadingButton from "@/components/utils/loading-button";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }

  async function logout() {
    "use server";
    await auth.api.signOut({
      headers: await headers(),
    });
    revalidatePath("/dashboard");
  }

  return (
    <div className="container p-4">
      <p>dashboard {session.user.name}</p>
      <p>{session.user.email}</p>
      <form action={logout}>
        <LoadingButton variant={"outline"}>Logout</LoadingButton>
      </form>
    </div>
  );
}

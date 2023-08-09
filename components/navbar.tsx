import { auth, UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

import MainNav from "./main-nav";
import StoreSwitcher from "./store-switcher";
import ThemeToggle from "./theme-toggle";

async function Navbar() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({ where: { userId } });

  return (
    <div className="border-b">
      <div className="flex items-center h-16 px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="flex items-center ml-auto space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;

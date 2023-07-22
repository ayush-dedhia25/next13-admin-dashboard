import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: {
    storeId: string;
  };
}

async function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: { id: params.storeId, userId },
  });

  if (!store) redirect("/");

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default DashboardLayout;

import prismadb from "@/lib/prismadb";

type DashboardPageProps = {
  params: {
    storeId: string;
  };
};

async function DashboardPage({ params }: DashboardPageProps) {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return <div>Active Store: {store?.name}</div>;
}

export default DashboardPage;

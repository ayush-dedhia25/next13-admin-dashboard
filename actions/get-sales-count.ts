import prismadb from "@/lib/prismadb";

async function getSalesCount(storeId: string) {
  const salesCount = await prismadb.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });

  return salesCount;
}

export default getSalesCount;

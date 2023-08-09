import prismadb from "@/lib/prismadb";

async function getStockCount(storeId: string) {
  const productCount = await prismadb.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return productCount;
}

export default getStockCount;

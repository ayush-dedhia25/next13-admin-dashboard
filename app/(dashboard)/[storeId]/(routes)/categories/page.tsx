import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import CategoryClient from "./components/client";
import { CategoryColumn } from "./components/columns";

async function CategoriesPage({ params }: { params: { categoryId: string } }) {
  const categories = await prismadb.category.findMany({
    where: { id: params.categoryId },
    include: { billboard: true },
    orderBy: { createdAt: "desc" },
  });

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
}

export default CategoriesPage;

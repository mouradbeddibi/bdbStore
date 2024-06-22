export const dynamic = "force-dynamic"
import { getProductsByCategory } from "@/lib/prismaUtils";
import { buttonVariants } from "@/components/ui/button";
import { TableHead, TableRow, TableHeader, TableBody, Table } from "@/components/ui/table";

import Link from "next/link";
import ProductRowCard from "@/components/ProductRowCard";
import { ArrowLeft, PlusIcon } from "lucide-react";
import { auth } from "@/auth";
import CreateSubCategoryDialog from "./SubCategoryModal";

const ProductsByCategoryPage = async ({ params }: { params: { categoryName: string } }) => {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        return <h1>Not Authorised</h1>
    }
    const productsData = await getProductsByCategory(params.categoryName);
    if (productsData && productsData.products) {
        return (
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <div className="flex items-center justify-between">
                    <Link href={"/admin/categories"} className={buttonVariants({ size: "sm", variant: "destructive" })}>
                        <ArrowLeft className="mr-2" />
                        Back
                    </Link>
                    <div className="grid gap-1">

                        <h2 className="text-2xl font-bold">{params.categoryName}</h2>

                    </div>
                    <div className="flex gap-5">
                        <Link href={"/admin/products/new"} className={buttonVariants({ size: "sm" })}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Product
                        </Link>
                        <CreateSubCategoryDialog categoryName={params.categoryName} />
                    </div>
                </div>
                <div className="border shadow-sm rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Image</TableHead>
                                <TableHead className="min-w-[200px]">Name</TableHead>
                                <TableHead className="hidden md:table-cell">Price</TableHead>
                                <TableHead className="hidden sm:table-cell">Inventory</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productsData.products.map((product) => (
                                <ProductRowCard key={product.id} product={product} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>
        );
    }

    // Optionally handle the case when there are no products or products is null
    return <p>No products found</p>;
};

export default ProductsByCategoryPage;

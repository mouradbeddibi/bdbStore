import { getProducts } from "@/lib/prismaUtils";
import {  buttonVariants } from "@/components/ui/button";
import { TableHead, TableRow, TableHeader, TableBody, Table } from "@/components/ui/table";
import { PaginationPrevious, PaginationItem, PaginationLink, PaginationNext, PaginationContent, Pagination } from "@/components/ui/pagination";
import Link from "next/link";
import ProductRowCard from "@/components/ProductRowCard";
import { PlusIcon } from "lucide-react";

const ProductsPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const page = parseInt(searchParams.page as string) || 1;
    const take = 3;
    const skip = (page - 1) * take;

    const { products, totalProducts } = await getProducts(skip, take);

    const totalPages = Math.ceil(totalProducts / take);

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center justify-between">
                <div className="grid gap-1">
                    <h2 className="text-2xl font-bold">All Products</h2>
                    <p className="text-gray-500 dark:text-gray-400">Browse and manage your product catalog.</p>
                </div>
                <Link href={"/admin/products/new"} className={buttonVariants({ size: "sm" })}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Product
                </Link>
            </div>
            <div className="border shadow-sm rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead className="min-w-[200px]">Name</TableHead>
                            <TableHead className="hidden md:table-cell">Category</TableHead>
                            <TableHead className="hidden md:table-cell">Price</TableHead>
                            <TableHead className="hidden sm:table-cell">Inventory</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => <ProductRowCard key={product.id} product={product} />)}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-center">
                <Pagination>
                    <PaginationContent>
                        {page > 1 && (
                            <PaginationItem>
                                <PaginationPrevious href={`?page=${page - 1}`} />
                            </PaginationItem>
                        )}
                        {Array.from({ length: totalPages }, (_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink href={`?page=${index + 1}`} isActive={index + 1 === page}>
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {page < totalPages && (
                            <PaginationItem>
                                <PaginationNext href={`?page=${page + 1}`} />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            </div>
        </main>
    );
};

export default ProductsPage;


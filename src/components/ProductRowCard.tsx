import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import Image from 'next/image';
import Link from 'next/link';
import DeleteProductModal from '@/app/admin/products/DeleteProductModal';
import { Edit } from 'lucide-react';
import { Prisma, Product } from '@prisma/client';

type ProductWithCategory = Prisma.ProductGetPayload<{ include: { category: true } }>;

function ProductRowCard({ product }: { product: ProductWithCategory | Product }) {
    return (
        <TableRow>
            <TableCell>
                <img
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={product.image}
                    width="64"
                />
            </TableCell>
            <TableCell className="font-medium">
                <Link href={`/admin/products/edit/${product.id}`}>
                    {product.name}
                </Link>
            </TableCell>
            {isProductWithCategory(product) && (
                <TableCell className="hidden md:table-cell">
                    {product.category.name}
                </TableCell>
            )}
            <TableCell className="hidden md:table-cell">
                {product.price} Dh
            </TableCell>
            <TableCell className="hidden sm:table-cell">
                {product.stock}
            </TableCell>
            <TableCell className="text-right align-middle">
                <DeleteProductModal productId={product.id} productImg={product.image} />
            </TableCell>
        </TableRow>
    );
}

// Type guard to check if the product is of type ProductWithCategory
function isProductWithCategory(product: ProductWithCategory | Product): product is ProductWithCategory {
    return (product as ProductWithCategory).category !== undefined;
}

export default ProductRowCard;

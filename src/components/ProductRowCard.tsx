import React from 'react'
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import { Button } from './ui/button'
import {  Prisma } from '@prisma/client'

type ProductWithCategory = Prisma.ProductGetPayload<{ include: { category: true } }>
function ProductRowCard({ product }: { product: ProductWithCategory }) {
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
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell className="hidden md:table-cell">{product.category.name}</TableCell>
            <TableCell className="hidden md:table-cell">{product.price} Dh</TableCell>
            <TableCell className="hidden sm:table-cell">In Stock</TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                            <MoveHorizontalIcon className="w-4 h-4" />
                            <span className="sr-only">Actions</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}

export default ProductRowCard

function MoveHorizontalIcon(props: { className: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="18 8 22 12 18 16" />
            <polyline points="6 8 2 12 6 16" />
            <line x1="2" x2="22" y1="12" y2="12" />
        </svg>
    )
}
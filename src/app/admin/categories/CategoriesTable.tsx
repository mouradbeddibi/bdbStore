export const dynamic = "force-dynamic"

import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

import { FilePenIcon, TrashIcon } from "lucide-react"
import { getCategories } from "@/lib/prismaUtils"
import {DeleteCategoryModal} from "./DeleteCategoryModal"

async function CategoriesTable() {
    const categories = await getCategories()
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((category) => (
                    <TableRow key={category.id}>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{category._count.products}</TableCell>

                        <TableCell>
                            <DeleteCategoryModal categoryId={category.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default CategoriesTable
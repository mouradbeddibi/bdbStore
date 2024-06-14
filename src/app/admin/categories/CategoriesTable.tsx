
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

import { FilePenIcon, TrashIcon } from "lucide-react"
import { getCategories } from "@/lib/prismaUtils"
import { Category } from "@prisma/client"

async function getData() {
    const res = await fetch('http://localhost:3000/api/admin/categories',{ next: { revalidate: 1 } })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
async function CategoriesTable() {
    const data = await getData()
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
                {data.map((category: any) => (
                    <TableRow key={category.id}>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{category._count.products}</TableCell>

                        <TableCell>
                            <Button variant="ghost" size="icon">
                                <FilePenIcon className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon">
                                <TrashIcon className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default CategoriesTable
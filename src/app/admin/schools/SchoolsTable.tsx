export const dynamic = "force-dynamic"


import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"


import { getSchools } from "@/lib/prismaUtils"

import Link from "next/link"
import DeleteSchoolModal from "./DeleteSchoolModal"

async function SchoolsTable() {
    const schools = await getSchools()
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Listes</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {schools.map((school) => (
                    <TableRow key={school.id}>
                        <TableCell><Link href={`/admin/schools/${school.formattedName}`}>{school.name}</Link></TableCell>
                        <TableCell>{school._count.listes}</TableCell>

                        <TableCell>
                            <DeleteSchoolModal schoolId={school.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default SchoolsTable
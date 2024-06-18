import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { getListesBySchoolName } from "@/lib/prismaUtils";
import Link from "next/link";
import DeleteListeModal from "./DeleteListeModal";
import { Badge } from "@/components/ui/badge";


async function ListesTable({ schoolWithListes, schoolName }: {
    schoolWithListes: {
        id: string;
        name: string;
        listes: {
            id: string;
            name: string;
            price: number;
            isVisible: boolean;
            productCount: number;
            formattedName: string;
        }[];
    },
    schoolName: string
}) {
    const { listes } = schoolWithListes;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Product Count</TableHead>
                    <TableHead>Is Visible</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {listes.map((liste) => (
                    <TableRow key={liste.id}>
                        <TableCell>
                            <Link href={`/admin/schools/${schoolName}/listes/${liste.formattedName}`}>{liste.name}</Link>
                        </TableCell>
                        <TableCell>{liste.price} DH</TableCell>
                        <TableCell>{liste.productCount}</TableCell>
                        <TableHead><Badge variant={liste.isVisible ? "default" : "destructive"}>{liste.isVisible ? 'Yes' : 'No'}</Badge></TableHead>

                        <TableCell>
                            <DeleteListeModal ListeId={liste.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default ListesTable;

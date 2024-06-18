import { getListesBySchoolName } from "@/lib/prismaUtils";
import CreateListeDialog from "./CreateListeModal"
import ListesTable from "./ListesTable"
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const dynamic = 'force-dynamic'


export default async function Component({ params }: { params: { schoolName: string } }) {
    const schoolWithListes = await getListesBySchoolName(params.schoolName);
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <Link href={"/admin/schools"} className={buttonVariants({ size: "sm", variant: "destructive" })}>
                    <ArrowLeft className="mr-2" />
                    Back
                </Link>
                <h1 className="text-2xl font-bold">{params.schoolName}</h1>
                <CreateListeDialog schoolId={schoolWithListes.id} />
            </div>

            <div className="overflow-x-auto">
                <ListesTable schoolWithListes={schoolWithListes} schoolName={params.schoolName} />
            </div>

        </div>
    )
}

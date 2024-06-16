import { getListesBySchoolName } from "@/lib/prismaUtils";
import CreateListeDialog from "./CreateListeModal"
import ListesTable from "./ListesTable"

export const dynamic = 'force-dynamic'


export default async function Component({ params }: { params: { schoolName: string } }) {
    const schoolWithListes = await getListesBySchoolName(params.schoolName);
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">{params.schoolName}</h1>
                <CreateListeDialog schoolId={schoolWithListes.id} />
            </div>

            <div className="overflow-x-auto">
                <ListesTable schoolWithListes={schoolWithListes} />
            </div>

        </div>
    )
}

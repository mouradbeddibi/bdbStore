export const dynamic = 'force-dynamic'

import CreateSchoolDialog from "./NewSchoolDialog"
import SchoolsTable from "./SchoolsTable"

export default function Component() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Schools</h1>
                <CreateSchoolDialog />
            </div>

            <div className="overflow-x-auto">
                <SchoolsTable />
            </div>

        </div>
    )
}


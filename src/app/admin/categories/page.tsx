export const dynamic = 'force-dynamic'

import { auth } from "@/auth"
import CategoriesTable from "./CategoriesTable"
import DialogForm from "./CategoryDialog"

export  default async function Component() {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        return <h1>Not Authorised</h1>
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Product Categories</h1>
                <DialogForm />
            </div>

            <div className="overflow-x-auto">
                <CategoriesTable />
            </div>

        </div>
    )
}


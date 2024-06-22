export const dynamic = 'force-dynamic'

import Link from "next/link"
import EditProductForm from "./EditProductForm"
import { getCategories, getProductById, getSubCategories } from "@/lib/prismaUtils"
import { buttonVariants } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { auth } from "@/auth"

export default async function EditProduct({ params }: { params: { id: string } }) {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        return <h1>Not Authorised</h1>
    }
    const product = await getProductById(params.id)
    const categories = await getCategories()
    const subCategories = await getSubCategories()
    if (product) {
        return (
            <div className="flex flex-col h-full">
                <header className="bg-gray-100 dark:bg-gray-800 px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="container mx-auto flex items-center justify-between">
                        <Link href={"/admin/products"} className={buttonVariants({ size: "sm", variant: "destructive" })}>
                            <ArrowLeft className="mr-2" />
                            Back
                        </Link>
                        <h1 className="text-2xl font-bold">Edit Product</h1>
                    </div>
                </header>
                <div className="flex-1 container mx-auto grid md:grid-cols-2 gap-8 p-4 md:p-6">

                    <EditProductForm product={product} categories={categories} subCategories={subCategories}/>
                </div>
            </div>
        )
    }
    else {
        return <h1>
            No product found for this Id
        </h1>
    }
}
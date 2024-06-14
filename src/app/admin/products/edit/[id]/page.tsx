
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "@/app/config"
import EditProductForm from "./EditProductForm"
import { getCategories, getProductById } from "@/lib/prismaUtils"
import { Product } from "@prisma/client"


export default async function EditProduct({ params }: { params: { id: string } }) {
    const product = await getProductById(params.id)
    const categories = await getCategories()
    if (product) {
        return (
            <div className="flex flex-col h-full">
                <header className="bg-gray-100 dark:bg-gray-800 px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="container mx-auto flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Edit Product</h1>
                    </div>
                </header>
                <div className="flex-1 container mx-auto grid md:grid-cols-2 gap-8 p-4 md:p-6">

                    <EditProductForm product={product} categories={categories} />
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
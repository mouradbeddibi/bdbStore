"use client"
import { storage } from "@/app/config"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { deleteCategory, deleteProduct } from "@/lib/prismaUtils"
import { deleteObject, ref } from "firebase/storage"
import { TrashIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DeletProductModal({ productId, productImg }: { productId: string, productImg: string }) {
    const router = useRouter()

    const onClick = async () => {
        const fileRef = ref(storage, productImg)
        await deleteObject(fileRef)
        await deleteProduct(productId)
        router.refresh()
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete this Product with it{"'"}s image.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <Button variant={"destructive"} onClick={onClick}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}


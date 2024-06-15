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
import { toast } from "sonner"

export default function DeletProductModal({ productId, productImg }: { productId: string, productImg: string }) {
    const router = useRouter()

    const onClick = async () => {
        try {
            // Delete product
            await deleteProduct(productId);
            toast.success("Product Deleted");

            // Delete product image
            const fileRef = ref(storage, productImg);
            await deleteObject(fileRef);

            // Refresh router after deletion
            router.refresh();

        } catch (error:any) {
            if (error.code === 'not-found') {
                toast.error("Product or Product Image not found. Deletion failed.");
            } else {
                toast.error("Failed to delete product or product image.");
                console.error("Error deleting product or product image:", error);
            }
        }

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


"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {  deleteListe } from "@/lib/prismaUtils"
import { TrashIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

function DeleteListeModal({ ListeId }: { ListeId: string }) {
    const router = useRouter()
    const onClick = async () => {
        try {
            await deleteListe(ListeId)
            router.refresh()
            toast.success("Liste  Deleted Successfully From Database")
        } catch (error) {
            console.log("error")
            toast.error("Liste Deletion Failed")
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
                        This action cannot be undone. This will permanently delete this Liste.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <Button variant={"destructive"} onClick={onClick}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default DeleteListeModal

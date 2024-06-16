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
import {  deleteSchool } from "@/lib/prismaUtils"
import { TrashIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

function DeleteSchoolModal({ schoolId }: { schoolId: string }) {
    const router = useRouter()
    const onClick = async () => {
        try {
            await deleteSchool(schoolId)
            router.refresh()
            toast.success("School with it's Listes Deleted Successfully From Database")
        } catch (error) {
            console.log("error")
            toast.error("School Deletion Failed")
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
                        This action cannot be undone. This will permanently delete this School with it{"'"}s listes.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <Button variant={"destructive"} onClick={onClick}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default DeleteSchoolModal

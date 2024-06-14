import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FilePenIcon, TrashIcon } from "lucide-react"
import CategoriesTable from "./CategoriesTable"
import DialogForm from "./CategoryDialog"

export default function Component() {



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



"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createSubCategory } from "@/lib/prismaUtils"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const CategoryformSchema = z.object({
    subcategoryName: z.string().min(4, {
        message: "subcategory Name must be at least 4 characters.",
    }),
})

function CreateSubCategoryDialog({ categoryName }: { categoryName: string }) {
    const router = useRouter()
    const form = useForm<z.infer<typeof CategoryformSchema>>({
        resolver: zodResolver(CategoryformSchema),
        defaultValues: {
            subcategoryName: "",
        },
    })
    async function onSubmit(values: z.infer<typeof CategoryformSchema>) {
        try {
            await createSubCategory(values.subcategoryName, categoryName)
            router.refresh()
            toast.success("subCategory Created suuccessfully")
        } catch (error) {
            console.log(error)
            toast.error("subCategory wasn't created . try again!")
        }
    }
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)


    return (
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
                <Button>Create SubCategory</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create New SubCategory</DialogTitle>
                    <DialogDescription>Fill out the form to create a new product category.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="subcategoryName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Catgeory Name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the Subcategory of the products.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="mt-4">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button type="submit" >Create SubCategory</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateSubCategoryDialog

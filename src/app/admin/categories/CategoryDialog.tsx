
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createCategory } from "@/lib/prismaUtils"

const CategoryformSchema = z.object({
    categoryName: z.string().min(4, {
        message: "category Name must be at least 4 characters.",
    }),
})

function CategoryDialog() {
    const form = useForm<z.infer<typeof CategoryformSchema>>({
        resolver: zodResolver(CategoryformSchema),
        defaultValues: {
            categoryName: "",
        },
    })
    async function onSubmit(values: z.infer<typeof CategoryformSchema>) {
        await createCategory(values.categoryName)
    }
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)


    return (
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
                <Button>Create Category</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create New Category</DialogTitle>
                    <DialogDescription>Fill out the form to create a new product category.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="categoryName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Catgeory Name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the category of the products.
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
                            <Button type="submit" >Create Category</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CategoryDialog

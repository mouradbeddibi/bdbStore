"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {  createSchool } from "@/lib/prismaUtils"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const CategoryformSchema = z.object({
    schoolName: z.string().min(4, {
        message: "category Name must be at least 4 characters.",
    }),
})

function CreateSchoolDialog() {
    const router = useRouter()
    const form = useForm<z.infer<typeof CategoryformSchema>>({
        resolver: zodResolver(CategoryformSchema),
        defaultValues: {
            schoolName: "",
        },
    })
    async function onSubmit(values: z.infer<typeof CategoryformSchema>) {
        try {
            await createSchool(values.schoolName)
            router.refresh()
            toast.success("School Created suuccessfully")
        } catch (error) {
            console.log(error)
            toast.error("School wasn't created . try again!")
        }
    }
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)


    return (
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
                <Button>Create School</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create New School</DialogTitle>
                    <DialogDescription>Fill out the form to create a new School.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="schoolName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>School Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="School Name" {...field} />
                                    </FormControl>
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
                            <Button type="submit" >Create School</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateSchoolDialog

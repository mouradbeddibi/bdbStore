
"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createListe } from "@/lib/prismaUtils"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const CategoryformSchema = z.object({
    ListeName: z.string().min(4, {
        message: "category Name must be at least 4 characters.",
    }),
})

function CreateListeDialog({ schoolId }: { schoolId: string }) {
    const router = useRouter()
    const form = useForm<z.infer<typeof CategoryformSchema>>({
        resolver: zodResolver(CategoryformSchema),
        defaultValues: {
            ListeName: "",
        },
    })
    async function onSubmit(values: z.infer<typeof CategoryformSchema>) {
        try {
            await createListe(values.ListeName, schoolId)
            router.refresh()
            toast.success("Liste Created suuccessfully")
        } catch (error) {
            console.log(error)
            toast.error("Liste wasn't created . try again!")
        }
    }
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)


    return (
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
                <Button>Create Liste</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create New Liste</DialogTitle>
                    <DialogDescription>Fill out the form to create a new Liste.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="ListeName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Liste Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Liste Name" {...field} />
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
                            <Button type="submit" >Create Category</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateListeDialog

"use client"
import { Button, buttonVariants } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Category } from '@prisma/client'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '@/app/config'
import { Progress } from '@/components/ui/progress'
import { createProduct } from '@/lib/prismaUtils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const productFormSchema = z.object({
    productName: z.string().min(2, {
        message: "productName must be at least 4 characters.",
    }),
    productPrice: z.string().min(1, {
        message: "ProductPrice must not be 0",
    }),
    productStock: z.string().min(1, {
        message: "product stock can't be less than 1"
    }),
    productCategoryId: z.string({
        required_error: "Please select an email to display.",
    })
})

function ProductForm({ categories }: { categories: Category[] }) {
    const router = useRouter()
    const [file, setFile] = useState<File | null>(null)
    const [uploadProgress, setUploadProgress] = useState(0);
    const [downloadUrl, setDownloadUrl] = useState("")
    const [loading, setLoading] = useState<boolean>(false)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0])
        }
    };

    const handleUpload = (event:any) => {
        event.preventDefault();
        if (!file) return;
        const fileRef = ref(storage, `productImages/${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setUploadProgress(progress)
            },
            (error) => {
                console.error("Error Uploading File:", error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setDownloadUrl(downloadUrl)
                })
            }
        )
    }
    const form = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            productName: "",
            productCategoryId: "",
            productPrice: "",
            productStock: "",
        },
    })
    async function onSubmit(values: z.infer<typeof productFormSchema>) {
        setLoading(true)
        downloadUrl && await createProduct(values, downloadUrl);
        setLoading(false)
        router.push('/admin/products')
    }
    return (
        <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="productName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Product Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="productCategoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Product Category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                categories.map((category) => <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                                )
                                            }
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="productPrice"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input placeholder="Product Price" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="productStock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Inventory</FormLabel>
                                <FormControl>
                                    <Input placeholder="Product Stock" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                <div className="grid gap-2">
                    <Label htmlFor="image">Image</Label>
                    <div className='flex gap-10'>
                        <Input id="image" type="file" onChange={handleFileChange} />
                        <Button onClick={handleUpload}> Upload</Button>
                    </div>
                    {!downloadUrl && uploadProgress > 0 && (<Progress value={uploadProgress} max={100} />)}
                    {downloadUrl && <h1 className='text-green-500'>uploded successfully</h1>}

                </div>
                <div className="flex justify-between mt-10">
                    <Link href="/admin/products" className={buttonVariants({variant:"destructive"})}>Cancel</Link>
                    <Button type="submit">Create Product {loading && <Loader2 className='ml-2 animate-spin' />}</Button>
                </div>


            </form>
        </Form>
    )
}

export default ProductForm
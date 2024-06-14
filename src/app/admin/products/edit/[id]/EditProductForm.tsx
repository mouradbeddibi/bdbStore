
"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { Progress } from "@/components/ui/progress"
import { storage } from "@/app/config"
import { Category, Prisma } from "@prisma/client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateProduct } from "@/lib/prismaUtils"
import { Loader2 } from "lucide-react"


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
type ProductWithCategory = Prisma.ProductGetPayload<{ include: { category: true } }>

export default function EditProductForm({ product, categories }: {
  product: ProductWithCategory,
  categories: Category[]
}) {
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

  const handleUpload = (event: any) => {
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
      productName: product.name,
      productCategoryId: product.categoryId,
      productPrice: product.price + "",
      productStock: product.stock + "",
    }
  })

  const onSubmit = async (values: z.infer<typeof productFormSchema>) => {
    setLoading(true)
    await updateProduct(product.id, values, downloadUrl ? downloadUrl : product.image);
    setLoading(false)
    router.push('/admin/products')
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <img
          src={downloadUrl || product.image} // Show downloadUrl if it exists, otherwise show product.image
          alt="Product Image"
          width={500}
          height={500}
          className="rounded-lg w-full max-w-[400px] object-cover"
        />
      </div>
      <Form {...form}>
        <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
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
          <FormField
            control={form.control}
            name="productCategoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={"Select a Product Category"} />
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

          <div className="grid md:grid-cols-2 gap-6">
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
              <Button onClick={handleUpload}>Upload</Button>
            </div>
            {!downloadUrl && uploadProgress > 0 && (<Progress value={uploadProgress} max={100} />)}
            {downloadUrl && <h1 className='text-green-500'>Uploaded successfully</h1>}
          </div>
          <Button className="w-full md:w-auto" type="submit">Save Changes{loading && <Loader2 className='ml-2 animate-spin' />}</Button>
        </form>
      </Form>
    </>
  )
}

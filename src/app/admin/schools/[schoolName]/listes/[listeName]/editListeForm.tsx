"use client"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState } from "react"
import { Loader2, PlusIcon, XIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Product } from "@prisma/client"
import { addProductToListe, removeProductFromListe, updateListeName } from "@/lib/prismaUtils"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


const productFormSchema = z.object({
    ListeName: z.string().min(2, {
        message: "Liste Name must be at least 4 characters.",
    }),
})
export default function EditListeForm({ listeName, products, listesProducts, schoolName }: {
    listeName: string, products: Product[], listesProducts: Product[], schoolName: string
}) {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            ListeName: listeName,
        }
    })
    const onSubmit = async (values: z.infer<typeof productFormSchema>) => {
        try {
            setLoading(true)
            await updateListeName(listeName, values.ListeName)
            toast.success("Liste Saved")
            router.push(`/admin/schools/${schoolName}`)
        } catch (error) {

        }
    }
    const totalPrice = 0

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="space-y-4">

                <div className="space-y-2">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} listeName={listeName} />
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <Form {...form}>
                    <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="ListeName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Liste Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full md:w-auto" type="submit">Save Changes{loading && <Loader2 className='ml-2 animate-spin' />}</Button>
                    </form>
                </Form>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Cart Items</h2>
                    <div className="flex items-center justify-between">
                        <p>Total: ${totalPrice.toFixed(2)}</p>
                    </div>
                </div>
                <div className="space-y-2">
                    {listesProducts.map((product) => (
                        <ListeProductCard key={product.id} listeName={listeName} product={product}/>
                    ))}
                </div>
            </div>



        </div>
    )
}

const ProductCard = ({ listeName, product }: { listeName: string, product: Product }) => {
    const [isloading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    const handleClick = async () => {
        try {
            setIsLoading(true)
            await addProductToListe(listeName, product.id)
            toast.success("product added to list")
            router.refresh()
            setIsLoading(false)

        } catch (error) {
            console.log(error)
            toast.error("ERROR : product was not added")
            router.refresh()
        }
    }
    return (
        <Card key={product.id} className="flex items-center justify-between p-2">
            <div className="flex items-center gap-4">
                <img
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                />
                <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-gray-500">${product.price}</p>
                </div>
            </div>
            <Button disabled={isloading} size="icon" variant="outline" >

                {isloading ? <Loader2 className="animate-spin" /> : <PlusIcon className="h-4 w-4" onClick={handleClick} />}
            </Button>
        </Card>
    )
}

const ListeProductCard = ({ product, listeName }: { product: Product, listeName: string }) => {
    const [isloading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    const handleClick = async () => {
        try {
            setIsLoading(true)
            await removeProductFromListe(listeName, product.id)
            toast.success("product removed from list")
            router.refresh()
            setIsLoading(false)

        } catch (error) {
            console.log(error)
            toast.error("ERROR : product was not removed")
            router.refresh()
        }
    }
    return (
        <Card key={product.id} className="flex items-center justify-between p-2">

            <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-500">${product.price}</p>
            </div>

            <Button disabled={isloading} size="icon" variant="outline" >

                {isloading ? <Loader2 className="animate-spin" /> : <XIcon className="h-4 w-4" onClick={handleClick} />}
            </Button>
        </Card>
    )
}


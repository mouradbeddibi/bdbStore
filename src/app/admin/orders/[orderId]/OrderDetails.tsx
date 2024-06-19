"use client"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Loader2, PackageIcon, PhoneIcon } from 'lucide-react'
import { OrderDetails, updateOrderSatus } from "@/lib/prismaUtils"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { OrderStatus } from "@prisma/client"
import { useState } from "react"
import { toast } from "sonner"

const FormSchema = z.object({
    status: z
        .string({
            required_error: "Please select a status to display.",
        })
})

function OrderDetailsForm({ orderDetails, orderId }: { orderDetails: OrderDetails, orderId: string }) {
    const [isloading, setIsloading] = useState<boolean>(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            status: orderDetails.status
        }
    })
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsloading(true)
        console.log(isloading)
        try {
            await updateOrderSatus(orderId, data.status as OrderStatus)
            toast.success(`order status updated to ${data.status}`)
            setIsloading(false)
        } catch (error) {
            toast.error(`order status Not updated`)

        }
    }
    const statuses = ["Confirmed", "Pending", "Delivered", "Processing", "Cancelled", "Ready_for_Delivery"]
    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Order #{orderDetails.orderNumber}</h1>
                    <p className="text-muted-foreground">Placed on {orderDetails.date.toDateString()} / {orderDetails.date.toLocaleTimeString()}</p>
                </div>
                <div className="flex items-center gap-2">
                    <PhoneIcon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">{orderDetails.phoneNumber}</span>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Products</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Category</TableHead>

                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orderDetails.products.map(product =>
                                        <TableRow key={product.productId}>
                                            <TableCell>{product.productName}</TableCell>
                                            <TableCell>{product.categoryName}</TableCell>

                                            <TableCell>{product.quantity}</TableCell>
                                            <TableCell>{product.price * product.quantity}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <span>Name</span>
                                    <span>{orderDetails.orderName}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Phone Number</span>
                                    <span>{orderDetails.phoneNumber}</span>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between font-medium">
                                    <span>Total</span>
                                    <span>{orderDetails.price} DH</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="flex items-center justify-between gap-5">
                                <div className="flex items-center gap-2">
                                    <PackageIcon className="w-5 h-5 text-muted-foreground" />
                                    <span className="font-medium">Order Status:</span>
                                </div>
                                <Form {...form} >
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-5">
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>

                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a status to display" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {statuses.map((status, index) => <SelectItem key={index} value={status}>{status}</SelectItem>)}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" disabled={isloading}>Submit{isloading && <Loader2 className="animate-spin ml-2" />}</Button>
                                    </form>
                                </Form>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailsForm

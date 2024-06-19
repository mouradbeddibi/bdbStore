"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@prisma/client';
import { ProductWithCategory } from '../admin/products/edit/[id]/EditProductForm';
import { toast } from 'sonner';
import { Loader2, XIcon } from 'lucide-react';
import { z } from "zod"
import validator from "validator";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import { addOrderItems, createOrder } from '@/lib/prismaUtils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface OrderItem {
    id?: string;
    orderId?: string;
    productId: string;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface Props {
    products: ProductWithCategory[];
}



const OrderFormSchema = z.object({
    name: z.string().min(4, { message: "name can't be less than 4 letters" }),
    phone: z.string().refine(validator.isMobilePhone)
})


const OrderPage: React.FC<Props> = ({ products }) => {
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [isloading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof OrderFormSchema>>({
        resolver: zodResolver(OrderFormSchema),
        defaultValues: {
            name: "",
            phone: ""
        },
    })
    const onSubmit = async (values: z.infer<typeof OrderFormSchema>) => {
        setIsLoading(true)
        try {

            const totalPrice = calculateTotalPrice()
            const order = await createOrder(values.name, values.phone, totalPrice)
            await addOrderItems(order.id, orderItems)
            toast.success("order created successfully")
            setOrderItems([])
            setIsLoading(false)
        } catch (error) {
            toast.error("Error while creating your order plese try again later!")
            setIsLoading(false)

        }
    }
    const addToOrder = (product: Product) => {
        const existingOrderItem = orderItems.find(item => item.productId === product.id);

        if (existingOrderItem) {
            console.log(orderItems)
            const updatedOrderItems = orderItems.map(item =>
                item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setOrderItems(updatedOrderItems);
        } else {
            console.log(orderItems)

            const newOrderItem: OrderItem = {
                productId: product.id,
                quantity: 1,
            };

            setOrderItems([...orderItems, newOrderItem]);
        }
    };

    const removeFromOrder = (productId: string) => {
        const updatedOrderItems = orderItems.map(item =>
            item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0);

        setOrderItems(updatedOrderItems);
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        orderItems.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                totalPrice += item.quantity * product.price;
            }
        });
        return totalPrice;
    };


    const groupProductsByCategory = () => {
        const groupedProducts: { [key: string]: Product[] } = {};
        products.forEach((product) => {
            const categoryId = product.category.id;
            if (groupedProducts[categoryId]) {
                groupedProducts[categoryId].push(product);
            } else {
                groupedProducts[categoryId] = [product];
            }
        });
        return groupedProducts;
    };

    const groupedProducts = groupProductsByCategory();

    return (
        <div className="flex h-screen">
            <ScrollArea className="w-3/4 h-screen  rounded-md border p-4">

                {Object.keys(groupedProducts).map((categoryId) => (
                    <div key={categoryId}>
                        <h2 className="text-lg font-bold mb-2">{products.find(p => p.category.id === categoryId)?.category.name}</h2>
                        <div className="grid grid-cols-5 gap-2">
                            {groupedProducts[categoryId].map((product, index) => (
                                <ProductCard key={index} product={product} addToOrder={addToOrder} />
                            ))}
                        </div>
                    </div>
                ))}
            </ScrollArea>
            <ScrollArea className="w-1/4 h-screen  rounded-md border p-4">



                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is Your Name
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="0606060606" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is Your Phone Number
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <h3 className="my-2 text-sm font-semibold">Total Price: {calculateTotalPrice()} DH</h3>

                        <Button type="submit" className="bg-green-500 text-white px-2 py-1 text-xs w-full font-black" variant={'secondary'} disabled={isloading}>
                            Create Order{isloading && <Loader2 className='ml-2 animate-spin' />}
                        </Button>
                    </form>
                </Form>

                <h2 className="text-lg font-bold mb-2">Order Items</h2>
                <ul className="text-xs">
                    {orderItems.map((item, index) => (
                        <li key={index} className="mb-1">
                            <ListeProductCard
                                price={products.find(p => p.id === item.productId)?.price}
                                name={products.find(p => p.id === item.productId)?.name}
                                item={item}
                                removeFromOrder={removeFromOrder}
                            />
                        </li>
                    ))}
                </ul>
            </ScrollArea>
        </div>
    );
};

export default OrderPage;

const ProductCard: React.FC<{ product: Product; addToOrder: (product: Product) => void }> = ({ product, addToOrder }) => {
    return (
        <Card className="p-1">
            <CardContent className="overflow-visible p-0 flex justify-center items-center">
                <img alt={product.name} className="object-cover h-[80px] max-w-full" src={product.image} />
            </CardContent>
            <CardFooter className="text-small flex flex-col justify-between items-center p-1">
                <div className="flex justify-between w-full text-xs">
                    <b>{product.name}</b>
                    <p className="text-default-500">${product.price}</p>
                </div>
                <Button onClick={() => addToOrder(product)} className="mt-1 w-full bg-blue-500 text-white px-2 py-1 text-xs">
                    Add to Order
                </Button>
            </CardFooter>
        </Card>
    );
};

const ListeProductCard = ({ item, name, price, removeFromOrder }: { item: OrderItem, name: string | undefined, price: number | undefined, removeFromOrder: (productId: string) => void }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            removeFromOrder(item.productId);
        } catch (error) {
            console.error("Error removing product from list:", error);
            toast.error("Failed to remove product from list");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="flex items-center justify-between p-2">
            <div className="flex flex-col justify-between">
                <h3 className="font-semibold">{name}</h3>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <p className="text-gray-500">{price && item.quantity * price} DH</p>
            <Button disabled={isLoading} size="icon" variant="outline" onClick={handleClick}>
                {isLoading ? <Loader2 className="animate-spin" /> : <XIcon className="h-4 w-4" />}
            </Button>
        </Card>
    );
};

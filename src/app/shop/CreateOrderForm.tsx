"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@prisma/client';
import { ProductWithCategory } from '../admin/products/edit/[id]/EditProductForm';
import { toast } from 'sonner';
import { Loader2, ShoppingBag, XIcon } from 'lucide-react';
import { z } from "zod";
import validator from "validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { addOrderItems, createOrder } from '@/lib/prismaUtils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from '@/components/ui/separator';

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
    name: z.string().min(4, { message: "Name can't be less than 4 letters" }),
    phone: z.string().refine(validator.isMobilePhone, { message: "Invalid phone number" })
});

const OrderPage: React.FC<Props> = ({ products }) => {
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof OrderFormSchema>>({
        resolver: zodResolver(OrderFormSchema),
        defaultValues: {
            name: "",
            phone: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof OrderFormSchema>) => {
        setIsLoading(true);
        try {
            const totalPrice = calculateTotalPrice();
            const order = await createOrder(values.name, values.phone, totalPrice);
            await addOrderItems(order.id, orderItems);
            toast.success("Order created successfully");
            setOrderItems([]);
            router.push(`/shop/${order.id}`);
        } catch (error) {
            toast.error("Error while creating your order, please try again later!");
        } finally {
            setIsLoading(false);
        }
    };

    const addToOrder = (product: Product) => {
        setOrderItems(prevItems => {
            const existingOrderItem = prevItems.find(item => item.productId === product.id);
            if (existingOrderItem) {
                return prevItems.map(item =>
                    item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { productId: product.id, quantity: 1 }];
            }

        });
        toast.info(`${product.name} added to order`)
    };

    const removeFromOrder = (productId: string) => {
        setOrderItems(prevItems =>
            prevItems.map(item =>
                item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
            ).filter(item => item.quantity > 0)
        );
        toast.info("item removed from order")
    };

    const calculateTotalPrice = () => {
        return orderItems.reduce((total, item) => {
            const product = products.find(p => p.id === item.productId);
            return product ? total + item.quantity * product.price : total;
        }, 0);
    };

    const groupProductsByCategory = () => {
        return products.reduce((acc, product) => {
            const categoryId = product.category.id;
            if (!acc[categoryId]) {
                acc[categoryId] = [];
            }
            acc[categoryId].push(product);
            return acc;
        }, {} as { [key: string]: Product[] });
    };

    const groupedProducts = groupProductsByCategory();

    return (
        <div className="h-screen p-2">
            <Drawer>
                <DrawerTrigger asChild>
                    <ShoppingBag size={40} className='cursor-pointer' />
                </DrawerTrigger>
                <DrawerContent>
                    <ScrollArea className='px-4 lg:px-32 py-4 h-[400px]'>
                        <h2 className="text-lg font-bold mb-2">Order Items</h2>
                        {orderItems.length === 0 ? (
                            <h1 className='mb-20'>No Items</h1>
                        ) : (
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
                        )}
                        <Separator />
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='font-black'>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Name" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is your name
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
                                            <FormLabel className='font-black'>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input type="tel" placeholder="0606060606" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is your phone number
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <h3 className="my-2 text-sm font-semibold">Total Price: {calculateTotalPrice()} DH</h3>
                                <Button type="submit" className="bg-green-500 text-white px-2 py-1 text-xs w-full font-black" variant="secondary" disabled={isLoading}>
                                    Create Order{isLoading && <Loader2 className='ml-2 animate-spin' />}
                                </Button>
                            </form>
                        </Form>
                    </ScrollArea>
                </DrawerContent>
            </Drawer>

            <div className='my-2'>
                {Object.keys(groupedProducts).map((categoryId) => (
                    <div key={categoryId} className='border rounded-lg my-2'>
                        <h2 className="text-lg font-bold mb-2">{products.find(p => p.category.id === categoryId)?.category.name}</h2>
                        <ScrollArea className="w-96 md:w-full whitespace-nowrap ">
                            <div className="flex w-max space-x-4 p-1">
                                {groupedProducts[categoryId].map((product, index) => (
                                    <ProductCard key={index} product={product} addToOrder={addToOrder} />
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderPage;

const ProductCard: React.FC<{ product: Product; addToOrder: (product: Product) => void }> = ({ product, addToOrder }) => {
    return (
        <Card className="p-2 w-[180px] h-full border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 sm:w-[80%]">
            <CardContent className="overflow-hidden p-0 flex justify-center items-center h-[150px]">
                <Image alt={product.name} className="object-contain h-full w-full" width={200} height={200} src={product.image} />
            </CardContent>
            <CardFooter className="text-small flex flex-col justify-between items-center p-2 h-[100px]">
                <div className="flex justify-between w-full">
                    <span className='font-medium text-ellipsis overflow-hidden whitespace-nowrap'>{product.name}</span>
                    <span className="text-default-500 font-black ml-2">${product.price}</span>
                </div>
                <Button onClick={() => addToOrder(product)} className="mt-2 w-full text-white px-2 py-1 text-xs bg-green-500 hover:bg-green-600 transition-colors duration-200">
                    Add to Order
                </Button>
            </CardFooter>
        </Card>
    );
}

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
            <div className="flex flex-col justify-between flex-grow">
                <h3 className="font-semibold">{name}</h3>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <div className="flex items-center space-x-2">
                <p className="text-gray-500">{price && item.quantity * price} DH</p>
                <Button disabled={isLoading} size="icon" variant="outline" onClick={handleClick}>
                    {isLoading ? <Loader2 className="animate-spin" /> : <XIcon className="h-4 w-4" />}
                </Button>
            </div>
        </Card>
    );
};

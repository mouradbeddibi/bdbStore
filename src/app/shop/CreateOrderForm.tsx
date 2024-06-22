"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@prisma/client';
import { ProductWithCategory } from '../admin/products/edit/[id]/EditProductForm';
import { toast } from 'sonner';
import { Loader2, Minus, Plus, ShoppingCartIcon } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';

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
    const [selectedSubCategories, setSelectedSubCategories] = useState<{ [key: string]: string | null }>({});
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

    const addToOrder = (product: ProductWithCategory) => {
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
        toast.info("Item removed from order")
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
        }, {} as { [key: string]: ProductWithCategory[] });
    };

    const groupedProducts = groupProductsByCategory();

    const handleSubCategoryClick = (categoryId: string, subCategoryId: string | null) => {
        setSelectedSubCategories(prevState => ({
            ...prevState,
            [categoryId]: subCategoryId
        }));
    };

    return (
        <div className="h-screen">
            <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <div className="text-lg font-bold">My Shop</div>
                <Drawer>
                    <DrawerTrigger asChild>
                        <div className="relative py-2">
                            {orderItems.length > 0 && <div className="t-0 absolute left-3">
                                <Badge className="flex h-2 w-2 items-center justify-center p-2">{orderItems.length}</Badge>
                            </div>}
                            <ShoppingCartIcon size={30} className='cursor-pointer' />
                        </div>
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
                                                addToOrder={(productId) => {
                                                    const product = products.find(p => p.id === productId);
                                                    if (product) {
                                                        addToOrder(product);
                                                    }
                                                }}
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
            </nav>

            <div className='my-2'>
                {Object.keys(groupedProducts).map((categoryId) => (
                    <div key={categoryId} className='border rounded-lg my-2 px-2'>
                        <h2 className="text-2xl font-bold mb-2 px-2">{products.find(p => p.category.id === categoryId)?.category.name}</h2>
                        <div className='flex items-start gap-5'>
                            <Badge

                                onClick={() => handleSubCategoryClick(categoryId, null)}
                                className='cursor-pointer'
                            >
                                All
                            </Badge>
                            {Array.from(new Set(groupedProducts[categoryId].map(product => product.subCategory?.name))).map(subCategoryName => (
                                subCategoryName && (
                                    <Badge
                                        key={subCategoryName}
                                        onClick={() => handleSubCategoryClick(categoryId, products.find(p => p.subCategory?.name === subCategoryName)?.subCategory?.id || null)}
                                        className='cursor-pointer'
                                    >
                                        {subCategoryName}
                                    </Badge>
                                )
                            ))}
                        </div>
                        <ScrollArea className="w-96 md:w-full whitespace-nowrap">
                            <div className="flex w-max space-x-4 p-1">
                                {groupedProducts[categoryId].filter(product => selectedSubCategories[categoryId] ? product.subCategory?.id === selectedSubCategories[categoryId] : true).map((product, index) => (
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

const ProductCard: React.FC<{ product: ProductWithCategory; addToOrder: (product: ProductWithCategory) => void }> = ({ product, addToOrder }) => {
    return (
        <Card className="p-2 w-[180px] h-full border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ">
            <CardContent className="overflow-hidden p-0 flex justify-center items-center h-[150px]">
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <Image alt={product.name} className="object-contain" layout="fill" objectFit="contain" src={product.image} />
                </div>
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

const ListeProductCard = ({ item, name, price, removeFromOrder, addToOrder }: { item: OrderItem, name: string | undefined, price: number | undefined, removeFromOrder: (productId: string) => void, addToOrder: (productId: string) => void }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleRemoveClick = async () => {
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

    const handleAddClick = async () => {
        setIsLoading(true);
        try {
            addToOrder(item.productId);
        } catch (error) {
            console.error("Error adding product to list:", error);
            toast.error("Failed to add product to list");
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
                <Button disabled={isLoading} size="icon" variant="outline" onClick={handleRemoveClick}>
                    {isLoading ? <Loader2 className="animate-spin" /> : <Minus className="h-4 w-4" />}
                </Button>
                <Button disabled={isLoading} size="icon" variant="outline" onClick={handleAddClick}>
                    {isLoading ? <Loader2 className="animate-spin" /> : <Plus className="h-4 w-4" />}
                </Button>
            </div>
        </Card>
    );
};

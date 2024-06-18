"use client"
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState, useMemo } from "react";
import { ArrowLeft, Loader2, PlusIcon, XIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Product } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProductWithCategory } from "@/app/admin/products/edit/[id]/EditProductForm";
import { updateListeNameAndVisibility, updateListeWithItems } from "@/lib/prismaUtils";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

// Define schema for form validation
const productFormSchema = z.object({
    ListeName: z.string().min(2, {
        message: "Liste Name must be at least 2 characters.",
    }),
    isVisible: z.boolean()
});
type ListeItem = {
    id?: string;
    listeName: string;
    productId: string;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
};
type Props = {
    displayListeName: string;
    listeName: string;
    products: ProductWithCategory[];
    schoolName: string;
    initlisteItems: ListeItem[];
    initdisplayListeItems: DisplayListeItem[];
    isVisible: boolean;
};
export type DisplayListeItem = {
    productName: string;
    quantity: number;
    price: number;
}

export default function EditListeForm({ displayListeName, listeName, products, schoolName, initlisteItems, initdisplayListeItems,isVisible }: Props) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [listeItems, setListeItems] = useState<ListeItem[]>(initlisteItems);
    const [displayListeItems, setDisplayListeItems] = useState<DisplayListeItem[]>(initdisplayListeItems);

    const form = useForm({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            ListeName: displayListeName,
            isVisible: isVisible
        },
    });

    const onSubmit = async (values: z.infer<typeof productFormSchema>) => {
        try {
            setLoading(true);
            await updateListeWithItems(calculateTotalPrice, listeName, listeItems);
            await updateListeNameAndVisibility(listeName, values.ListeName, values.isVisible);
            toast.success("Liste Saved");
            router.push(`/admin/schools/${schoolName}`);
        } catch (error) {
            console.error("Error saving liste:", error);
            toast.error("Failed to save liste");
        } finally {
            setLoading(false);
        }
    };

    const calculateTotalPrice = useMemo(() => {
        return displayListeItems.reduce((total, item) => total + item.quantity * item.price, 0);
    }, [displayListeItems]);

    const groupedProducts = useMemo(() => {
        return products.reduce<Record<string, ProductWithCategory[]>>((acc, product) => {
            const categoryId = product.categoryId;
            if (!acc[categoryId]) {
                acc[categoryId] = [];
            }
            acc[categoryId].push(product);
            return acc;
        }, {});
    }, [products]);

    const handleProductClick = (product: Product) => {
        const existingItemIndex = listeItems.findIndex(item => item.productId === product.id);

        if (existingItemIndex !== -1) {
            const updatedListeItems = [...listeItems];
            const updatedDisplayListeItems = [...displayListeItems];
            updatedListeItems[existingItemIndex].quantity += 1;
            updatedDisplayListeItems[existingItemIndex].quantity += 1;
            setListeItems(updatedListeItems);
            setDisplayListeItems(updatedDisplayListeItems);
        } else {
            setListeItems([...listeItems, { productId: product.id, quantity: 1, listeName, }]);
            setDisplayListeItems([...displayListeItems, { productName: product.name, quantity: 1, price: product.price }]);
        }
    };

    const handleListeProductClick = (listeItem: DisplayListeItem) => {
        const existingItemIndex = displayListeItems.findIndex(item => item.productName === listeItem.productName);

        if (existingItemIndex !== -1) {
            const updatedListeItems = [...listeItems];
            const updatedDisplayListeItems = [...displayListeItems];

            if (updatedListeItems[existingItemIndex].quantity > 1) {
                updatedListeItems[existingItemIndex].quantity -= 1;
                updatedDisplayListeItems[existingItemIndex].quantity -= 1;
            } else {
                updatedListeItems.splice(existingItemIndex, 1);
                updatedDisplayListeItems.splice(existingItemIndex, 1);
            }

            setListeItems(updatedListeItems);
            setDisplayListeItems(updatedDisplayListeItems);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

            <div className="space-y-4">
                <Link href={`/admin/schools/${schoolName}`} className={buttonVariants({ size: "sm", variant: "destructive" })}>
                    <ArrowLeft className="mr-2" />
                    Back
                </Link>
                {Object.keys(groupedProducts).map((categoryId) => (
                    <div key={categoryId} className="space-y-4">
                        <h2 className="text-2xl font-bold">{groupedProducts[categoryId][0].category.name}</h2>
                        <div className="space-y-2">
                            {groupedProducts[categoryId].map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onProductClick={handleProductClick}
                                />
                            ))}
                        </div>
                    </div>
                ))}
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
                                    <Input placeholder="Liste Name" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isVisible"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            IsVisible
                                        </FormLabel>

                                    </div>
                                </FormItem>
                            )}
                        />
                        <Button className="w-full md:w-auto" type="submit">
                            Save Changes {loading && <Loader2 className="ml-2 animate-spin" />}
                        </Button>
                    </form>
                </Form>
                <p className="text-2xl font-bold">Total Price: {calculateTotalPrice} DH</p>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Cart Items</h2>
                    {displayListeItems.map((listeItem) => (
                        <ListeProductCard
                            key={listeItem.productName}
                            listeItem={listeItem}
                            onListeProductClick={handleListeProductClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

type ProductCardProps = {
    product: Product;
    onProductClick: (product: Product) => void;
};

const ProductCard = ({ product, onProductClick }: ProductCardProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            onProductClick(product);
            toast.success("Product added to list");
        } catch (error) {
            console.error("Error adding product to list:", error);
            toast.error("Failed to add product to list");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="flex items-center justify-between p-2">
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
                    <p className="text-gray-500">{product.price} DH</p>
                </div>
            </div>
            <Button disabled={isLoading} size="icon" variant="outline" onClick={handleClick}>
                {isLoading ? <Loader2 className="animate-spin" /> : <PlusIcon className="h-4 w-4" />}
            </Button>
        </Card>
    );
};

type ListeProductCardProps = {
    listeItem: DisplayListeItem;
    onListeProductClick: (listeItem: DisplayListeItem) => void;
};

const ListeProductCard = ({ listeItem, onListeProductClick }: ListeProductCardProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            onListeProductClick(listeItem);
            toast.success("Product removed from list");
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
                <h3 className="font-semibold">{listeItem.productName}</h3>
                <p className="text-gray-500">Quantity: {listeItem.quantity}</p>
            </div>
            <p className="text-gray-500">{listeItem.quantity * listeItem.price} DH</p>
            <Button disabled={isLoading} size="icon" variant="outline" onClick={handleClick}>
                {isLoading ? <Loader2 className="animate-spin" /> : <XIcon className="h-4 w-4" />}
            </Button>
        </Card>
    );
};







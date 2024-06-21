"use server"

import prisma from "@/utils/db"
import { Order, OrderStatus, Product } from "@prisma/client"

export const createCategory = async (name: string) => {
    const formattedName = name.replace(/\s+/g, '-'); // Replace spaces with dashes
    await prisma.category.create({
        data: {
            name: name,
            formattedName: formattedName

        }
    })
}
export const deleteCategory = async (id: string) => {
    await prisma.category.delete({
        where: { id }
    })
}
export const getCategories = async () => {
    const categories = await prisma.category.findMany({ include: { _count: true } })

    return categories
}
export const createProduct = async (values: {
    productName: string;
    productPrice: string;
    productStock: string;
    productCategoryId: string;
}, url: string) => {
    await prisma.product.create({
        data: {
            name: values.productName,
            price: Number(values.productPrice),
            stock: Number(values.productStock),
            image: url,
            categoryId: values.productCategoryId

        }
    })
}
export const getProductsWithPagination = async (skip: number, take: number, searchTerm?: string) => {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm, // Use the searchTerm to filter by product name
                mode: 'insensitive', // Optional: makes the search case-insensitive
            },
        },
        include: { category: true },
        orderBy: { updatedAt: "desc" },
        skip: skip,
        take: take,
    });

    const totalProducts = await prisma.product.count({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive',
            },
        },
    }); // Get the total count of products that match the search term

    return { products, totalProducts };
};


export const getProductsByCategory = async (formattedName: string) => {

    const products = await prisma.category.findUnique({ where: { formattedName: formattedName }, include: { products: true }, })
    return products

}




export const getProductById = async (productId: string) => {
    return await prisma.product.findUnique({ where: { id: productId }, include: { category: true } })
}
export const updateProduct = async (productId: string, values: {
    productName: string;
    productPrice: string;
    productStock: string;
    productCategoryId: string;
}, url: string) => {
    await prisma.product.update({
        where: { id: productId }, data: {
            categoryId: values.productCategoryId,
            image: url,
            stock: Number(values.productPrice),
            price: Number(values.productPrice),
            name: values.productName
        }
    })
}
export const deleteProduct = async (id: string) => {
    await prisma.product.delete({
        where: { id }
    })
}


export const getSchools = async () => {
    const schools = await prisma.school.findMany({ include: { _count: true } })

    return schools
}
export const createSchool = async (name: string) => {
    const formattedName = name.replace(/\s+/g, '-'); // Replace spaces with dashes
    await prisma.school.create({
        data: {
            name: name,
            formattedName: formattedName

        }
    })
}
export const deleteSchool = async (id: string) => {
    await prisma.school.delete({
        where: { id }
    })
}

export async function getListesBySchoolName(schoolName: string) {
    const schoolWithListes = await prisma.school.findUnique({
        where: {
            formattedName: schoolName,
        },
        select: {
            id: true,
            name: true,

            listes: {
                select: {
                    id: true,
                    name: true,
                    price: true,
                    isVisible: true, // Select isVisible field
                    formattedName: true,
                    listeItems: {
                        select: {
                            id: true,
                        },
                    },
                },
            },
        },
    });

    if (!schoolWithListes) {
        throw new Error(`School with name ${schoolName} not found`);
    }

    const listesWithProductCount = schoolWithListes.listes.map(liste => ({
        id: liste.id,
        name: liste.name,
        price: liste.price,
        isVisible: liste.isVisible, // Include isVisible in the mapped object
        productCount: liste.listeItems.length,
        formattedName: liste.formattedName
    }));

    return {
        id: schoolWithListes.id,
        name: schoolWithListes.name,
        listes: listesWithProductCount,
    };
}

export const deleteListe = async (id: string) => {
    await prisma.liste.delete({
        where: { id }
    })
}

export const createListe = async (name: string, schoolId: string) => {
    const formattedName = name.replace(/\s+/g, '-');
    await prisma.liste.create({
        data: {
            name: name,
            schoolId: schoolId,
            formattedName: formattedName
        }
    })
}

export const getProducts = async () => {
    const products = await prisma.product.findMany({ include: { category: true } })
    return products
}

export const updateListeNameAndVisibility = async (formattedName: string, name: string, isVisible: boolean) => {
    const nameFormattedName = name.replace(/\s+/g, '-');
    await prisma.liste.update({
        where: {
            formattedName: formattedName
        },
        data: {
            name: name,
            formattedName: nameFormattedName,
            isVisible: isVisible
        },

    });
}

export async function getListeWithItemsAndProducts(formattedName: string) {
    try {
        const liste = await prisma.liste.findUnique({
            where: {
                formattedName: formattedName,
            },
            include: {
                listeItems: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!liste) {
            throw new Error(`Liste with formattedName ${formattedName} not found`);
        }

        // Map the result to extract products
        const products = liste.listeItems.map(item => item.product);

        return {
            liste: {
                ...liste,
                listName: liste.name, // Include listName here
            },
            items: liste.listeItems,
            products: products,
        };
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export async function updateListeWithItems(totalPrice: number, formattedName: string, items: { productId: string; quantity: number }[]) {
    try {
        await prisma.$transaction(async (prisma) => {
            // Find the list to get its ID
            const liste = await prisma.liste.findUnique({
                where: { formattedName },
                select: { id: true },
            });

            if (!liste) {
                throw new Error(`Liste with formattedName ${formattedName} not found`);
            }

            // Delete existing items
            await prisma.listeItem.deleteMany({
                where: { listeName: formattedName },
            });

            // Add new items
            await prisma.liste.update({
                where: { formattedName },
                data: {
                    listeItems: {
                        create: items.map(item => ({
                            productId: item.productId,
                            quantity: item.quantity,
                        })),
                    },
                    price: totalPrice
                },
                include: {
                    listeItems: {
                        include: {
                            product: true,
                        },
                    },
                },
            });
        });

        // Fetch and return the updated list with its items
        const updatedListe = await prisma.liste.findUnique({
            where: { formattedName },
            include: {
                listeItems: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        return updatedListe;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const generateOrderNumber = (): string => {
    const timestamp = Date.now().toString().slice(-6) // Last 6 digits of the current timestamp
    const randomValue = Math.floor(Math.random() * 100000).toString().padStart(4, '0') // 4-digit random value
    return `${timestamp}${randomValue}` // Total length is 10 characters
}

export const createOrder = async (name: string, phone: string, price: number) => {
    const orderNumber = generateOrderNumber()
    const order = await prisma.order.create({
        data: {
            name: name,
            phoneNumber: phone,
            orderNumber: orderNumber,
            price: price
        }
    })
    return order
}

interface OrderItem {
    id?: string;
    orderId?: string;
    productId: string;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export async function addOrderItems(orderId: string, orderItems: OrderItem[]): Promise<Order | null> {
    try {
        // Fetch the order to ensure it exists
        const existingOrder = await prisma.order.findUnique({
            where: { id: orderId },
            include: { orderItems: true }, // Include existing orderItems if needed
        });

        if (!existingOrder) {
            throw new Error(`Order with id ${orderId} not found`);
        }

        // Create new orderItems
        const createdOrderItems = await Promise.all(orderItems.map(async (item) => {
            const createdOrderItem = await prisma.orderItem.create({
                data: {
                    ...item,
                    orderId: orderId,

                },
            });
            return createdOrderItem;
        }));

        // Update order with new orderItems
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: {
                orderItems: {
                    // Combine existing orderItems with newly created ones
                    create: createdOrderItems,
                },
            },
            include: { orderItems: true }, // Include orderItems in the returned order
        });

        return updatedOrder;
    } catch (error) {
        console.error('Error adding order items:', error);
        return null;
    }
}



export const getAllOrders = async () => {
    const orders = await prisma.order.findMany()
    return orders

}
type OrderProductDetails = {
    productId: string;
    productName: string;
    categoryId: string;
    categoryName: string;
    quantity: number;
    price: number;
};

export type OrderDetails = {
    orderNumber: string;
    orderName: string;
    price: number;
    date: Date;
    status: OrderStatus;
    phoneNumber: string;
    products: OrderProductDetails[];
};

export async function getOrderDetails(orderId: string): Promise<OrderDetails | null> {
    const order = await prisma.order.findUnique({
        where: { id: orderId },
        select: {
            orderNumber: true,
            price: true,
            name: true,
            updatedAt: true,
            orderStatus: true,
            phoneNumber: true,
            orderItems: {
                select: {
                    quantity: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            category: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    if (!order) {
        return null;
    }

    const orderDetails: OrderDetails = {
        orderNumber: order.orderNumber,
        orderName: order.name,
        phoneNumber: order.phoneNumber,
        price: order.price,
        date: order.updatedAt,
        status: order.orderStatus,
        products: order.orderItems.map(item => ({
            productId: item.product.id,
            productName: item.product.name,
            categoryId: item.product.category.id,
            categoryName: item.product.category.name,
            quantity: item.quantity,
            price: item.product.price
        })),
    };

    return orderDetails;
}
export const updateOrderSatus = async (orderId: string, orderStatus: OrderStatus) => {
    await prisma.order.update({ where: { id: orderId }, data: { orderStatus: orderStatus } })
}

export const deleteOrder = async (orderId: string) => {
    await prisma.order.delete({ where: { id: orderId } })
}


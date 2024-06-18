"use server"

import prisma from "@/utils/db"
import { Product } from "@prisma/client"

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
            isVisible:isVisible
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
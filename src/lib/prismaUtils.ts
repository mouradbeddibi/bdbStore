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
export const getProducts = async (skip: number, take: number, searchTerm?: string) => {
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
                    products: {
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
        productCount: liste.products.length,
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

    await prisma.liste.create({
        data: {
            name: name,
            schoolId: schoolId
        }
    })
}
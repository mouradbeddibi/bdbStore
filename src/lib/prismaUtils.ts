"use server"

import prisma from "@/utils/db"

export const createCategory = async (name: string) => {
    await prisma.category.create({
        data: {
            name: name
        }
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
export const getProducts = async () => {
    const products = await prisma.product.findMany({ include: { category: true } })
    return products
}
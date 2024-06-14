"use server"

import prisma from "@/utils/db"
import { Product } from "@prisma/client"

export const createCategory = async (name: string) => {
    await prisma.category.create({
        data: {
            name: name
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
export const getProducts = async () => {
    const products = await prisma.product.findMany({ include: { category: true } })
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
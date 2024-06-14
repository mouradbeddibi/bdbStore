import prisma from "@/utils/db"

export async function GET() {
    const categories = await prisma.category.findMany()
    return Response.json(categories)
}
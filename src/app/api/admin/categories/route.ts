export const dynamic = 'force-dynamic'
import prisma from "@/utils/db";
export async function GET() {
    const categories = await prisma.category.findMany({ include: { _count: true } })
    return Response.json(categories)

}
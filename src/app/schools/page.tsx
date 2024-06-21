import { getSchools } from "@/lib/prismaUtils"
import { School } from "@prisma/client"
import { SchoolCard } from "./SchoolCard"

export const dynamic = "force-dynamic"

export default async function Schools() {
  const schools = await getSchools()
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Schools</h1>
      {schools.map((school) => <SchoolCard key={school.id} school={school} schoolId={school.id} />)}
    </div>
  )
}


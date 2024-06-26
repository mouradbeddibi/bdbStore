export const dynamic = "force-dynamic"
import { getCategories, getSubCategories } from "@/lib/prismaUtils"
import ProductForm from "./ProductForm"
import { auth } from "@/auth"


const NewProductPage = async () => {
  const session = await auth()

  if (!session?.user || session.user.role !== "ADMIN") {
    return <h1>Not Authorised</h1>
  }
  const categories = await getCategories()
  const subCategries = await getSubCategories()

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div>
        <div>
          <div>
            <div>Create New Product</div>
            <div>Fill out the form to add a new product to your catalog.</div>
          </div>
          <div>
            <ProductForm categories={categories} subCategories={subCategries} />
          </div>

        </div>
      </div>
    </main>
  )
}
export default NewProductPage

const dynamic = "force-dynamic"
import { getCategories } from "@/lib/prismaUtils"
import ProductForm from "./_components/ProductForm"


const NewProductPage = async () => {
  const categories = await getCategories()

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div>
        <div>
          <div>
            <div>Create New Product</div>
            <div>Fill out the form to add a new product to your catalog.</div>
          </div>
          <div>
            <ProductForm categories={categories}/>
          </div>

        </div>
      </div>
    </main>
  )
}
export default NewProductPage

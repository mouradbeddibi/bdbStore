
import OrderPage from './CreateOrderForm'
import { getProducts } from '@/lib/prismaUtils'

export const dynamic = "force-dynamic";

async function page() {
  const products = await getProducts()
  return (
    <>
      <OrderPage products={products} />

    </>
  )
}

export default page

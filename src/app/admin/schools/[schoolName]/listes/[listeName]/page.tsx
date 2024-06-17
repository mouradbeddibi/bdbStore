import React from 'react'
import EditListeForm from './editListeForm'
import { getListeProducts, getProducts } from '@/lib/prismaUtils'
export const dynamic = "force-dynamic"

async function page({ params }: { params: { listeName: string, schoolName: string } }) {
    const products = await getProducts()
    const listesProducts = await getListeProducts(params.listeName)
    return (
        <div className='m-4'>

            <EditListeForm listeName={params.listeName} products={products} listesProducts={listesProducts} schoolName={params.schoolName}/>
        </div>
    )
}

export default page
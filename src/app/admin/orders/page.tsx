import React from 'react'
import OrdersTable from './OrdersTable'
import { getAllOrders } from '@/lib/prismaUtils'

export const dynamic = "force-dynamic"

async function AdminOrdersPage() {
    const orders = await getAllOrders()
    return (

        < main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6" >
            <div className="border shadow-sm rounded-lg p-2">
                <OrdersTable orders={orders}/>
            </div>
        </main >


    )
}

export default AdminOrdersPage


import { getOrderDetails } from "@/lib/prismaUtils"
import OrderDetailsForm from "./OrderDetails"
export const dynamic = "force-dynamic"


export default async function OrderDetail({ params }: { params: { orderId: string } }) {
    const orderDetails = await getOrderDetails(params.orderId)
    if (orderDetails) {

        return (
            <OrderDetailsForm orderDetails={orderDetails} orderId={params.orderId} />
        )
    } else {
        return <h1 className="text-center text-3xl">Order Not Found</h1>
    }
}


import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { PackageIcon, PhoneIcon } from 'lucide-react'
import { getOrderDetails } from "@/lib/prismaUtils"

async function OrderDetailsPage({ params }: { params: { orderId: string } }) {
    const orderDetails = await getOrderDetails(params.orderId)

    if (orderDetails) {
        return (
            <div className="container mx-auto px-4 md:px-6 py-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Order #{orderDetails.orderNumber}</h1>
                        <p className="text-muted-foreground">Placed on {orderDetails.date.toLocaleDateString()} - {orderDetails.date.toLocaleTimeString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <PhoneIcon className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">{orderDetails.phoneNumber}</span>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Products</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product</TableHead>
                                            <TableHead>Category</TableHead>

                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Price</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orderDetails.products.map(product =>
                                            <TableRow key={product.productId}>
                                                <TableCell>{product.productName}</TableCell>
                                                <TableCell>{product.categoryName}</TableCell>

                                                <TableCell>{product.quantity}</TableCell>
                                                <TableCell>{product.price * product.quantity}</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <span>Name</span>
                                        <span>{orderDetails.orderName}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Phone Number</span>
                                        <span>{orderDetails.phoneNumber}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between font-medium">
                                        <span>Total</span>
                                        <span>{orderDetails.price} DH</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex items-center justify-between gap-5">
                                    <div className="flex items-center gap-2">
                                        <PackageIcon className="w-5 h-5 text-muted-foreground" />
                                        <span className="font-medium">Order Status:</span>
                                    </div>
                                    <h1>{orderDetails.status}</h1>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        )
    } else {
        return <h1>No order with this Id</h1>
    }
}

export default OrderDetailsPage



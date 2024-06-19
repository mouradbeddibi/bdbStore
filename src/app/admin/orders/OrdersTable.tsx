import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Order, OrderStatus } from "@prisma/client"
import clsx from "clsx"
import { MoveHorizontalIcon } from "lucide-react"
import Link from "next/link"
import { FC, ReactHTML, ReactHTMLElement } from "react"

type OrdersTableProps = {
    orders: Order[]
}


const OrdersTable = ({ orders }: OrdersTableProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Order</TableHead>
                    <TableHead className="min-w-[150px]">Customer</TableHead>

                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell className="font-medium">#{order.orderNumber}</TableCell>
                        <TableCell>{order.name}</TableCell>

                        <TableCell className="hidden md:table-cell">{order.createdAt.toISOString()}</TableCell>
                        <TableCell className="text-right">{order.price} DH</TableCell>
                        <TableCell className="hidden sm:table-cell">< OrderStatusBadge status={order.orderStatus} /></TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="ghost">
                                        <MoveHorizontalIcon className="w-4 h-4" />
                                        <span className="sr-only">Actions</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem><Link href={`/admin/orders/${order.id}`} className="w-full">View Order</Link></DropdownMenuItem>
                                    {/* <DropdownMenuItem>Customer details</DropdownMenuItem> */}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}

            </TableBody>
        </Table>
    )
}

export default OrdersTable

const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
    return (
        <div className={clsx("inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:border-gray-800 dark:focus:ring-gray-300",
            {
                "bg-yellow-500": status === "Pending",
                "bg-green-500": status === "Confirmed",
                "bg-blue-500": status === "Processing",
                "bg-gray-500": status === "Delivered",
                "bg-red-500": status === "Cancelled",
            })}>
            {status}
        </div>
    );
}
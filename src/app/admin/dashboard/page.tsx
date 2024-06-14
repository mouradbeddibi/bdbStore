import "../../globals.css"
import Link from "next/link"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import Image from "next/image"

const Orders = () => {
    return (
        <>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                            <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$245,678</div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">+12.5% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                            <ShoppingCartIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12,345</div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">+8.2% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Top Selling Books</CardTitle>
                            <BookIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3,456</div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">+15% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                            <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">987</div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">+20% from last month</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Featured Books</CardTitle>
                            <Link className="text-sm font-medium text-gray-900 dark:text-gray-50" href="#">
                                View All
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                                    <Link className="absolute inset-0 z-10" href="#">
                                        <span className="sr-only">View</span>
                                    </Link>
                                    <Image
                                        alt="Book 1"
                                        className="object-cover w-full h-48"
                                        height="200"
                                        src="/placeholder.svg"
                                        style={{
                                            aspectRatio: "150/200",
                                            objectFit: "cover",
                                        }}
                                        width="150"
                                    />
                                    <div className="bg-white p-2 dark:bg-gray-950">
                                        <h3 className="font-bold text-base">The Great Gatsby</h3>
                                        <p className="text-sm text-gray-500">$12.99</p>
                                    </div>
                                </div>
                                <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                                    <Link className="absolute inset-0 z-10" href="#">
                                        <span className="sr-only">View</span>
                                    </Link>
                                    <Image
                                        alt="Book 2"
                                        className="object-cover w-full h-48"
                                        height="200"
                                        src="/placeholder.svg"
                                        style={{
                                            aspectRatio: "150/200",
                                            objectFit: "cover",
                                        }}
                                        width="150"
                                    />
                                    <div className="bg-white p-2 dark:bg-gray-950">
                                        <h3 className="font-bold text-base">To Kill a Mockingbird</h3>
                                        <p className="text-sm text-gray-500">$9.99</p>
                                    </div>
                                </div>
                                <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                                    <Link className="absolute inset-0 z-10" href="#">
                                        <span className="sr-only">View</span>
                                    </Link>
                                    <Image
                                        alt="Book 3"
                                        className="object-cover w-full h-48"
                                        height="200"
                                        src="/placeholder.svg"
                                        style={{
                                            aspectRatio: "150/200",
                                            objectFit: "cover",
                                        }}
                                        width="150"
                                    />
                                    <div className="bg-white p-2 dark:bg-gray-950">
                                        <h3 className="font-bold text-base">1984</h3>
                                        <p className="text-sm text-gray-500">$7.99</p>
                                    </div>
                                </div>
                                <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
                                    <Link className="absolute inset-0 z-10" href="#">
                                        <span className="sr-only">View</span>
                                    </Link>
                                    <Image
                                        alt="Book 4"
                                        className="object-cover w-full h-48"
                                        height="200"
                                        src="/placeholder.svg"
                                        style={{
                                            aspectRatio: "150/200",
                                            objectFit: "cover",
                                        }}
                                        width="150"
                                    />
                                    <div className="bg-white p-2 dark:bg-gray-950">
                                        <h3 className="font-bold text-base">Pride and Prejudice</h3>
                                        <p className="text-sm text-gray-500">$11.99</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <aside className="hidden lg:block border-l bg-gray-100/40 p-6 dark:bg-gray-800/40">
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <h3 className="font-semibold text-lg">Quick Links</h3>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="#"
                        >
                            <BookIcon className="h-4 w-4" />
                            Manage Products
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="#"
                        >
                            <ShoppingCartIcon className="h-4 w-4" />
                            Manage Orders
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="#"
                        >
                            <UsersIcon className="h-4 w-4" />
                            Manage Customers
                        </Link>
                    </div>
                    <div className="grid gap-2">
                        <h3 className="font-semibold text-lg">Reports</h3>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="#"
                        >
                            <LineChartIcon className="h-4 w-4" />
                            Sales Report
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="#"
                        >
                            <BarChartIcon className="h-4 w-4" />
                            Inventory Report
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="#"
                        >
                            <PieChartIcon className="h-4 w-4" />
                            Customer Report
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Orders


function BarChartIcon(props: { className: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" x2="12" y1="20" y2="10" />
            <line x1="18" x2="18" y1="20" y2="4" />
            <line x1="6" x2="6" y1="20" y2="16" />
        </svg>
    )
}


function BookIcon(props: { className: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
    )
}


function DollarSignIcon(props: { className: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    )
}




function LineChartIcon(props: { className: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
        </svg>
    )
}


function PieChartIcon(props: { className: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
            <path d="M22 12A10 10 0 0 0 12 2v10z" />
        </svg>
    )
}




function ShoppingCartIcon(props: { className: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    )
}


function UsersIcon(props: { className: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}

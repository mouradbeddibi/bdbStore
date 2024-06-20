import "../../globals.css"
import Link from "next/link"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import Image from "next/image"
import { BarChartIcon, BookIcon, DollarSignIcon, LineChartIcon, PieChartIcon, ShoppingCartIcon, UsersIcon } from "lucide-react"
import { auth } from "@/auth"

const Orders = async () => {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        return <h1>Not Authorised</h1>
    }
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


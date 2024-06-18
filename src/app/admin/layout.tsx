"use client"
import { useState, Suspense } from "react";
import { Libre_Franklin } from "next/font/google";
import { Archivo } from "next/font/google";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { BookIcon, HomeIcon, Layers3, LineChartIcon, SchoolIcon, ShoppingCartIcon, UsersIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import SearchProductByName from "@/components/SearchProductByName";

const libre_franklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre_franklin",
});
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const path = usePathname();

  const isActive = (href: string) => {
    return path.startsWith(`/admin/${href}`);
  };
  const activeLinkColor = "text-gray-900 bg-gray-100 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50";
  const notactiveLinkColor = "text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50";

  return (
    <html lang="en">
      <body className={libre_franklin.variable + " " + archivo.variable}>
        <div className={clsx("grid min-h-screen w-full overflow-hidden", isSidebarMinimized ? "lg:grid-cols-[80px_1fr]" : "lg:grid-cols-[280px_1fr]")}>
          <div className={clsx("border-r bg-gray-100/40 dark:bg-gray-800/40 transition-all", isSidebarMinimized ? "w-20" : "w-72")}>
            <div className="flex flex-col gap-2">
              <div className="flex h-[60px] items-center px-6">
                <button className="flex items-center gap-2 font-semibold" onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}>
                  <BookIcon className="h-6 w-6" />
                  {!isSidebarMinimized && <span>Bookshop</span>}
                </button>
              </div>
              <div className="flex-1">
                <nav className="grid items-start px-4 text-sm font-medium">
                  <Link
                    className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 ", isActive("dashboard") ? activeLinkColor : notactiveLinkColor)}
                    href="/admin/dashboard"
                  >
                    <HomeIcon className="h-4 w-4" />
                    {!isSidebarMinimized && <span>Dashboard</span>}
                  </Link>
                  <Link
                    className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 ", isActive("orders") ? activeLinkColor : notactiveLinkColor)}
                    href="/admin/orders"
                  >
                    <ShoppingCartIcon className="h-4 w-4" />
                    {!isSidebarMinimized && <span>Orders</span>}
                  </Link>
                  <Link
                    className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 ", isActive("products") ? activeLinkColor : notactiveLinkColor)}
                    href="/admin/products"
                  >
                    <BookIcon className="h-4 w-4" />
                    {!isSidebarMinimized && <span>Products</span>}
                  </Link>
                  <Link
                    className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 ", isActive("categories") ? activeLinkColor : notactiveLinkColor)}
                    href="/admin/categories"
                  >
                    <Layers3 className="h-4 w-4" />
                    {!isSidebarMinimized && <span>Categories</span>}
                  </Link>
                  <Link
                    className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 ", isActive("schools") ? activeLinkColor : notactiveLinkColor)}
                    href="/admin/schools"
                  >
                    <SchoolIcon className="h-4 w-4" />
                    {!isSidebarMinimized && <span>écoles</span>}
                  </Link>
                  <Link
                    className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 ", isActive("customers") ? activeLinkColor : notactiveLinkColor)}
                    href="/admin/customers"
                  >
                    <UsersIcon className="h-4 w-4" />
                    {!isSidebarMinimized && <span>Customers</span>}
                  </Link>
                  <Link
                    className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 ", isActive("analytics") ? activeLinkColor : notactiveLinkColor)}
                    href="admin/analytics"
                  >
                    <LineChartIcon className="h-4 w-4" />
                    {!isSidebarMinimized && <span>Analytics</span>}
                  </Link>
                </nav>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
              <button className="lg:hidden" onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}>
                <BookIcon className="h-6 w-6" />
                <span className="sr-only">Home</span>
              </button>
              <div className="flex-1">
                <h1 className="font-semibold text-lg">Bookshop Dashboard</h1>
              </div>
              <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <Suspense>
                  <SearchProductByName />
                </Suspense>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="rounded-full" size="icon" variant="ghost">
                      <Image
                        alt="Avatar"
                        className="rounded-full"
                        height="32"
                        src="/placeholder.svg"
                        style={{
                          aspectRatio: "32/32",
                          objectFit: "cover",
                        }}
                        width="32"
                      />
                      <span className="sr-only">Toggle user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>
            <main className="transition-all">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

"use client"
import { Libre_Franklin } from "next/font/google";
import { Archivo } from "next/font/google";

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import Image from "next/image";
import { Layers3 } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";


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

export default function Layout({ children }: {
  children: React.ReactNode
}) {
  const path = usePathname();

  const isActive = (href: string) => {
    return path.startsWith(`/admin/${href}`);
  };
  const activeLinkColor = "text-gray-900 bg-gray-100 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
  const notactiveLinkColor = "text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
  return (
    <html lang="en">
      <body className={libre_franklin.variable + " " + archivo.variable}>
        <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
            <div className="flex flex-col gap-2">
              <div className="flex h-[60px] items-center px-6">
                <Link className="flex items-center gap-2 font-semibold" href="#">
                  <BookIcon className="h-6 w-6" />
                  <span className="">Bookshop</span>
                </Link>
              </div>
              <div className="flex-1">
                <nav className="grid items-start px-4 text-sm font-medium">
                  <Link
                    className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 ", isActive("dashboard") ? activeLinkColor : notactiveLinkColor)}
                    href="/admin/dashboard"
                  >
                    <HomeIcon className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 ", isActive("orders") ? activeLinkColor : notactiveLinkColor)}
                    href="/admin/orders"
                  >
                    <ShoppingCartIcon className="h-4 w-4" />
                    Orders
                  </Link>
                  <Link
                    className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 ", isActive("products") ? activeLinkColor : notactiveLinkColor)}
                    href="/admin/products"
                  >
                    <BookIcon className="h-4 w-4" />
                    Produits
                  </Link>
                  <Link
                    className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 ", isActive("categories") ? activeLinkColor : notactiveLinkColor)}
                    href="/admin/categories"
                  >
                    <Layers3 className="h-4 w-4" />
                    Catégories
                  </Link>
                  <Link
                    className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 ", isActive("listes") ? activeLinkColor : notactiveLinkColor)}
                    href="/admin/listes"
                  >
                    <Layers3 className="h-4 w-4" />
                    Listes
                  </Link>

                  <Link
                    className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 ", isActive("customers") ? activeLinkColor : notactiveLinkColor)}
                    href="/admin/customers"
                  >
                    <UsersIcon className="h-4 w-4" />
                    Clients
                  </Link>
                  <Link
                    className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 ", isActive("analytics") ? activeLinkColor : notactiveLinkColor)}
                    href="admin/analytics"
                  >
                    <LineChartIcon className="h-4 w-4" />
                    Analytics
                  </Link>
                </nav>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
              <Link className="lg:hidden" href="#">
                <BookIcon className="h-6 w-6" />
                <span className="sr-only">Home</span>
              </Link>
              <div className="flex-1">
                <h1 className="font-semibold text-lg">Bookshop Dashboard</h1>
              </div>
              <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                  <div className="relative">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                      className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white"
                      placeholder="Search books..."
                      type="search"
                    />
                  </div>
                </form>
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

            {children}
          </div>
        </div>
      </body>
    </html>
  );
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




function HomeIcon(props: { className: string }) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
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




function SearchIcon(props: { className: string }) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
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

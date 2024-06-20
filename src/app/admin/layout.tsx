"use client"
import { Suspense } from "react";
import { Libre_Franklin } from "next/font/google";
import { Archivo } from "next/font/google";
import Link from "next/link";
import { Layers3, SchoolIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import SearchProductByName from "@/components/SearchProductByName";
import { ThemeProvider } from "@/components/themeProvider";
import { ModeToggle } from "@/components/ThemeButton";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TooltipProvider } from "@radix-ui/react-tooltip";
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
  const activeLinkColor = "group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base";
  const notactiveLinkColor = "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8";
  const notActiveText = "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
  const activeText = "flex items-center gap-4 px-2.5 text-foreground"

  const path = usePathname();
  const isActive = (href: string) => {
    return path.startsWith(`/admin/${href}`);
  };
  
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${libre_franklin.variable} ${archivo.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
              <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                <Link
                  href="/"
                  className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                  <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/admin/dashboard"
                        className={isActive("dashboard") ? activeLinkColor : notactiveLinkColor}
                      >
                        <Home className="h-5 w-5" />
                        <span className="sr-only">Dashboard</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Dashboard</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/admin/orders"
                        className={isActive("orders") ? activeLinkColor : notactiveLinkColor}
                      >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="sr-only">Orders</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Orders</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/admin/products"
                        className={isActive("products") ? activeLinkColor : notactiveLinkColor}
                      >
                        <Package className="h-5 w-5" />
                        <span className="sr-only">Products</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Products</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/admin/categories"
                        className={isActive("categories") ? activeLinkColor : notactiveLinkColor}
                      >
                        <Layers3 className="h-5 w-5" />
                        <span className="sr-only">Categories</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Customers</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/admin/schools"
                        className={isActive("schools") ? activeLinkColor : notactiveLinkColor}
                      >
                        <SchoolIcon className="h-5 w-5" />
                        <span className="sr-only">écoles</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">écoles</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/admin/analytics"
                        className={isActive("analytics") ? activeLinkColor : notactiveLinkColor}
                      >
                        <LineChart className="h-5 w-5" />
                        <span className="sr-only">Analytics</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Analytics</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </nav>
              <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="#"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <Settings className="h-5 w-5" />
                        <span className="sr-only">Settings</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Settings</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </nav>
            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                      <PanelLeft className="h-5 w-5" />
                      <span className="sr-only">Toggle Menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                      <Link
                        href="#"
                        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                      >
                        <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                        <span className="sr-only">Acme Inc</span>
                      </Link>
                      <Link
                        href="/admin/dashboard"
                        className={isActive("dashboard") ? activeText : notActiveText}
                      >
                        <Home className="h-5 w-5" />
                        Dashboard
                      </Link>
                      <Link
                        href="/admin/orders"
                        className={isActive("orders") ? activeText : notActiveText}
                      >
                        <ShoppingCart className="h-5 w-5" />
                        Orders
                      </Link>
                      <Link
                        href="/admin/products"
                        className={isActive("products") ? activeText : notActiveText}

                      >
                        <Package className="h-5 w-5" />
                        Products
                      </Link>
                      <Link
                        href="/admin/categories"
                        className={isActive("categories") ? activeText : notActiveText}

                      >
                        <Layers3 className="h-5 w-5" />
                        Categories
                      </Link>
                      <Link
                        href="/admin/schools"
                        className={isActive("schools") ? activeText : notActiveText}

                      >
                        <SchoolIcon className="h-5 w-5" />
                        écoles
                      </Link>
                      <Link
                        href="/admin/analytics"
                        className={isActive("analytics") ? activeText : notActiveText}

                      >
                        <SchoolIcon className="h-5 w-5" />
                        Analytics
                      </Link>
                    </nav>
                  </SheetContent>
                </Sheet>

                <div className="relative ml-auto flex-1 flex gap-5 md:grow-0">
                  <Suspense>
                    <SearchProductByName />
                  </Suspense>
                  <ModeToggle />
                </div>

              </header>
              <main >
                {children}
              </main>
            </div>
          </div>

        </ThemeProvider>
      </body>
    </html>
  );
}



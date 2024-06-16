"use client"

import { SearchIcon } from "lucide-react"
import { Input } from "./ui/input"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Suspense } from 'react'

function SearchProductByName() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set("name", term)
        } else {
            params.delete("name")
        }
        replace(`${pathname}?${params.toString()}`)
    }
    return (
        <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Suspense>
                <Input
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white"
                    placeholder="Search Products..."
                    type="search"
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </Suspense>
        </div>
    )
}

export default SearchProductByName
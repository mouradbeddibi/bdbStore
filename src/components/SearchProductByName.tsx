"use client"

import { SearchIcon } from "lucide-react"
import { Input } from "./ui/input"
import { useSearchParams, useRouter } from "next/navigation"
import React, { useState } from "react"

function SearchProductByName() {
    const searchParams = useSearchParams()
    const { replace } = useRouter()
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams)
        if (searchTerm) {
            params.set("name", searchTerm)
        } else {
            params.delete("name")
        }
        replace(`/admin/products?${params.toString()}`)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white"
                placeholder="Search Products..."
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}

export default SearchProductByName

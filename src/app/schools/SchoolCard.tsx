"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

type SchoolWithCount = {
    _count: {
        listes: number;
    };
} & {
    id: string;
    name: string;
    formattedName: string;
    location: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export const SchoolCard = ({ school, schoolId }: { school: SchoolWithCount, schoolId: string }) => {
    const router = useRouter()
    const handleClick = (schoolId: string) => {
        try {
            router.push(`/schools/${schoolId}`)
        } catch (error) {
            toast.error("EROOR")
        }
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 hover:cursor-pointer" onClick={() => handleClick(schoolId)}>
            <div className="bg-background rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{school.name}</h2>
                    <p className="text-muted-foreground">{school._count.listes}</p>
                </div>
            </div>

        </div>
    )
}
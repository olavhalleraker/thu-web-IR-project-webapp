'use client';

import { useRouter } from 'next/navigation';
import { Input } from "../ui/input";
import { Button } from '../ui/button';
import { SearchIcon } from 'lucide-react';

type SearchInputProps = {
    defaultValue?: string;
};

export function SearchInput({ defaultValue }: SearchInputProps) {
    const router = useRouter();

    return (
        <div className='flex flex-row gap-2'>
            <Input
                className="w-full sm:w-128"
                placeholder="Search..."
                autoComplete="off"
                defaultValue={defaultValue}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        const query = (e.target as HTMLInputElement).value;
                        if (query) {
                            console.log("Client-side redirect to /search?q=", query);
                            router.push(`/search?q=${encodeURIComponent(query)}`);
                        }
                    }
                }}
            />
            <Button
                className="bg-gray-300 text-white p-2 rounded-md cursor-pointer hover:bg-gray-600 transition-colors duration-200"
                onClick={() => {
                    const input = document.querySelector('input[placeholder="Search..."]') as HTMLInputElement;
                    const query = input.value;
                    if (query) {
                        console.log("Client-side redirect to /search?q=", query);
                        router.push(`/search?q=${encodeURIComponent(query)}`);
                    }
                }}
            >
                <SearchIcon className="w-4 h-4" />
            </Button>
        </div>
    );
}

'use client';

import { redirectToSearch } from "@/app/actions";
import { Input } from "../ui/input";

export function SearchInput() {
    return (
        <Input
            className="w-full sm:w-128"
            placeholder="Search..."
            autoComplete="off"
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    const query = (e.target as HTMLInputElement).value;
                    if (query) {
                        'use server';
                        redirectToSearch(query);
                    }
                }
            }}
        />
    );
}

    
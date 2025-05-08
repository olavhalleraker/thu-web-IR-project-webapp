'use client';

import { redirectToSearch } from "@/app/actions";
import { Input } from "../ui/input";

type SearchInputProps = {
    defaultValue?: string;
};

export function SearchInput( { defaultValue }: SearchInputProps) {
    return (
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
                        // 'use server';
                        redirectToSearch(query);
                    }
                }
            }}
        />
    );
}

    
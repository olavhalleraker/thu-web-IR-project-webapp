'use client';

import { useRouter } from 'next/navigation';
import { Input } from "../ui/input";

type SearchInputProps = {
  defaultValue?: string;
};

export function SearchInput({ defaultValue }: SearchInputProps) {
  const router = useRouter();

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
            console.log("Client-side redirect to /search?q=", query);
            router.push(`/search?q=${encodeURIComponent(query)}`);
          }
        }
      }}
    />
  );
}

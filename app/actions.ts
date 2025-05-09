'use server';

import { doc } from "@/components/types";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";


export async function redirectToSearch(query: string) {
    // Redirect to the search page
    revalidateTag('query') // Update cached posts
    redirect(`/search?q=${query}`) // Navigate to the new post page
}

export async function redirectToUrl(url: string) {
    // Redirect to url outside of the app
    redirect(url); // Navigate to the external URL
}

export async function querySearch(query: string): Promise<doc[]> {
    const APIURL = process.env.SEARCH_API_URL;

    if (!APIURL) {
        throw new Error("SEARCH_API_URL is not defined");
    }
    // Test the search function
    const res = await fetch(`${APIURL}/search/${query}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Network response was not ok");
    }

    const data = await res.json();

    // Remove duplicate urls
    const uniqueUrls = new Set();
    const uniqueData = data.filter((doc: doc) => {
        if (uniqueUrls.has(doc.url)) {
            return false;
        } else {
            uniqueUrls.add(doc.url);
            return true;
        }
    });

    return uniqueData as doc[];
}
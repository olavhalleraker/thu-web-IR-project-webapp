'use server';

import { doc, stance } from "@/components/types";
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
    const startTime = Date.now();  
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
    console.log("Search time: ", (Date.now() - startTime) / 1000, " seconds");
    return uniqueData as doc[];
}

export async function classify(query: string, url: string): Promise<stance> {
    const APIURL = process.env.SEARCH_API_URL;
    if (!APIURL) {
        throw new Error("SEARCH_API_URL is not defined");
    }
    const res = await fetch(`${APIURL}/classify?query=${encodeURIComponent(query)}&url=${encodeURIComponent(url)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data: stance = await res.json()
    return data
}

export async function classifyAll(query: string, docs: doc[]): Promise<stance[]> {
    const APIURL = process.env.SEARCH_API_URL;
    if (!APIURL) {
        throw new Error("SEARCH_API_URL is not defined");
    }
    const res = await fetch(`${APIURL}/classify/bundle?query=${encodeURIComponent(query)}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(docs),
    });
    
    const data = await res.json();

    return data as stance[];
}
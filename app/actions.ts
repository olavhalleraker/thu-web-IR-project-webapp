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

// export async function querySearch(query: string): Promise<doc[]> {
//     // Search for documents matching the query
//     // const res = await fetch(`https://api.example.com/search?q=${query}`, {
//     //     method: "GET",
//     //     headers: {
//     //         "Content-Type": "application/json",
//     //     },
//     // });

//     // if (!res.ok) {
//     //     throw new Error("Network response was not ok");
//     // }

//     // const data = await res.json();
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
//     const data = {
//         docs: [
//             {
//                 url: "https://www.nytimes.com/2025/03/08/climate/noaa-layoffs-trump.html",
//                 lastmod: "2025-03-10T17:32:03Z",
//                 imageurl: null,
//                 title: "More NOAA Employees May Be Let Go, Making 20% of Staff Cut - The New York Times",
//                 summary: "Together with recent firings and resignations, the new cuts could hamper the National Weather Service’s ability to produce lifesaving forecasts, scientists say.",
//                 tags: ["tag1", "tag2"],
//             },
//             {
//                 url: "https://www.nytimes.com/2025/03/10/world/asia/covid-anniversary-photos.html",
//                 lastmod: "2025-03-10T17:32:03Z",
//                 imageurl: null,
//                 title: "More NOAA Employees May Be Let Go, Making 20% of Staff Cut - The New York Times",
//                 summary: "Together with recent firings and resignations, the new cuts could hamper the National Weather Service’s ability to produce lifesaving forecasts, scientists say.",
//                 tags: ["tag1", "tag2"],
//             },
//             {
//                 url: "https://www.nytimes.com/2025/03/09/opinion/musk-tesla-sales-stock-price.html",
//                 lastmod: "2025-03-10T17:32:03Z",
//                 imageurl: null,
//                 title: "More NOAA Employees May Be Let Go, Making 20% of Staff Cut - The New York Times",
//                 summary: "Together with recent firings and resignations, the new cuts could hamper the National Weather Service’s ability to produce lifesaving forecasts, scientists say.",
//                 tags: ["tag1", "tag2"],
//             },

//         ],
//     }
//     return data.docs as doc[];
// }
    
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
    console.log("Search results:", data);
    console.log("Search results length:", data.length);
    return data as doc[];
}
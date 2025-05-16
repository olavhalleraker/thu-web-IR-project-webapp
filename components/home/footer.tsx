import Link from "next/link";


export function Footer() {
    return (
        <footer className="flex items-center justify-between w-full px-4 py-2 bg-gray-200">
            <div className="text-sm">
                {/* &copy; {new Date().getFullYear()} Your Company Name */}
                Olav Larsen Halleraker & Guillermo Rodrigo @ Tsinghua University
            </div>
            <div className="flex space-x-4">
                <Link href="/docs" className="text-sm hover:underline">Documentation</Link>
            </div>
        </footer>
    );
}
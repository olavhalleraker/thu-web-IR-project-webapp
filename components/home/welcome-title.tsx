import { HelpCircleIcon } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import Image from "next/image";
import Logo from "@/public/logo.png";

export function WelcomeTitle() {
    return (
        <div className="flex flex-col items-center w-full sm:w-128">
            <Image
                src="/logo.png"
                width={100}
                height={100}
                alt="Picture of the author"
            />
            <div className="flex flex-row items-center gap-2">
                <h1 className="text-2xl sm:text-4xl font-bold text-center">
                    Welcome to <span className="text-red-400">BIAS Search</span>
                </h1>
                <HoverCard>
                    <HoverCardTrigger>
                        <HelpCircleIcon className="text-gray-500 h-6 w-6 cursor-help" />
                    </HoverCardTrigger>
                    <HoverCardContent>
                        For documentation and other information go to
                        <a
                            href="/docs" className="text-blue-500 hover:text-blue-700 font-bold">
                            {" "}
                            /docs
                        </a>
                        .
                    </HoverCardContent>
                </HoverCard>
            </div>
        </div>
    );
}
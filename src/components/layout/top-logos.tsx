"use client";

import Link from "next/link";

export function TopLogos() {
    const logos = [
        {
            name: "FIRST",
            url: "https://www.firstinspires.org/",
            image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/FIRST_Logo.svg/1200px-FIRST_Logo.svg.png",
            height: "h-16 md:h-20",
        },
        {
            name: "Youth Agency of Uzbekistan",
            url: "https://yoshlar.gov.uz/",
            image: "https://grandswiss2025.fide.com/wp-content/uploads/2025/08/youthUZB.png",
            height: "h-32 md:h-40",
        },
        {
            name: "Our Partner",
            url: "#",
            image: "https://cdn-icons-png.flaticon.com/512/4712/4712139.png",
            height: "h-16 md:h-20",
        },
    ];

    return (
        <div className="bg-background border-b border-border/50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-3 items-center gap-4 py-6">
                    {/* Left Logo - FIRST */}
                    <div className="flex justify-start">
                        <Link
                            href={logos[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-all hover:scale-110 duration-300"
                            title={logos[0].name}
                        >
                            <img
                                src={logos[0].image}
                                alt={logos[0].name}
                                className={`${logos[0].height} w-auto object-contain opacity-80 hover:opacity-100 transition-opacity`}
                                style={{
                                    filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 2px rgba(255, 255, 255, 1))'
                                }}
                            />
                        </Link>
                    </div>

                    {/* Center Logo - Youth Agency (BIGGER) */}
                    <div className="flex justify-center">
                        <Link
                            href={logos[1].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-all hover:scale-110 duration-300"
                            title={logos[1].name}
                        >
                            <img
                                src={logos[1].image}
                                alt={logos[1].name}
                                className={`${logos[1].height} w-auto object-contain opacity-80 hover:opacity-100 transition-opacity`}
                                style={{
                                    filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 2px rgba(255, 255, 255, 1))'
                                }}
                            />
                        </Link>
                    </div>

                    {/* Right Logo - Partner */}
                    <div className="flex justify-end">
                        <Link
                            href={logos[2].url}
                            target={logos[2].url !== "#" ? "_blank" : undefined}
                            rel={logos[2].url !== "#" ? "noopener noreferrer" : undefined}
                            className="transition-all hover:scale-110 duration-300"
                            title={logos[2].name}
                        >
                            <img
                                src={logos[2].image}
                                alt={logos[2].name}
                                className={`${logos[2].height} w-auto object-contain opacity-80 hover:opacity-100 transition-opacity`}
                                style={{
                                    filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 2px rgba(255, 255, 255, 1))'
                                }}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
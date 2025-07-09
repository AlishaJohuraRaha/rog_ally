import React from "react";

interface ActionButtonProps {
    label: string;
    link: string;
    width: number
    className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, link, className, width }) => (
    <a
        href={link}
        className={`inline-block group ${className ?? ""}`}
        style={{ textDecoration: "none" }}
    >
        <span
            className="relative inline-flex items-center justify-center px-6 py-2 font-semibold rounded-lg transition-shadow transform transition-transform duration-200 group-hover:scale-105"
            style={{
                background: "#18181b",
                color: "#fff",
                minWidth: `${width}px`,
                minHeight: "2.5rem",
                fontSize: "1rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                borderRadius: "30.5rem",
            }}
        >
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none rounded-full"
                style={{ zIndex: 0 }}
                aria-hidden="true"
            >
                <rect
                    x="1"
                    y="1"
                    width={width}
                    height="46"
                    rx="25"
                    fill="none"
                    stroke="url(#gradientStroke)"
                    strokeWidth="6"
                />
                <defs>
                    <linearGradient id="gradientStroke" x1="0" y1="0" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#BC66F5" />
                        <stop offset="50%" stopColor="#673BFC" />
                        <stop offset="100%" stopColor="#A5E2F9" />
                    </linearGradient>
                </defs>
            </svg>
            <span className="relative z-10 px-2 py-1">{label}</span>
        </span>
    </a>
);

export default ActionButton;
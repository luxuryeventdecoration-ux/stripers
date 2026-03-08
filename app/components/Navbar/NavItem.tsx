import React from "react";

interface NavItemProps {
    label: string;
    hasDropdown?: boolean;
    isActive?: boolean;
    onMouseEnter?: () => void;
    href?: string;
}

const NavItem: React.FC<NavItemProps> = ({
    label,
    hasDropdown = false,
    isActive = false,
    onMouseEnter,
    href = "#",
}) => {
    return (
        <a
            href={hasDropdown ? undefined : href}
            onMouseEnter={onMouseEnter}
            className={`group flex cursor-pointer items-center gap-1 px-4 py-2 text-[15px] font-medium transition-opacity duration-200 ${isActive ? "text-white opacity-100" : "text-white/80 hover:text-white hover:opacity-100"
                }`}
        >
            {label}
            {hasDropdown && (
                <svg
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${isActive ? "rotate-180" : ""
                        }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                </svg>
            )}
        </a>
    );
};

export default NavItem;

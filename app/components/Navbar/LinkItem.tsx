import React from "react";

interface LinkItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  arrow?: boolean;
}

const LinkItem: React.FC<LinkItemProps> = ({
  icon,
  title,
  description,
  href = "#",
  arrow = false,
}) => {
  return (
    <a
      href={href}
      className="group flex items-start gap-4 rounded-lg p-3 transition-colors duration-150 hover:bg-violet-50/60"
    >
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-violet-500/10 to-indigo-500/10 text-violet-600">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="flex items-center gap-1 text-[15px] font-semibold text-slate-800">
          {title}
          {arrow && (
            <svg
              className="h-3.5 w-3.5 translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          )}
        </span>
        <span className="text-[13px] leading-snug text-slate-500">
          {description}
        </span>
      </div>
    </a>
  );
};

export default LinkItem;

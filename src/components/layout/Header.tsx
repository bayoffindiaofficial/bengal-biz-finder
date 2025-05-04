
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

const Header = ({
  title = "Bengal Biz Finder",
  showBackButton = false,
  onBack,
  rightElement,
  className,
  ...props
}: HeaderProps) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-white border-b shadow-sm",
        className
      )}
      {...props}
    >
      <div className="container h-16 flex items-center justify-between">
        <div className="flex items-center">
          {showBackButton && (
            <button 
              onClick={onBack} 
              className="mr-2 p-2 rounded-full hover:bg-gray-100"
              aria-label="Back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          )}
          <Link to="/">
            <h1 className="text-xl font-bold text-bengalbiz-primary tracking-tight flex items-center">
              <span className="hidden sm:inline">Bengal Biz Finder</span>
              <span className="sm:hidden">BBF</span>
            </h1>
          </Link>
        </div>
        {title && title !== "Bengal Biz Finder" && (
          <h2 className="text-lg font-semibold">{title}</h2>
        )}
        {rightElement && <div>{rightElement}</div>}
      </div>
    </header>
  );
};

export default Header;

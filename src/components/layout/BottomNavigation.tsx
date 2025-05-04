
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Menu, User } from "lucide-react";

const BottomNavigation = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="w-6 h-6" />
    },
    {
      name: "Browse",
      path: "/businesses",
      icon: <Search className="w-6 h-6" />
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <Menu className="w-6 h-6" />
    },
    {
      name: "Account",
      path: "/auth",
      icon: <User className="w-6 h-6" />
    }
  ];

  return (
    <nav className="bottom-nav shadow-lg">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`bottom-nav-item ${pathname === item.path ? "active" : ""}`}
        >
          {item.icon}
          <span className="mt-1">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNavigation;

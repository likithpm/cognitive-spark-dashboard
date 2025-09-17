import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GraduationCap, BarChart3, Brain, Users, Home, Menu, ChevronDown } from "lucide-react";

const navigationItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "Insights", path: "/insights", icon: Brain },
  { name: "Students", path: "/students", icon: Users },
];

export const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentPage = navigationItems.find(item => item.path === location.pathname) || navigationItems[0];

  return (
    <header className="dashboard-header px-6 py-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <Link to="/dashboard" className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Student Performance Dashboard</h1>
              <p className="text-primary-foreground/80 text-sm">
                Cognitive Skills & Learning Analytics
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`flex items-center gap-2 text-primary-foreground hover:bg-white/20 ${
                      isActive ? "bg-white/20 text-primary-foreground" : ""
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 text-primary-foreground hover:bg-white/20"
                >
                  <currentPage.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{currentPage.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-48 bg-card border-border shadow-lg z-50"
                sideOffset={5}
              >
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-2 w-full px-3 py-2 text-sm cursor-pointer ${
                          isActive 
                            ? "bg-primary text-primary-foreground font-medium" 
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
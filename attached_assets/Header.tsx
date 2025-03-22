import { useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
  currentPath: string;
}

const Header = ({ currentPath }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Contact", href: "/contact" },
    { name: "Admin", href: "/admin" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0 justify-between w-full md:w-auto">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img 
                  src="/assets/galeeleeway-logo.png" 
                  alt="Galeeleeway Logo" 
                  className="h-12 w-auto mr-3 hidden md:block rounded-full"
                />
                <h1 className="text-2xl font-bold font-heading">Galeeleeway</h1>
              </div>
            </Link>
            <Button 
              variant="ghost" 
              className="text-white md:hidden" 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
          
          <nav className={cn(
            "w-full md:w-auto transition-all duration-300 ease-in-out",
            isMenuOpen ? "block" : "hidden md:block"
          )}>
            <div className="flex flex-col md:flex-row items-center justify-end">
              {navigation.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 font-medium transition duration-300 border-b-2 border-transparent hover:border-secondary",
                    item.href === currentPath ? "text-secondary border-secondary" : "text-white hover:text-secondary"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

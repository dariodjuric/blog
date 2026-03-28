import { useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Menu } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const navItems = [
  { label: 'Blog', href: '/posts' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`relative no-underline px-3 py-1.5 font-display text-sm font-medium transition-colors rounded-md ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {item.label}
              {isActive && (
                <div className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Mobile nav */}
      <Drawer direction="right" open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button
            className="block md:hidden text-muted-foreground hover:text-primary transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle className="sr-only">Navigation</DrawerTitle>
          <ul className="flex flex-col px-5 py-4 gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.href}>
                  <DrawerClose asChild>
                    <Link
                      className={`block no-underline px-3 py-2.5 rounded-md font-display text-base font-medium transition-colors ${
                        isActive
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-primary hover:bg-muted'
                      }`}
                      to={item.href}
                    >
                      {item.label}
                    </Link>
                  </DrawerClose>
                </li>
              );
            })}
          </ul>
        </DrawerContent>
      </Drawer>
    </>
  );
}

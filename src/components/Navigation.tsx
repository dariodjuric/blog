import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Link, useLocation } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Blog', href: '/posts' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [mobileMenuShown, setMobileMenuShown] = useState(false);
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
                  : 'text-muted-foreground hover:text-foreground'
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
      <Dialog.Root open={mobileMenuShown} onOpenChange={setMobileMenuShown}>
        <Dialog.Trigger asChild>
          <button
            onClick={() => setMobileMenuShown(true)}
            className="block md:hidden text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="outline-none fixed top-0 right-0 w-[250px] h-full bg-card border-l border-border flex flex-col">
            <div className="h-14 px-5 flex items-center justify-end">
              <button
                onClick={() => setMobileMenuShown(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="flex flex-col px-5 gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      className={`block no-underline px-3 py-2.5 rounded-md font-display text-base font-medium transition-colors ${
                        isActive
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                      to={item.href}
                      onClick={() => setMobileMenuShown(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

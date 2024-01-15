'use client';
import { useState } from 'react';
import Image from 'next/image';
import hamburgerIcon from '@/public/icons/hamburger.svg';
import closeIcon from '@/public/icons/close.svg';
import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';

const menuItems = [
  { label: 'Blog posts', href: '/blogs' },
  { label: 'About me', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [mobileMenuShown, setMobileMenuShown] = useState(false);

  return (
    <>
      <Dialog.Root open={mobileMenuShown} onOpenChange={setMobileMenuShown}>
        <Dialog.Trigger asChild>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuShown(true);
            }}
            className="block md:hidden"
          >
            <Image priority src={hamburgerIcon} alt="Open menu" />
          </a>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-15" />
          <Dialog.Content className="fixed top-0 right-0 w-[250px] h-full bg-half-colonial-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col">
            <div className="w-full h-[70px] px-8 flex flex-row justify-end">
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuShown(false);
                }}
                className="self-center"
              >
                <Image priority src={closeIcon} alt="Close menu" />
              </a>
            </div>
            <ul className="flex flex-col self-center">
              {menuItems.map((item, index) => (
                <li
                  key={item.href}
                  className={`text-center py-3 ${index < menuItems.length - 1 ? 'border-b border-gray-300' : ''}`}
                >
                  <Link
                    className="no-underline font-bold hover:text-thunderbird text-xl"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <ul className="hidden md:flex flex-row space-x-7 self-center">
        {menuItems.map((item) => (
          <li key={item.href} className="">
            <Link
              className="no-underline font-bold hover:text-thunderbird text-lg"
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

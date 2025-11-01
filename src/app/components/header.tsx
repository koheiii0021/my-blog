"use client";

import Image from "next/image";
import * as motion from "motion/react-client";
import { useState } from "react";
import Link from "next/link";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="flex items-center justify-between w-full h-80 sm:p-8 lg:p-30 bg-gray-50 font-sans">
      <div>
        <h1 id="logo">
          <a href="/Home">
            <Image
              src="/logo.png"
              alt="Site Logo"
              width={400}
              height={200}
              priority
            />
          </a>
        </h1>
      </div>

      <div className="hidden md:block">
        <ul
          id="socialBtn"
          className="flex items-center justify-end gap-4 mr-4 pt-40"
        >
          <li>
            <a href="">
              <Image
                src="/instagram.png"
                alt="Instagram"
                width={27}
                height={27}
                priority
              />
            </a>
          </li>
          <li>
            <a href="">
              <Image
                src="/twitter.png"
                alt="Twitter"
                width={21}
                height={21}
                priority
              />
            </a>
          </li>
        </ul>
        <nav>
          <ul id="cf" className="flex gap-4 pt-10">
            <Link href="/Home">
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                className=" px-3 py-2 text-gray-700 hover:text-gray-800 transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-400 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom hover:after:scale-x-100"
              >
                Home
              </motion.li>
            </Link>
            <Link href="/Works">
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                className="px-3 py-2  text-gray-700 hover:text-gray-800 transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-400 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom hover:after:scale-x-100"
              >
                Works
              </motion.li>
            </Link>
            <Link href="/Contact">
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                className="px-3 py-2  text-gray-700 hover:text-gray-800 transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-400 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom hover:after:scale-x-100"
              >
                Contact
              </motion.li>
            </Link>
            <Link href="/Blog">
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                className="px-3 py-2  text-gray-700 hover:text-gray-800 transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-400 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom hover:after:scale-x-100"
              >
                Blog
              </motion.li>
            </Link>
          </ul>
        </nav>
      </div>

      {/* モバイルメニューボタン */}
      <button
        onClick={toggleMenu}
        className="md:hidden absolute top-4 right-4 flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
        aria-label="Toggle menu"
      >
        <motion.span
          animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          className="w-6 h-0.5  bg-gray-700 transition-all duration-300"
        />
        <motion.span
          animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
          className="w-6 h-0.5  bg-gray-700 transition-all duration-300"
        />
        <motion.span
          animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          className="w-6 h-0.5 bg-gray-700 transition-all duration-300"
        />
      </button>

      {/* モバイルナビゲーション */}
      <motion.nav
        initial={false}
        animate={
          isMenuOpen
            ? { opacity: 1, y: 0, height: "auto" }
            : { opacity: 0, y: -10, height: 0 }
        }
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="md:hidden absolute top-16 left-0 right-0 overflow-hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-b-2xl z-50"
      >
        <ul className="flex flex-col py-3">
          {[
            { href: "/Home", label: "Home" },
            { href: "/Works", label: "Works" },
            { href: "/Contact", label: "Contact" },
            { href: "/Blog", label: "Blog" },
          ].map((item) => (
            <motion.li
              key={item.href}
              whileHover={{ backgroundColor: "#f3f4f6" }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 border-b border-gray-300 text-gray-800 font-medium tracking-wide"
            >
              <Link
                href={item.href}
                onClick={closeMenu}
                className="block w-full text-base"
              >
                {item.label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    </header>
  );
};

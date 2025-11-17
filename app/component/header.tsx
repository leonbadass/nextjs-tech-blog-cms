"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Header(): React.JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md  w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src="/coding_Ctrl_logo.png"
            alt="Logo"
            width={80}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-[#007bff] font-semibold text-lg">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/posts">Articles</Link></li>
            <li><Link href="/category">Categories</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Dark Mode Placeholder */}
        <div className="hidden md:block text-gray-600 cursor-pointer">
          Dark Mode
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#007bff]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 shadow-inner">
          <ul className="flex flex-col items-center space-y-4 py-4 text-[#007bff] font-semibold text-lg">
            <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link href="/posts" onClick={() => setMenuOpen(false)}>Articles</Link></li>
            <li><Link href="/category" onClick={() => setMenuOpen(false)}>Categories</Link></li>
            <li><Link href="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            <li className="text-gray-600 cursor-pointer" onClick={() => setMenuOpen(false)}>
              Dark Mode
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed w-full bg-cream/80 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif text-sage hover:text-gold transition-colors">
            Studio Élan
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sage hover:text-gold transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/reservation"
              className="bg-sage text-white px-6 py-2 rounded-full hover:bg-gold transition-colors"
            >
              Réserver
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-sage hover:text-gold transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sage hover:text-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/reservation"
                className="bg-sage text-white px-6 py-2 rounded-full hover:bg-gold transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Réserver
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
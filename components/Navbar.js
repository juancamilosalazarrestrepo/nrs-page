'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/#new', label: 'Lo Nuevo' },
    { href: '/#about', label: 'Nosotros' },
    { href: '/albums', label: 'Catálogo' },
    { href: '/merch', label: 'Merch' },
    { href: '/videos', label: 'Videos' },
    { href: '/galeria', label: 'Galería' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <Link href="/" className="nav-logo">
            <Image src="/images/logoTransparent.png" alt="No Rules Clan" width={120} height={40} style={{ height: '40px', width: 'auto' }} />
          </Link>
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={pathname === link.href ? 'active' : ''}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <button className="nav-toggle" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation">✕</button>
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}

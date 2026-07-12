import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { profile } from '@/data/profile';

const NAV = [
  { href: '/#about', label: 'About' },
  { href: '/#stack', label: 'Stack' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#awards', label: 'Awards' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="container-x flex h-14 items-center justify-between">
        <Link href="/" className="font-mono text-sm font-bold tracking-tight">
          {profile.nameEn.toUpperCase()}
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm text-neutral-600 transition hover:text-brand dark:text-neutral-400 dark:hover:text-brand-dark">
              {n.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

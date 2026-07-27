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
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-2.5 font-mono text-[13px] tracking-technical">
          <span className="h-2.5 w-2.5 shrink-0 rounded-[1px] bg-signal transition-transform group-hover:rotate-45" />
          {profile.nameEn.toUpperCase()}
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="font-mono text-[12px] uppercase tracking-technical text-faint transition-colors hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}

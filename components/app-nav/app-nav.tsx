import Link from "next/link";
import { PropsWithChildren } from "react";
import styles from './app-nav.module.scss'

interface IAppHeaderProps extends PropsWithChildren { 
  className: string;
}

const AppNav: React.FC<IAppHeaderProps> = ({ className }) => (
  <header className={`${styles['app-header']} ${className}`}>
    <nav>
      <ul>
        <li>
          <Link href="/#about">🐾 &nbsp; Home</Link>
        </li>
        <li>
          <Link href="/#the-kittens">The Kittens</Link>
        </li>
        <li>
          <Link href="/#gallery">Gallery</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/cat-ownership">Cat Ownership Tips</Link>
        </li>
        <li>
          <Link href="/adoption-info">How to Adopt</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default AppNav;
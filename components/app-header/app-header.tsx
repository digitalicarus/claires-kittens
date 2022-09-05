import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect, useState } from "react";
import styles from './app-header.module.scss'

interface IAppHeaderProps extends PropsWithChildren { 
  className: string;
  siteTitle: string;
}

const AppNav: React.FC<IAppHeaderProps> = ({ className, siteTitle }) => {
  const [navHide, setNavHide] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    router.events.on('hashChangeComplete', () => setNavHide(true));
  }, []);

  return (
    <div className={`${styles['app-header']} ${className}`}>
      <header>
        <h1 className="site-title">{ siteTitle }</h1>
        <button className="menu-toggle" onClick={(e) => setNavHide(!navHide)}>☰</button>
      </header>
      <nav className={ navHide ? 'hide':'' }>
        <ul>
          <li className="home">
            <Link href="/#home">Home</Link>
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
    </div>
  );
};

export default AppNav;
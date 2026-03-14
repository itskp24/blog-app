import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Navbar.module.css';

const Navbar = ({ showBackLink = false }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo_link}>
          <Image
            src="/logo.png"
            alt="BLOG Logo"
            width={48}
            height={48}
            style={{ objectFit: 'contain' }}
            priority
          />
        </Link>
        
        <div className={styles.nav_links}>
          {showBackLink && (
            <Link href="/" className={styles.back_link}>
              ← All Articles
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

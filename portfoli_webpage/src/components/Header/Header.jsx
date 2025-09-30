import { useState, useEffect, useCallback } from 'react';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/niclindb', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'Resume', 
      url: 'https://niclindb.github.io/portfolio/Resume.pdf', 
      icon: ( 
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
      )
    },
    { 
      name: 'Contact Me', 
      url: 'mailto:nicklindberg0@gmail.com', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 3v18h24V3H0zm21.518 2L12 12.713 2.482 5h19.036zM2 19V7.183l10 8.104 10-8.104V19H2z"/>
        </svg>
      )
    },
  ];

  return (
    <header 
      className={`header ${isScrolled ? 'header--scrolled' : ''} ${isHovered ? 'header--hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="header__content">
        <div className="header__title">
          <h1 className="header__name">
            <span className="header__name-text">Nick Lindberg</span>
            <span className="header__name-underline"></span>
          </h1>
          <p className="header__subtitle">
            <span className="header__subtitle-text">Software Developer</span>
          </p>
        </div>
        
        <nav className="header__nav" role="navigation" aria-label="Social media links">
          <ul className="header__social-links">
            {socialLinks.map((link, index) => {
              const isMailto = link.url.startsWith('mailto:');
              const isExternal = link.url.startsWith('http') || isMailto;
              const isPDF = link.url.toLowerCase().endsWith('.pdf');
              const target = isExternal || isPDF ? '_blank' : '_self';
              const rel = isExternal || isPDF ? 'noopener noreferrer' : undefined;
              const ariaLabel = isMailto ? `Send email to ${link.name}` : `Visit ${link.name} profile`;

              return (
                <li key={index}>
                  <a
                    href={link.url}
                    target={target}
                    rel={rel}
                    className="header__social-link"
                      aria-label={ariaLabel}
                      title={link.name}
                  >
                    <span className="header__social-icon" aria-hidden="true">
                      {link.icon}
                    </span>
                    <span className="header__social-text">{link.name}</span>
                    <span className="header__social-hover-effect"></span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

    </header>
  );
} 

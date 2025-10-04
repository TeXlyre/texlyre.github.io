import type {ReactNode} from 'react';
import {useEffect, useRef, useState, useCallback} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'In-Browser LaTeX & Typst Compilation',
    Svg: require('@site/static/img/undraw_texlyre_engine.svg').default,
    description: (
      <>
        Compile LaTeX and Typst documents directly in your browser.
        No server required - SwiftLaTeX (pdfTeX and XeTeX) and Typst.ts WASM builds run on the client-end.
      </>
    ),
  },
  {
    title: 'Real-time Collaboration',
    Svg: require('@site/static/img/undraw_texlyre_collab.svg').default,
    description: (
      <>
        TeXlyre enables real-time collaboration with live cursors,
        peer-to-peer connections, and conflict-free document synchronization using Yjs CRDTs.
      </>
    ),
  },
  {
    title: 'Local-First Privacy',
    Svg: require('@site/static/img/undraw_texlyre_privacy.svg').default,
    description: (
      <>
        Your data stays in your browser with TeXlyre's local-first architecture.
        Work offline, sync when online, and maintain complete control over your documents.
      </>
    ),
  },
];

function Feature({title, Svg, description, index}: FeatureItem & {index: number}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const featureRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  const checkVisibility = useCallback(() => {
    if (!featureRef.current) return;

    const rect = featureRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Element is visible if any part is in viewport with generous margins
    const isInViewport = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;

    if (isInViewport) {
      setIsVisible(true);
      setHasBeenVisible(true);
    } else if (hasBeenVisible && !isScrollingRef.current) {
      // Only hide if we're not currently scrolling and element was previously visible
      setIsVisible(false);
    }
  }, [hasBeenVisible]);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      isScrollingRef.current = true;

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Use RAF for smooth updates during scroll
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(checkVisibility);

      // Mark scrolling as finished after a delay
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        checkVisibility();
      }, 150);
    };

    // Initial check
    checkVisibility();

    // Use passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkVisibility);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [checkVisibility]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={featureRef}
      className={clsx(styles.featureContainer, {
        [styles.featureReverse]: !isEven,
        [styles.featureVisible]: isVisible,
      })}
    >
      <div className={styles.featureContent}>
        <div className={styles.featureText}>
          <Heading as="h2" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
        <div className={styles.featureImage}>
          <Svg className={styles.featureSvg} role="img" />
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} index={idx} />
        ))}
      </div>
    </section>
  );
}

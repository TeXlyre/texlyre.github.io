import type {ReactNode} from 'react';
import {useEffect, useRef, useState} from 'react';
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
    title: 'In-Browser LaTeX Compilation',
    Svg: require('@site/static/img/undraw_texlyre_engine.svg').default,
    description: (
      <>
        Compile LaTeX documents directly in your browser using SwiftLaTeX WASM engines.
        No server required - pdfTeX and XeTeX support with instant feedback.
      </>
    ),
  },
  {
    title: 'Real-time Collaboration',
    Svg: require('@site/static/img/undraw_texlyre_collab.svg').default,
    description: (
      <>
        TeXlyre enables seamless real-time LaTeX collaboration with live cursors,
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
  const featureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '-50px 0px', // Add some margin for better timing
      }
    );

    if (featureRef.current) {
      observer.observe(featureRef.current);
    }

    return () => {
      if (featureRef.current) {
        observer.unobserve(featureRef.current);
      }
    };
  }, []);

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
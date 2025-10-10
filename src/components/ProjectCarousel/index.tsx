import type { ReactNode } from 'react';
import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

type Project = {
    title: string;
    description: string;
    image: string;
    link: string;
};

const projects: Project[] = [
    {
        title: 'CodeMirror LaTeX Language',
        description: 'Syntax highlighting and language support for LaTeX in CodeMirror 6',
        image: 'img/codemirror-lang-latex.png',
        link: 'https://texlyre.github.io/codemirror-lang-latex/',
    },
    {
        title: 'CodeMirror BibTeX Language',
        description: 'Syntax highlighting and language support for BibTeX in CodeMirror 6',
        image: 'img/codemirror-lang-bib.png',
        link: 'https://texlyre.github.io/codemirror-lang-bib/',
    },
    {
        title: 'WASM LaTeX Tools',
        description: 'WebAssembly-powered LaTeX utilities for browser-based compilation',
        image: 'img/wasm-latex-tools.png',
        link: 'https://texlyre.github.io/wasm-latex-tools/',
    },
    {
        title: 'CodeMirror LaTeX Visual',
        description: 'Visual editing enhancements for LaTeX in CodeMirror',
        image: 'img/codemirror-latex-visual.png',
        link: 'https://texlyre.github.io/codemirror-latex-visual/',
    },
    {
        title: 'Vector PDF Converter',
        description: 'Convert between vector PDF formats in the browser',
        image: 'img/vector-pdf-converter.png',
        link: 'https://texlyre.github.io/vector-pdf-converter/',
    },
    {
        title: 'FilePizza Client',
        description: 'Peer-to-peer file transfer directly in your browser',
        image: 'img/filepizza-client.png',
        link: 'https://texlyre.github.io/filepizza-client/',
    },
    {
        title: 'TeXlyre Templates',
        description: 'Collection of LaTeX and Typst templates for various use cases',
        image: 'img/texlyre-templates.png',
        link: 'https://texlyre.github.io/texlyre-templates/',
    },
];

export default function ProjectCarousel(): ReactNode {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const goToSlide = useCallback((index: number) => {
        setCurrentIndex(index);
    }, []);

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    }, []);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    }, []);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            goToNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, goToNext]);

    const handleMouseEnter = useCallback(() => {
        setIsAutoPlaying(false);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsAutoPlaying(true);
    }, []);

    return (
        <section className={styles.carousel}>
            <div className="container">
                <Heading as="h2" className={styles.title}>TeXlyre Ecosystem</Heading>
                <p className={styles.subtitle}>
                    Explore the open-source projects that power TeXlyre
                </p>

                <div
                    className={styles.carouselContainer}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <button
                        className={clsx(styles.navButton, styles.navButtonPrev)}
                        onClick={goToPrevious}
                        aria-label="Previous project"
                    >
                        ‹
                    </button>

                    <div className={styles.carouselContent}>
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className={clsx(styles.slide, {
                                    [styles.slideActive]: index === currentIndex,
                                })}
                            >
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.slideLink}
                                >
                                    <img
                                        src={useBaseUrl(project.image)}
                                        alt={project.title}
                                        className={styles.slideImage}
                                    />
                                    <div className={styles.slideInfo}>
                                        <h3 className={styles.slideTitle}>{project.title}</h3>
                                        <p className={styles.slideDescription}>{project.description}</p>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>

                    <button
                        className={clsx(styles.navButton, styles.navButtonNext)}
                        onClick={goToNext}
                        aria-label="Next project"
                    >
                        ›
                    </button>

                    <div className={styles.indicators}>
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                className={clsx(styles.indicator, {
                                    [styles.indicatorActive]: index === currentIndex,
                                })}
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to project ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

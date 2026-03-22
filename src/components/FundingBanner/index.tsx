import type { ReactNode } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

type Funder = {
    name: string;
    logo: string;
    url: string;
    height: number;
};

const funders: Funder[] = [
    {
        name: 'NLnet Foundation',
        logo: 'img/sponsors/nlnet.svg',
        url: 'https://nlnet.nl/project/Texlyre/',
        height: 50,
    },
    {
        name: 'NGI Zero',
        logo: 'img/sponsors/ngi0.svg',
        url: 'https://nlnet.nl/NGI0/',
        height: 50,
    },
    {
        name: 'European Commission',
        logo: 'img/sponsors/ec.svg',
        url: 'https://commission.europa.eu/about/departments-and-executive-agencies/communications-networks-content-and-technology_en',
        height: 50,
    },
    {
        name: 'Swiss Confederation – SERI',
        logo: 'img/sponsors/swiss.svg',
        url: 'https://www.sbfi.admin.ch/en',
        height: 44,
    },
];

export default function FundingBanner(): ReactNode {
    return (
        <section className={styles.funding}>
            <div className="container">
                <p className={styles.label}>Funded by</p>
                <div className={styles.logos}>
                    {funders.map((f) => (
                        <a
                            key={f.name}
                            href={f.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.logoLink}
                            title={f.name}
                        >
                            <img
                                src={useBaseUrl(f.logo)}
                                alt={f.name}
                                className={styles.logo}
                                style={{ height: f.height }}
                                loading="lazy"
                            />
                            <span className={styles.logoName}>{f.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

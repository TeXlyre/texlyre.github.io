import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/quick-start-guide">
            TeXlyre Tutorial - 4min ⏱️
          </Link>
          <Link
            className={clsx("button button--primary button--lg", styles.sampleButton)}
            to="https://texlyre.github.io/texlyre/#newProjectName:ArXiv%20Template%202020&newProjectDescription:A%20standard%20ArXiv%20template%20for%20preprint%20papers.%20This%20template%20is%20based%20on%20the%20ArXiv-style%20NeurIPS%20template%20(https%3A%2F%2Fgithub.com%2Fkourgeorge%2Farxiv-style).%20ArXiv%20template%20by%20George%20Kour%20is%20licensed%20under%20MIT%20-%20Copyright%20(c)%202020.%20&newProjectTags:paper%2Cjournal%2Cpreprint%2Carxiv%2Cscientific%2Copen-access%2Ctemplate&files:https%3A%2F%2Ftexlyre.github.io%2Ftexlyre-templates%2Ftemplates%2Facademic%2Farxiv-template-20%2Ftemplate.zip">
            Try a LaTeX Project
          </Link>
          <Link
            className={clsx("button button--primary button--lg", styles.sampleButton)}
            to="https://texlyre.github.io/texlyre/#newProjectName:Appreciated%20Letter&newProjectDescription:Correspond%20with%20business%20associates%20and%20your%20friends%20via%20mail.%20This%20template%20follows%20DIN%205008%20standards%20for%20professional%20correspondence%20(https%3A%2F%2Fgithub.com%2Ftypst%2Ftemplates).%20Appreciated%20Letter%20template%20by%20Typst%20GmbH%20is%20licensed%20under%20MIT-0.&newProjectType:typst&newProjectTags:correspondence%2Cmail%2Cletter%2CDIN%205008%2Coffice%2Ctypst&files:https%3A%2F%2Ftexlyre.github.io%2Ftexlyre-templates%2Ftemplates%2Fletters%2Fappreciated-letter%2Ftemplate.zip">
            Try a Typst Project
          </Link>
        </div>
        <div className={styles.launchButtonContainer}>
          <Link
            className={clsx("button button--primary button--lg", styles.launchButton)}
            to="https://texlyre.github.io/texlyre">
            <img src="/img/logo.svg" alt="TeXlyre" className={styles.buttonLogo} />
            Launch TeXlyre
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} LaTeX`}
      description="The FOSS Local-First & Collaborative LaTeX Editor for the Web">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

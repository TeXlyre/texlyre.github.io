import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import DownloadChannels from '@site/src/components/DownloadChannels';

export default function Download(): ReactNode {
  return (
    <Layout
      title="Download"
      description="Install Chelys, the TeXlyre desktop companion, or run TeXlyre on your own machine.">
      <main className="container margin-vert--lg">
        <Heading as="h1">Download</Heading>
        <p>
          Chelys is the desktop companion for TeXlyre. TeXlyre itself is a web application: it runs
          in your browser, and can also be served locally.
        </p>
        <DownloadChannels />
      </main>
    </Layout>
  );
}

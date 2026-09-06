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
          TeXlyre is a local-first typesetting editor that runs in the browser and can also be served locally. Chelys is its desktop companion, providing locally installed tools and services that TeXlyre can use on your machine.
        </p>
        <DownloadChannels />
      </main>
    </Layout>
  );
}

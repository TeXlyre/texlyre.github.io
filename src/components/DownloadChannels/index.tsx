import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';
import { downloadSections, type DownloadChannel } from './downloads';

import styles from './styles.module.css';

function ChannelAction({ channel }: { channel: DownloadChannel }): ReactNode {
  if (!channel.href) {
    return null;
  }

  if (channel.badge) {
    return (
      <Link to={channel.href} className={styles.badgeLink}>
        <img
          src={channel.badge.src}
          alt={channel.badge.alt}
          className={styles.badge}
        />
      </Link>
    );
  }

  return (
    <Link
      to={channel.href}
      className="button button--outline button--primary"
    >
      {channel.action ?? 'Download'}
    </Link>
  );
}

export default function DownloadChannels(): ReactNode {
  return (
    <>
      {downloadSections.map((section) => (
        <section key={section.id} className={styles.section}>
          <Heading
            as="h2"
            id={section.id}
            className={styles.sectionHeading}
          >
            {section.logo && (
              <img
                src={section.logo}
                alt=""
                className={styles.sectionLogo}
              />
            )}
            {section.title}
          </Heading>

          <p className={styles.description}>{section.description}</p>

          {section.groups.map((group) => (
            <div key={group.platform}>
              <Heading as="h3" className={styles.platform}>
                {group.platform}
              </Heading>

              <div className={styles.channels}>
                {group.channels.map((channel) => (
                  <div key={channel.label} className={styles.channel}>
                    <div className={styles.channelInfo}>
                      <div className={styles.channelLabel}>
                        <span>{channel.label}</span>

                        {channel.icon && (
                          <img
                            src={channel.icon}
                            alt=""
                            className={styles.channelIcon}
                          />
                        )}
                      </div>

                      {channel.meta && (
                        <div className={styles.channelMeta}>
                          {channel.meta}
                        </div>
                      )}
                    </div>

                    <div className={styles.channelActions}>
                      <ChannelAction channel={channel} />

                      {channel.command && (
                        <CodeBlock
                          language="bash"
                          className={styles.command}
                        >
                          {channel.command}
                        </CodeBlock>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </>
  );
}
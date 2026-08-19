import type { ReactNode } from 'react';
import Layout from '@theme-original/Footer/Layout';
import type LayoutType from '@theme/Footer/Layout';
import type { WrapperProps } from '@docusaurus/types';
import StatusIndicator from '@site/src/components/StatusIndicator';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): ReactNode {
    return (
        <Layout
            {...props}
            copyright={
                <>
                    <StatusIndicator />
                    {props.copyright}
                </>
            }
        />
    );
}

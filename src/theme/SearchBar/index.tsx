import type { ReactNode } from 'react';
import { useLocation } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import SearchBar from '@theme-original/SearchBar';
import type SearchBarType from '@theme/SearchBar';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof SearchBarType>;

const normalize = (path: string): string =>
  path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;

export default function SearchBarWrapper(props: Props): ReactNode {
  const { pathname } = useLocation();
  const home = useBaseUrl('/');

  if (normalize(pathname) === normalize(home)) return null;

  return <SearchBar {...props} />;
}

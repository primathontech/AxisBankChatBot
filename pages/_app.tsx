import type { AppProps } from 'next/app';

import ErrorBoundary from '@components/ErrorBoundary';

import '../styles/index.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <ErrorBoundary>
        <Component {...pageProps} />
    </ErrorBoundary>
);

export default MyApp;

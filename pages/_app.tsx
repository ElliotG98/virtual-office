import type { AppProps } from 'next/app';
import '@styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Head from 'next/head';
import { AuthProvider } from '../lib/auth/auth';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Head>
                <meta
                    content="width=device-width, initial-scale=1"
                    name="viewport"
                />
            </Head>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

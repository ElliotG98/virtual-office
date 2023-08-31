import type { AppProps } from 'next/app';
import '@styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Head from 'next/head';
import { AuthProvider } from '@contexts/AuthProvider';
import { NextUIProvider } from '@nextui-org/react';
import { RootLayout } from '../layouts/rootLayout';
import { ErrorProvider } from '@contexts/ErrorProvider';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <NextUIProvider>
            <ErrorProvider>
                <AuthProvider>
                    <Head>
                        <meta
                            content="width=device-width, initial-scale=1"
                            name="viewport"
                        />
                    </Head>
                    <RootLayout>
                        <Component {...pageProps} />
                    </RootLayout>
                </AuthProvider>
            </ErrorProvider>
        </NextUIProvider>
    );
}

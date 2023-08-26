import type { AppProps } from 'next/app';
import '@styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Head from 'next/head';
import { AuthProvider } from '@lib/providers/AuthProvider';
import { NextUIProvider } from '@nextui-org/react';
import { RootLayout } from '@layouts/rootLayout';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <NextUIProvider>
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
        </NextUIProvider>
    );
}

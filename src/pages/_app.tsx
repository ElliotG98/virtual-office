import type { AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
import '@styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Head from 'next/head';
import { AuthProvider } from '@contexts/auth/AuthProvider';
import { NextUIProvider } from '@nextui-org/react';
import { RootLayout } from '../layouts/rootLayout';
import { ErrorProvider } from '@contexts/error/ErrorProvider';
import { UserProvider } from '@contexts/user/UserProvider';
import { ModalProvider } from '@contexts/modal/ModalProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../react-query-client';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <NextUIProvider>
            <QueryClientProvider client={queryClient}>
                <ErrorProvider>
                    <AuthProvider>
                        <ModalProvider>
                            <UserProvider>
                                <Head>
                                    <meta
                                        content="width=device-width, initial-scale=1"
                                        name="viewport"
                                    />
                                </Head>
                                <RootLayout>
                                    <Component {...pageProps} />
                                </RootLayout>
                            </UserProvider>
                        </ModalProvider>
                    </AuthProvider>
                </ErrorProvider>
            </QueryClientProvider>
        </NextUIProvider>
    );
}

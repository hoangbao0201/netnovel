import "@/styles/globals.scss";
import { NextPage } from "next";
import { Router } from "next/router";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

import MainLayout from "@/components/Layouts/MainLayout";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithlayout = AppProps & {
    Component: NextPageWithLayout;
};

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppPropsWithlayout) {
    const getLayout =
        Component.getLayout ??
        ((page) => (
            <MainLayout showHeader showFooter>
                {page}
            </MainLayout>
        ));

    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {getLayout(<Component {...pageProps} />)}
                </PersistGate>
            </Provider>
        </>
    );
}

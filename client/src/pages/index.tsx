import { GetServerSideProps, NextPage } from "next";

import FormHome from "@/components/Shared/FormHome";
import WrapperContent from "@/components/Layouts/WrapperContent";
import { getNovelsHandle } from "@/services";
import { NovelType } from "@/types";
import { ReactNode } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import { NextPageWithLayout } from "./_app";

interface HomeProps {
    novels?: NovelType[];
}

const Home: NextPageWithLayout = ({ novels }: HomeProps) => {
    return (
        <>
            <WrapperContent>
                <FormHome novels={novels} />
            </WrapperContent>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const novelResponse = await getNovelsHandle(ctx.query?.page as string);

    return {
        props: {
            novels: novelResponse.data.novels || null,
        },
    };
};

export default Home;

Home.getLayout = (page: ReactNode) => {
    return (
        <MainLayout showHeader showFooter>
            {page}
        </MainLayout>
    );
};

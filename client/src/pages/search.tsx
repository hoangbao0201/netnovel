import { GetServerSideProps } from "next";

import WrapperContent from "@/components/Layouts/WrapperContent";
import { getNovelsHandle } from "@/services";
import { NovelType } from "@/types";
import { ReactNode } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import { NextPageWithLayout } from "./_app";
import Select from 'react-select'
import { OPTIONS_CATEGORY_NT } from "@/constants";
interface SearchPageProps {
    novels?: NovelType[];
}

const SearchPage: NextPageWithLayout = ({ novels }: SearchPageProps) => {
    return (
        <>
            <WrapperContent>
                <Select
                    name="category"
                    options={OPTIONS_CATEGORY_NT}
                />
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

export default SearchPage;

SearchPage.getLayout = (page: ReactNode) => {
    return (
        <MainLayout showHeader showFooter>
            {page}
        </MainLayout>
    );
};

import { ReactNode } from "react";
import { GetServerSideProps } from "next";
import { NextPageWithLayout } from "./_app";

import { NovelType } from "@/types";
import WrapperContent from "@/components/Layouts/WrapperContent";
import MainLayout from "@/components/Layouts/MainLayout";
import FormSearch from "@/components/Shared/FormSearch";
import { OPTIONS_ARRANGE_NT, OPTIONS_CATEGORY_NT } from "@/constants";

interface SearchPageProps {
    novels?: NovelType[];
}

const SearchPage: NextPageWithLayout = ({ novels }: SearchPageProps) => {

    console.log(novels)

    return (
        <>
            <WrapperContent>
                <FormSearch />
            </WrapperContent>
        </>
    );
};

export const getServerSideProps : GetServerSideProps = async ({ query }) => {

    const { category, arrange, personality, scene, classify, viewframe } = query

    const realCategory = OPTIONS_CATEGORY_NT.find((item) => String(item.id) == category)?.value
    const realArrange = OPTIONS_ARRANGE_NT.find((item) => String(item.id) == arrange)?.value

    return {
        props: {
            novels: { realCategory: realCategory || null, realArrange: realArrange || null } || null
        }
    }
}

export default SearchPage;

SearchPage.getLayout = (page: ReactNode) => {
    return (
        <MainLayout showHeader showFooter>
            {page}
        </MainLayout>
    );
};

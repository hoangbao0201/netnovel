import { ReactNode } from "react";
import { GetServerSideProps } from "next";
import { NextPageWithLayout } from "./_app";

import WrapperContent from "@/components/Layouts/WrapperContent";
import MainLayout from "@/components/Layouts/MainLayout";
import FormSearch from "@/components/Shared/FormSearch";
import { OPTIONS_ARRANGE_NT, OPTIONS_CATEGORY_NT } from "@/constants";

interface SearchPageProps {
    query?: any;
}

const SearchPage: NextPageWithLayout = ({ query }: SearchPageProps) => {

    // console.log(query)

    return (
        <>
            <WrapperContent>
                <FormSearch queryOptions={query}/>
            </WrapperContent>
        </>
    );
};

export const getServerSideProps : GetServerSideProps = async ({ query }) => {

    const { genres, personality, scene, classify, sort, status, gender, numberchapter } : any = query

    // const realCategory = OPTIONS_CATEGORY_NT.find((item) => String(item.id) == category)?.value
    // const realArrange = OPTIONS_ARRANGE_NT.find((item) => String(item.id) == arrange)?.value

    // const realGenres = genres ? genres.split(",").map((num : string) => Number(num)) : null
    // const realNotGenres = notgenres ? notgenres.split(",").map((num : string) => Number(num)) : null

    return {
        props: {
            query: {
                genres: genres || null,
                personality: personality || null,
                scene: scene || null,
                classify: classify || null,
                
                sort: sort || null,
                status: status || null,
                gender: gender || null,
                numberchapter: numberchapter || null,
            }
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

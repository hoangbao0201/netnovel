import { ReactNode } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import WrapperContent from "@/components/Layouts/WrapperContent";
import FormNovelDetail from "@/components/Shared/FormNovelDetail";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { NovelType } from "@/types";
import { getNovelBySlugHandle } from "@/services";
import { ParsedUrlQuery } from "querystring";
import { REVALIDATE_TIME } from "@/constants";


interface Params extends ParsedUrlQuery {
    slug: string;
}

interface NovelDetailProps {
    novel?: NovelType
}

const NovelDetail : NextPage<NovelDetailProps> = ({ novel }) => {
    
    return (
        <>
            <WrapperContent>
                <FormNovelDetail novel={novel}/>
            </WrapperContent>
        </>
    );
}

export const getStaticProps : GetStaticProps<NovelDetailProps, Params> = async (ctx) => {
    try {
        const { slug } = ctx.params as Params

        const novelResponse = await getNovelBySlugHandle(slug as string)

        if(novelResponse) {
            return {
                props: {
                    novel: JSON.parse(JSON.stringify(novelResponse.data?.novel)),
                },
                revalidate: REVALIDATE_TIME,
            };
        }
        return { notFound: true };

    } catch (error) {
        return { notFound: true };
    }
}

export const getStaticPaths : GetStaticPaths<Params> = () => {
    return {
        paths: [],
        fallback: true
    }
}

export default NovelDetail

// NovelDetail.getLayout = (page: ReactNode) => {
//     return (
//         <MainLayout showHeader showFooter>
//             {page}
//         </MainLayout>
//     );
// };

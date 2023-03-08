import { GetServerSideProps, NextPage } from "next";
import { ReactNode } from "react";
import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";
import ContentFormMyNovels from "@/components/Shared/FormCreatorNovel/ContentFormMyNovels";
import MainLayout from "@/components/Layouts/MainLayout";
import { getAccessTokenOnServer } from "@/utils/cookies";
import { connectUser, getNovelsByUserId } from "@/services";

interface CreatorNovelsPageProps {
    novels?: any;
}

const CreatorNovelsPage = ({ novels } : CreatorNovelsPageProps) => {

    return (
        <>
            <FormCreatorNovel
                tab="novels"
                title="Truyện của tôi"
                description="Danh sách các truyện bạn đã đăng"
            >
                {novels ? (
                    <ContentFormMyNovels novels={novels} />
                ) : (
                    <p>Bạn chưa đăng tải truyện nào</p>
                )}
            </FormCreatorNovel>
        </>
    );
};

export const getServerSideProps : GetServerSideProps = async (ctx) => {

    const token = getAccessTokenOnServer(ctx.req.headers.cookie as string)
    const userResponse = await connectUser(token as string);

    if(!userResponse?.data.success) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    const novels = await getNovelsByUserId(userResponse.data.user._id as string)
    if(novels?.data.success) {
        return {
            props: {
                novels: novels.data.novels || null
            }
        }
    }

    return {
        props: {}
    }
}

CreatorNovelsPage.getLayout = (page: ReactNode) => {
    return (
        <MainLayout showHeader={false} showFooter={false}>
            {page}
        </MainLayout>
    );
};

export default CreatorNovelsPage;

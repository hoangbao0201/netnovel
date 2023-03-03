import { ReactNode } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";
import { GetServerSideProps } from "next";
import { getAccessTokenOnServer } from "@/utils/cookies";
import { connectUser } from "@/services";

export interface CreatorNovelPageProps {}

const CreatorNovelPage = () => {
    return (
        <>
            <FormCreatorNovel
                tab="novels/statistics"
                title="Thống kê"
                description="Bạn có thể xem tất tần tật các loại thống kê của truyện mình ở đây"
            />
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

    return {
        props: {}
    }
}

CreatorNovelPage.getLayout = (page: ReactNode) => {
    return (
        <MainLayout showHeader={false} showFooter={false}>
            {page}
        </MainLayout>
    );
};

export default CreatorNovelPage;

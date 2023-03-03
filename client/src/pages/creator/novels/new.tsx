import { ReactNode } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";
import ContentFormNewNovel from "@/components/Shared/FormCreatorNovel/ContentFormNewNovel";
import { GetServerSideProps } from "next";
import { connectUser } from "@/services";
import { getAccessTokenOnServer } from "@/utils/cookies";

export interface CreatorBookPageProps {}

const CreatorBookPage = () => {
    return (
        <>
            <FormCreatorNovel
                tab="novels/new"
                title="Thêm truyện mới"
                description="Bắt đầu sáng tạo thế giới của riêng bạn"
            >
                <ContentFormNewNovel />
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

    return {
        props: {}
    }
}

CreatorBookPage.getLayout = (page: ReactNode) => {
    return (
        <MainLayout showHeader={false} showFooter={false}>
            {page}
        </MainLayout>
    );
};

export default CreatorBookPage;

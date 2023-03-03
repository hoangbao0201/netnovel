import { ReactNode } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";
import { GetServerSideProps } from "next";
import { getAccessTokenOnServer } from "@/utils/cookies";
import { connectUser } from "@/services";

export interface CreatorBookPageProps {}

const CreatorBookPage = () => {
    return (
        <>
            <FormCreatorNovel
                tab="novels/issues"
                title="Báo lỗi"
                description="Dù báo lỗi đúng hay sai nhớ đều phải trả lời để BTV có thể đóng báo lỗi"
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

CreatorBookPage.getLayout = (page: ReactNode) => {
    return (
        <MainLayout showHeader={false} showFooter={false}>
            {page}
        </MainLayout>
    );
};

export default CreatorBookPage;

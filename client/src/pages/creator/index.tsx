import { ReactNode } from "react";
import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";
import MainLayout from "@/components/Layouts/MainLayout";
import { GetServerSideProps } from "next";
import { getAccessTokenOnServer } from "@/utils/cookies";
import { connectUser } from "@/services";

export interface CreatorPageProps {}

const CreatorPage = ({ user } : any) => {

    console.log(user)

    return (
        <>
            <FormCreatorNovel
                title="Tin tức mới"
                description="Các hoạt động gần đây nhất"
            />
        </>
    );
};

export const getServerSideProps : GetServerSideProps = async (ctx) => {

    const token = getAccessTokenOnServer(ctx.req.headers.cookie as string)
    const userResponse = await connectUser(token as string);

    if(!userResponse?.data.success) {
        console.log("đăng nhập rồi")
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

CreatorPage.getLayout = (page: ReactNode) => {
    return (
        <MainLayout showHeader={false} showFooter={false}>
            {page}
        </MainLayout>
    );
};

export default CreatorPage;

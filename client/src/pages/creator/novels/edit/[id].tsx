import { GetServerSideProps, NextPage } from "next";
import { ReactNode } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";
import ContentFormEditNovel from "@/components/Shared/FormCreatorNovel/ContentFormEditNovel";
import { getAccessTokenOnServer } from "@/utils/cookies";
import { connectUser } from "@/services";

export interface CreatorEditNovelPageProps {
    novel?: any;
}

const CreatorEditNovelPage: NextPage<CreatorEditNovelPageProps> = ({
    novel,
}) => {
    return (
        <>
            <FormCreatorNovel
                title="Sửa truyện"
                description="Dù báo lỗi đúng hay sai nhớ đều phải trả lời để BTV có thể đóng báo lỗi"
            >
                {novel ? (
                    <ContentFormEditNovel novel={novel} />
                ) : (
                    <p>Không tìm thấy thông tin</p>
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

    return {
        props: {}
    }
}

// CreatorEditNovelPage.getLayout = (page: ReactNode) => {
//     return (
//         <MainLayout showHeader={false} showFooter={false}>
//             {page}
//         </MainLayout>
//     );
// };

export default CreatorEditNovelPage;

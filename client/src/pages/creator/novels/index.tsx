import { NextPage } from "next";
import { ReactNode } from "react";
import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";
import ContentFormMyNovels from "@/components/Shared/FormCreatorNovel/ContentFormMyNovels";
import MainLayout from "@/components/Layouts/MainLayout";

interface CreatorNovelsPageProps {
    novels?: any;
}

const CreatorNovelsPage: NextPage<CreatorNovelsPageProps> = ({ novels }) => {
    return (
        <>
            <FormCreatorNovel
                tab="books"
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

// CreatorNovelsPage.getLayout = (page: ReactNode) => {
//     return (
//         <MainLayout showHeader={false} showFooter={false}>
//             {page}
//         </MainLayout>
//     );
// };

export default CreatorNovelsPage;

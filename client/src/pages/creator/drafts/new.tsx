import { ReactNode } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";
import ContentFormDraftsNew from "@/components/Shared/FormCreatorNovel/ContentFormDraftsNew";

export interface CreatorNovelPageProps {}

const CreatorNovelPage = () => {
    return (
        <>
            <FormCreatorNovel
                tab="drafts/new"
                title="Thêm bản thảo"
                description="Bạn có thể thêm bản thảo và xuất bản nó ngay lập tức ở đây, hoặc đơn giản chỉ muốn viết một đoạn và để nó tự lưu lại"
            >
                <ContentFormDraftsNew />
            </FormCreatorNovel>
        </>
    );
};

CreatorNovelPage.getLayout = (page: ReactNode) => {
    return (
        <MainLayout showHeader={false} showFooter={false}>
            {page}
        </MainLayout>
    );
};

export default CreatorNovelPage;

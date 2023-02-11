import { ReactNode } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";


export interface CreatorDraftsPageProps {}

const CreatorDraftsPage= () => {

    return (
        <>
            <FormCreatorNovel
                tab="drafts"
                title="Các bản thảo"
                description="Đây là tập hợp danh sách các bản thảo chưa xuất bản của bạn"
            />
        </>
    );
};

CreatorDraftsPage.getLayout = (page: ReactNode) => {
    return (
        <MainLayout showHeader={false} showFooter={false}>
            {page}
        </MainLayout>
    );
};

export default CreatorDraftsPage;

import { ReactNode } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";
import ContentFormNewNovel from "@/components/Shared/FormCreatorNovel/ContentFormNewNovel";

export interface CreatorBookPageProps {}

const CreatorBookPage = () => {
    return (
        <>
            <FormCreatorNovel
                tab="books/new"
                title="Thêm truyện mới"
                description="Bắt đầu sáng tạo thế giới của riêng bạn"
            >
                <ContentFormNewNovel />
            </FormCreatorNovel>
        </>
    );
};

CreatorBookPage.getLayout = (page: ReactNode) => {
    return (
        <MainLayout showHeader={false} showFooter={false}>
            {page}
        </MainLayout>
    );
};

export default CreatorBookPage;

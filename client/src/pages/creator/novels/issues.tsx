import { ReactNode } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";

export interface CreatorBookPageProps {}

const CreatorBookPage = () => {
    return (
        <>
            <FormCreatorNovel
                tab="books/issues"
                title="Báo lỗi"
                description="Dù báo lỗi đúng hay sai nhớ đều phải trả lời để BTV có thể đóng báo lỗi"
            />
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

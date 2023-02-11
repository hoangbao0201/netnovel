import { ReactNode } from "react";
import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";
import MainLayout from "@/components/Layouts/MainLayout";

export interface CreatorPageProps {}

const CreatorPage = () => {
    return (
        <>
            <FormCreatorNovel
                title="Tin tức mới"
                description="Các hoạt động gần đây nhất"
            />
        </>
    );
};

CreatorPage.getLayout = (page: ReactNode) => {
    return (
        <MainLayout showHeader={false} showFooter={false}>
            {page}
        </MainLayout>
    );
};

export default CreatorPage;

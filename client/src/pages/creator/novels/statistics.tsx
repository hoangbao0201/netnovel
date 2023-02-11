import { ReactNode } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import FormCreatorNovel from "@/components/Shared/FormCreatorNovel";

export interface CreatorNovelPageProps {}

const CreatorNovelPage = () => {
    return (
        <>
            <FormCreatorNovel
                tab="books/statistics"
                title="Thống kê"
                description="Bạn có thể xem tất tần tật các loại thống kê của truyện mình ở đây"
            />
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

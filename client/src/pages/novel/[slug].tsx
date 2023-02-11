import { ReactNode } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import WrapperContent from "@/components/Layouts/WrapperContent";
import FormNovelDetail from "@/components/Shared/FormNovelDetail";


export default function NovelDetail() {
    
    return (
        <>
            <WrapperContent>
                <FormNovelDetail />
            </WrapperContent>
        </>
    );
}

NovelDetail.getLayout = (page: ReactNode) => {
    return (
        <MainLayout showHeader showFooter>
            {page}
        </MainLayout>
    );
};

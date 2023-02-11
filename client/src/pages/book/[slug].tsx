import { ReactNode } from "react";
import MainLayout from "@/components/Layouts/MainLayout";
import WrapperContent from "@/components/Layouts/WrapperContent";
import FormBookDetail from "@/components/Shared/FormBookDetail";


export default function BookDetail() {
    return (
        <>
            <WrapperContent>
                <FormBookDetail />
            </WrapperContent>

        </>
    );
}

BookDetail.getLayout = (page: ReactNode) => {
    return (
        <MainLayout showHeader showFooter>
            {page}
        </MainLayout>
    );
};

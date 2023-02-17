import { GetServerSideProps, NextPage } from "next";

import FormHome from "@/components/Shared/FormHome";
import WrapperContent from "@/components/Layouts/WrapperContent";
import { getNovelsHandle } from "@/services";
import { NovelType  } from "@/types";

interface HomeProps {
    novels?: NovelType[]
}

const Home : NextPage = ({ novels } : HomeProps) => {

    return (
        <>
            <WrapperContent>
                <FormHome novels={novels}/>
            </WrapperContent>

        </>
    );
}

export const getServerSideProps : GetServerSideProps = async (ctx) => {

    const novelResponse = await getNovelsHandle(ctx.query?.page as string)

    return {
        props: {
            novels: novelResponse.data.novels || null
        }
    }
}


export default Home;

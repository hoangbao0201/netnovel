import { GetServerSideProps, NextPage } from "next";

import FormHome from "@/components/Shared/FormHome";
import WrapperContent from "@/components/Layouts/WrapperContent";

const Home : NextPage = ({ name } : any) => {

    return (
        <>
            <WrapperContent>
                <FormHome />
            </WrapperContent>

        </>
    );
}

export const getServerSideProps : GetServerSideProps = async (ctx) => {

    // const response = await axios.get("http://localhost:4000/api/users");

    return {
        props: {
            name: 123 || null
        }
    }
}


export default Home;

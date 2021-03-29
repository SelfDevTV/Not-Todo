import Link from "next/link";
import dbConnect from "../utils/dbConnect";

const Index = () => (
    <>
        <h1>That's totally NOT a ToDo List!</h1>
    </>
);

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
    // await dbConnect();

    return { props: {} };
}

export default Index;

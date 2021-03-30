<<<<<<< HEAD
import { signIn, signOut, useSession } from 'next-auth/client'

const Index = () => {
    const [session, loading] = useSession()
=======
import ToDoList from "@components/ToDoList";
import Link from "next/link";
import dbConnect from "../utils/dbConnect";

const Index = () => (
    <>
        <div className="container mx-auto">
            <ToDoList />
        </div>
    </>
);
>>>>>>> Fixes, basic todolist

    if (loading) {
        return <p>Loading..</p>
    }
    return (
        <>
            {!session && (
                <>
                    Not signed in <br />
                    <button onClick={() => signIn()}>Sign in</button>
                </>
            )}
            {session && (
                <>
                    Signed in as {session.user.name} <br />
                    <button onClick={() => signOut()}>Sign out</button>
                </>
            )}
        </>
    )
}

export async function getServerSideProps() {
    return { props: {} }
}

export default Index

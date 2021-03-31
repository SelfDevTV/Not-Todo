import { signIn, signOut, useSession } from 'next-auth/client'
import { Button } from '../components/Button'
import { ToDoContainer } from '../components/todo/ToDoContainer'
const Index = () => {
    const [session, loading] = useSession()

    if (loading) {
        return <p>Loading..</p>
    }
    return (
        <>
            {!session && (
                <>
                    <div className="grid justify-items-center ">
                        <h2 className="text-xl text-center">Not signed in</h2>
                        <br />
                        <button
                            className="bg-green-400 hover:bg-green-500 rounded-lg focus:outline-none"
                            onClick={() => signIn()}
                        >
                            <Button title="Sign in" />
                        </button>
                    </div>
                </>
            )}
            {session && (
                <>
                    Signed in as {session.user.name} <br />
                    <div className="grid justify-items-center ">
                        <br />
                        <button
                            className="bg-red-400 hover:bg-red-500 rounded-lg focus:outline-none"
                            onClick={() => signOut()}
                        >
                            <Button title="Sign Out" />
                        </button>
                    </div>
                    <div className="flex justify-center my-4">
                        <div className="w-1/3">
                            <ToDoContainer />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export async function getServerSideProps() {
    return { props: {} }
}

export default Index

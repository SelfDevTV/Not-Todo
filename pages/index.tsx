import Link from 'next/link'
import dbConnect from '../utils/dbConnect'
import { signIn, signOut, useSession, getSession } from 'next-auth/client'

const Index = (props) => {
    const { session } = props

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

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps(context) {
    // await dbConnect();
    const session = await getSession(context)
    return { props: { session } }
}

export default Index

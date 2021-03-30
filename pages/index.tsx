import { Todo } from '@lib/types'
import DBRunner from '@utils/nativeDb'
import { getSession, signIn, signOut, useSession } from 'next-auth/client'
import { useState } from 'react'
import { useMutation } from 'react-query'

const Index = ({ name }) => {
    const [session, loading] = useSession()
    const [newTitle, setNewTitle] = useState<string>('')
    const mutation = useMutation((newTodo: Todo) =>
        fetch('http://localhost:3000/api/todos', {
            method: 'POST',
            body: JSON.stringify(newTodo),
        })
    )

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
                    Hello, {name}! <br />
                    Signed in as {session.user.name} <br />
                    <button onClick={() => signOut()}>Sign out</button>
                </>
            )}
            <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
            ></input>
            <button
                onClick={() =>
                    mutation.mutate({ title: newTitle, done: false })
                }
            >
                Submit
            </button>
        </>
    )
}

// export async function getServerSideProps({ req, res }) {

// }

export default Index

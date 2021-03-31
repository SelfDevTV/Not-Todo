import { Todo } from '@lib/types'
import DBRunner from '@utils/nativeDb'
import { getSession, signIn, signOut, useSession } from 'next-auth/client'
import { useState } from 'react'
import { useMutation } from 'react-query'
        
import { Button } from '../components/Button'
import { ToDoContainer } from '../components/todo/ToDoContainer'
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
                    Hello, {name}! <br />
                    Signed in as {session.user.name} <br />

                  {/* Input for creating new todo. Commented out since requires heavy styling
                  <button onClick={() => signOut()}>Sign out</button>
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
                    </button>*/}

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

// export async function getServerSideProps({ req, res }) {

// }

export default Index

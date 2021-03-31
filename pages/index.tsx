import Input from '@components/input'
import { Todo } from '@lib/types'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { Button } from '../components/Button'
import { ToDoContainer } from '../components/todo/ToDoContainer'
const Index = ({ name }) => {
    const [session, loading] = useSession()

    const queryClient = useQueryClient()
    const [newTitle, setNewTitle] = useState<string>('')
    const mutation = useMutation(
        (newTodo: Omit<Todo, '_id'>) =>
            fetch('http://localhost:3000/api/todos', {
                method: 'POST',
                body: JSON.stringify(newTodo),
            }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('todos')
            },
        }
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
                    <div className="grid justify-items-center ">
                        <br />
                        <button
                            className="bg-red-400 hover:bg-red-500 rounded-lg focus:outline-none p-2"
                            onClick={() => signOut()}
                        >
                            {'Sign Out'}
                        </button>
                    </div>
                    <div className="flex justify-center my-4">
                        <div className="w-1/3">
                            <Input
                                value={newTitle}
                                onChange={(val) => setNewTitle(val)}
                            ></Input>
                            <Button
                                onClick={() =>
                                    mutation.mutate({
                                        title: newTitle,
                                        done: false,
                                    })
                                }
                                title={'Submit'}
                            />
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

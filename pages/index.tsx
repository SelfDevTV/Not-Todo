import { getSession, signIn, signOut, useSession } from 'next-auth/client'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { Button } from '@components/Button'
import { ToDoContainer } from '@components/todo/ToDoContainer'
import Input from '@components/Input'
import { Todo } from '@lib/types'
import { GetServerSideProps } from 'next'

const Index = ({ serverSideToDos, name }) => {
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
            onMutate: async (newTodo: Todo) => {
                await queryClient.cancelQueries('todos')
                const previousTodos = queryClient.getQueryData('todos')
                queryClient.setQueryData('todos', (old: Todo[]) => [
                    ...old,
                    newTodo,
                ])
                return { previousTodos }
            },
            // If the mutation fails, use the context returned from onMutate to roll back
            onError: (err, newTodo, context) => {
                queryClient.setQueryData('todos', context.previousTodos)
            },
            // Always refetch after error or success:
            onSettled: () => {
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

                        <Button onClick={() => signIn()} title="Sign in" />
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
                    <div className="flex justify-center m-0 mx-auto my-4 flex-col w-1/3">
                        <form
                            className="grid grid-cols-3/1 grid-rows-1 gap-1"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <Input
                                value={newTitle}
                                onChange={(val) => setNewTitle(val)}
                            ></Input>
                            <Button
                                onClick={() => {
                                    mutation.mutate({
                                        title: newTitle,
                                        done: false,
                                    })
                                    setNewTitle('')
                                }}
                                title={'Submit'}
                            />
                        </form>
                        <ToDoContainer serverSideToDos={serverSideToDos} />
                    </div>
                </>
            )}
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)

    if (!session) {
        return { props: { serverSideToDos: null } }
    }

    try {
        const response = await fetch('http://localhost:3000/api/todos', {
            headers: {
                cookie: context.req.headers.cookie,
            },
            method: 'GET',
        })

        const todos = await response.json()

        return {
            props: {
                serverSideToDos: todos,
                session,
            },
        }
    } catch (error) {
        return { props: { serverSideToDos: null } }
    }
}

export default Index

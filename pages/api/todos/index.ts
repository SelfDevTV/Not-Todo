import DBRunner from '@utils/nativeDb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })

    if (!session) {
        return res.status(401).end()
    }

    switch (req.method) {
        case 'POST':
            try {
                const queryRes = await DBRunner.run(async (db) => {
                    const todos = db.collection('todos')
                    const users = db.collection('users')
                    const doc = JSON.parse(req.body)
                    const result = await todos.insertOne(doc)
                    await users.updateOne(
                        { name: session.user.name },
                        { $push: { todos: result.insertedId } }
                    )

                    return result
                })
                res.status(201).json(queryRes)
            } catch (error) {
                return res.status(500).end()
            }
            break
        default:
            res.setHeader('Allow', ['POST'])
            return res.status(405).end()
    }

    res.status(500).end()
}

import DBRunner from '@utils/nativeDb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })

    switch (req.method) {
        case 'POST':
            try {
                DBRunner.run(async (db) => {
                    const todos = db.collection('todos')
                    const users = db.collection('users')
                    const doc = JSON.parse(req.body)
                    const result = await todos.insertOne(doc)
                    // const user = await users.findOne({ name: session.user.name })
                    await users.updateOne(
                        { name: session.user.name },
                        { $push: { todos: result.insertedId } }
                    )
                    result.insertedId

                    return res.json(result)
                })
            } catch (error) {
                return res.status(500).send({})
            }

        default:
            return res.status(400).send({})
    }
}

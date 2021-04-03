import DBRunner from '@utils/nativeDb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import { ObjectId } from 'mongodb'
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' })
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
        case 'GET':
            // get all todos
            try {
                const queryRes = await DBRunner.run(async (db) => {
                    const users = db.collection('users')

                    const user = await users
                        .aggregate([
                            { $match: { name: session.user.name } },
                            {
                                $lookup: {
                                    from: 'todos',
                                    localField: 'todos',
                                    foreignField: '_id',
                                    as: 'todos',
                                },
                            },
                        ])
                        .toArray()

                    return user[0].todos
                })
                res.status(201).json(queryRes)
            } catch (error) {
                return res.status(500).end()
            }
            break
        case 'PUT':
            try {
                const queryRes = await DBRunner.run(async (db) => {
                    const doc = JSON.parse(req.body)

                    const todos = db.collection('todos')
                    const users = db.collection('users')
                    //We need to check, if user actually owns ToDo, that we are trying to update

                    const hasUser = await users
                        .find({
                            name: session.user.name,
                            todos: new ObjectId(doc._id),
                        })
                        .limit(1)
                        .count(true)

                    if (hasUser < 1) {
                        return null
                    }

                    const result = await todos.updateOne(
                        { _id: new ObjectId(doc._id) },
                        { $set: { title: doc.title, done: doc.done } }
                    )

                    return result
                })

                if (!queryRes) {
                    return res.status(401).end()
                }

                res.status(201).json(queryRes)
            } catch (error) {
                console.log(`error`, error)
                return res.status(500).end()
            }
            break
        default:
            res.setHeader('Allow', ['POST', 'GET', 'PUT'])
            return res.status(405).end()
    }

    res.status(500).end()
}

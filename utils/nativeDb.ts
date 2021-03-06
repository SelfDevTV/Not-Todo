import { Db, MongoClient } from 'mongodb'
/**
 * @class
 * Singleton wrapper for MongoClient
 */
class DBRunner {
    private static client: MongoClient

    private constructor() {}

    private static async tryInit() {
        if (!DBRunner.client) {
            DBRunner.client = new MongoClient(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            await DBRunner.client.connect()
        }
    }
    /**
     * All database queries shold be wrapped into this
     * @param callback that accepts Database instance as argument and returns any data you may want to retrieve
     * @returns result of invoking provided callback
     * @example
     * const queryResult = await DBRunner.run((db) => {
     *  const result = await //some query code there
     *  return result;
     * })
     *
     */
    public static async run<T>(callback: (db: Db) => Promise<T>): Promise<T> {
        await DBRunner.tryInit()

        const database = DBRunner.client.db()

        // const result = await callback(database)

        // await connection.close()

        return callback(database)
    }
}

export default DBRunner

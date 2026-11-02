import { createContext, useEffect, useState } from "react";
import { tablesDB, client } from '../lib/appwrite'
import { ID, Permission, Query, Role } from 'react-native-appwrite'
import { useUser } from "../hooks/useUser";

const DATABASE_ID = '6ae8be50002356e225ca'
const TABLE_ID = '6ae8be740031bce2432c'   // your table ID

export const BooksContext = createContext()

export function BooksProvider({ children }) {
    const [books, setBooks] = useState([])
    const { user } = useUser()

    async function fetchBooks() {
        try {
            const response = await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                queries: [Query.equal('userId', user.$id)]
            })

            setBooks(response.rows)          // was response.documents
        } catch (error) {
            console.error(error.message)
        }
    }

    async function fetchBookById(id) {
        try {
            return await tablesDB.getRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: id
            })
        } catch (error) {
            console.error(error.message)
        }
    }

    async function createBook(data) {
        try {
            await tablesDB.createRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: ID.unique(),
                data: { ...data, userId: user.$id },
                permissions: [
                    Permission.read(Role.user(user.$id)),
                    Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id))
                ]
            })
        } catch (error) {
            console.error(error.message)
        }
    }

    async function deleteBook(id) {
        try {
            await tablesDB.deleteRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID,
                rowId: id
            })
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        let unsubscribe
        // realtime channel changed: documents -> rows, collections -> tables
        const channel = `databases.${DATABASE_ID}.tables.${TABLE_ID}.rows`

        if (user) {
            fetchBooks()

            unsubscribe = client.subscribe(channel, (response) => {
                const { payload, events } = response

                if (events[0].includes("create")) {
                    setBooks((prev) => [...prev, payload])
                }

                if (events[0].includes("delete")) {
                    setBooks((prev) => prev.filter((book) => book.$id !== payload.$id))
                }
            })
        } else {
            setBooks([])
        }

        return () => {
            if (unsubscribe) unsubscribe()
        }
    }, [user])

    return (
        <BooksContext.Provider
            value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}
        >
            {children}
        </BooksContext.Provider>
    )
}
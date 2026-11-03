import { StyleSheet, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from 'react'
import { useBooks } from '../../../hooks/useBooks'
import { Colors } from '../../../constants/Colors'

// themed components
import ThemedText from "../../../components/ThemedText"
import ThemedButton from "../../../components/ThemedButton"
import ThemedView from "../../../components/ThemedView"
import Spacer from "../../../components/Spacer"
import ThemedCard from "../../../components/ThemedCard"
import ThemedLoader from "../../../components/ThemedLoader"

const BookDetails = () => {
    const { id } = useLocalSearchParams()
    const bookId = Array.isArray(id) ? id[0] : id
    const { books, fetchBookById, deleteBook } = useBooks()
    const router = useRouter()

    const [book, setBook] = useState(() => books?.find((b) => b.$id === bookId) || null)
    const [loading, setLoading] = useState(!book)

    const handleDelete = async () => {
        if (!bookId) return
        await deleteBook(bookId)
        setBook(null)
        router.replace('/books')
    }

    useEffect(() => {
        if (!bookId) return

        const found = books?.find((b) => b.$id === bookId)
        if (found) {
            setBook(found)
            setLoading(false)
            return
        }

        let isMounted = true
        async function loadBook() {
            setLoading(true)
            const bookData = await fetchBookById(bookId)
            if (isMounted) {
                if (bookData) {
                    setBook(bookData)
                }
                setLoading(false)
            }
        }

        loadBook()

        return () => {
            isMounted = false
        }
    }, [bookId, books])

    if (loading && !book) {
        return (
            <ThemedView safe={true} style={styles.container}>
                <ThemedLoader />
            </ThemedView>
        )
    }

    if (!book) {
        return (
            <ThemedView safe={true} style={styles.container}>
                <ThemedCard style={styles.card}>
                    <ThemedText style={styles.title}>Book Not Found</ThemedText>
                    <Spacer />
                    <ThemedButton onPress={() => router.replace('/books')}>
                        <Text style={{ color: '#fff', textAlign: 'center' }}>Back to Books</Text>
                    </ThemedButton>
                </ThemedCard>
            </ThemedView>
        )
    }

    return (
        <ThemedView safe={true} style={styles.container}>
            <ThemedCard style={styles.card}>
                <ThemedText style={styles.title}>{book.title}</ThemedText>
                <ThemedText>Written by {book.author}</ThemedText>
                <Spacer />

                <ThemedText title={true}>Book Description</ThemedText>
                <Spacer height={10}/>

                <ThemedText>{book.description}</ThemedText>
            </ThemedCard>

            <ThemedButton onPress={handleDelete} style={styles.delete}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>Delete Book</Text>
            </ThemedButton>
        </ThemedView>
    )
}

export default BookDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
  card: {
    margin: 20
  },
  delete: {
    marginTop: 40,
    backgroundColor: Colors.warning,
    width: 200,
    alignSelf: "center",
  },
})
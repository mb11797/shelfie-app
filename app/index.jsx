import { StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { useState } from 'react';
import { client } from '../lib/appwrite';

// themed components
import ThemedView from '../components/ThemedView'
import ThemedLogo from '../components/ThemedLogo'
import ThemedText from '../components/ThemedText'
import ThemedButton from '../components/ThemedButton'
import Spacer from '../components/Spacer'
 
const Home = () => {
  const [status, setStatus] = useState('Not checked yet');

  const handlePing = async () => {
    setStatus('Pinging...');
    try {
      await client.ping();
      setStatus('Connected to Appwrite ✅');
    } catch (error) {
      setStatus(`Ping failed ❌: ${error.message}`);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedLogo />
      <Spacer />

      <ThemedText style={styles.title} title={true}>The Number 1</ThemedText>

      <ThemedText style={{ marginTop: 10, marginBottom: 30 }}>
        Reading List App
      </ThemedText>

      <Link href="/login" style={styles.link}>
        <ThemedText>Login</ThemedText>
      </Link>
      
      <Link href="/register" style={styles.link}>
        <ThemedText>Register</ThemedText>
      </Link>

      <Link href="/profile" style={styles.link}>
        <ThemedText>Profile</ThemedText>
      </Link>

      <ThemedButton title="Send a ping" onPress={handlePing} />
      <ThemedText style={styles.status}>{status}</ThemedText>

    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    marginVertical: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1
  }
})
import { StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Link } from 'expo-router'
import { useState } from 'react';
import { useUser } from '../../hooks/useUser'

// themed components
import ThemedText from '../../components/ThemedText';
import ThemedView from '../../components/ThemedView';
import Spacer from '../../components/Spacer'
import ThemedButton from '../../components/ThemedButton'
import ThemedTextInput from '../../components/ThemedTextInput'
 
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { user, login } = useUser()

  const handleSubmit = async () => {
    try {
      await login(email, password)
      console.log('current user is: ', user)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <ThemedView style={styles.container}>
        
        <Spacer />
        <ThemedText title={true} style={styles.title}>
          Login to Your Account
        </ThemedText>

        {/* <TextInput placeholder="Email" /> */}

        <Spacer />
        <ThemedTextInput 
          style={{ marginBottom: 20, width: "80%"}}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <ThemedTextInput 
          style={{ marginBottom: 20, width: "80%"}}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Spacer />
        <ThemedButton onPress={handleSubmit}>
          <ThemedText style={{ color: '#f2f2f2'}}>Login</ThemedText>
        </ThemedButton>

        <Spacer height={100} />
        <Link href='/register'>
          <ThemedText style={{ textAlign: "center" }}>
            Register Instead
          </ThemedText>
        </Link>

      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30
  }
})
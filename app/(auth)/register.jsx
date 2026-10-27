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
 
const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { user, register } = useUser()

  const handleSubmit = async () => {
    try {
      await register(email, password)
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
          Register an Account
        </ThemedText>

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
          <ThemedText style={{ color: '#f2f2f2'}}>Register</ThemedText>
        </ThemedButton>

        <Spacer height={100} />
        <Link href='/login'>
          <ThemedText style={{ textAlign: "center" }}>
            Login Instead
          </ThemedText>
        </Link>

      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Register

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
import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import Maitri from '../assets/images/Maitri.jpeg'
import Manas from '../assets/images/Manas.jpeg'
import Heart from '../assets/images/Heart.gif'

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={Manas} style={styles.image}></Image>
        <Image source={Heart} style={styles.heartImage}></Image>
        <Image source={Maitri} style={styles.image}></Image>
      </View>
      <View style={styles.card}>
        <Text style={styles.specialTitle}>Manas Loves Maitri</Text>
        <Text style={{marginTop: 10, marginBottom: 30, fontWeight: 'bold'}}>
          19-20th April 2026
        </Text>
      </View>
      <Text style={styles.title}>#MMT</Text>
      <Text style={styles.title}>#ManasMaitriTogether</Text>

      <Link href="/about" style={styles.link}>About Page</Link>
      <Link href="/contact" style={styles.link}>Contact Page</Link>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  specialTitle: {
    fontWeight: 'bold',
    color: 'red'
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 18
  },
  card: {
    backgroundColor: '#eee',
    padding: 20,
    borderRadius: 5,
    boxShadow: '4px 4px rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 150,
    height: 250,
  },
  heartImage: {
    width: 100,
    height: 100,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1
  }
})
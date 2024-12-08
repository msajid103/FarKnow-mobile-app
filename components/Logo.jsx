import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import logo from "../assets/logo.png"
const Logo = () => {
  return (
    <View style={styles.container}>
         <Image
          source={logo} // replace with your logo URL
          style={styles.logo}
          resizeMode="contain"
        />
      <Text style={styles.brandText}>
        <Text style={styles.orangeText}>Far</Text>
        <Text style={styles.greenText}>Know</Text>
      </Text>
    </View>
  )
}

export default Logo

const styles = StyleSheet.create({
    container:{        
            alignItems: 'center'

    },
    logo: {
        width: 250,  
        height: 250,
      },
      brandText: {
        fontSize: 40, // Adjust text size as needed
        fontWeight: 'bold',
        marginTop: -30,    
      },
      orangeText: {
        color: 'orange', // "Far" in orange
      },
      greenText: {
        color: 'green',  // "Know" in green
      },
})
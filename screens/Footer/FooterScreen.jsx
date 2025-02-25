import React from 'react';
import { StyleSheet, ImageBackground, View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';

const FooterScreen = ({ navigation }) => {
    return (


        <View style={styles.mainContainer}>

            {/* Supervisors */}
            <View style={styles.infoContainer}>
                <Text style={styles.sectionTitle}>Supervisors</Text>
                <Text style={styles.infoText}>Dr. Mudassar Raza</Text>
                <Text
                    style={[styles.infoText, styles.emailText]}
                    onPress={() => Linking.openURL('mailto:mudassar.raza@namal.edu.pk')}
                >
                    mudassar.raza@namal.edu.pk
                </Text>
                <Text style={styles.infoText}>Mr. Muhammad Bilal</Text>
                <Text
                    style={[styles.infoText, styles.emailText]}
                    onPress={() => Linking.openURL('mailto:muhammad.bilal@namal.edu.pk')}
                >
                    muhammad.bilal@namal.edu.pk
                </Text>
                <Text style={styles.infoText}>Dr. Azhar Rasool</Text>
                <Text
                    style={[styles.infoText, styles.emailText]}
                    onPress={() => Linking.openURL('mailto:azhar.rasool@namal.edu.pk')}
                >
                    azhar.rasool@namal.edu.pk
                </Text>
            </View>
            {/* <View style={styles.infoContainer}>
                <Text style={styles.sectionTitle}>Co-Supervisor</Text>
                <Text style={styles.infoText}>Mr. Muhammad Bilal</Text>
                <Text
                    style={[styles.infoText, styles.emailText]}
                    onPress={() => Linking.openURL('mailto:muhammad.bilal@namal.edu.pk')}
                >
                    muhammad.bilal@namal.edu.pk
                </Text>
            </View> */}

            {/* Team Members */}
            <View style={styles.infoContainer}>
                <Text style={styles.sectionTitle}>Developers</Text>
                <Text style={styles.infoText}>Muhammad Sajid</Text>
                <Text
                    style={[styles.infoText, styles.emailText]}
                    onPress={() => Linking.openURL('mailto:sajid2021@namal.edu.pk')}
                >
                    sajid2021@namal.edu.pk
                </Text>
                <Text style={styles.infoText}>Ali Raza</Text>
                <Text
                    style={[styles.infoText, styles.emailText]}
                    onPress={() => Linking.openURL('mailto:ali.raza@namal.edu.pk')}
                >
                    ali.raza@namal.edu.pk
                </Text>
            </View>

            <View style={styles.logoContainer}>
                <Text style={styles.subtitle}>Partner</Text>

                <View style={{ flex: 1, flexDirection: 'row', gap: 15, justifyContent: 'center' }}>
                    <Image
                        source={require('../../assets/namalLogo.png')} // Replace with your Namal logo path
                        style={styles.logo}
                    />
                    <Image
                        source={require('../../assets/netsolLogo.png')} // Replace with your NetSol logo path
                        style={styles.logo}
                    />
                </View>
            </View>

        </View>



    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    mainContainer: {
        marginTop: 20,
        // padding: 20,
        backgroundColor: "white",
        alignItems:'center',
        borderRadius: 20,
    },
    projectTitle: {
        color: 'black',
        marginTop: 20,
        marginLeft: 20,
        fontWeight: '600'
    },
    projectHeading: {
        color: 'orange',
        fontWeight: '900',
        textAlign: 'center',
        fontSize: 30

    },
    textHeading: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
    },
    paraText: {
        // padding:10,
        marginTop: 15,
        textAlign: 'left',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black', // Green primary color
        marginBottom: 5,
        marginTop: 10
        // textAlign: 'center',
    },
    infoContainer: {
        width: '100%',
        marginVertical: 10,
        alignItems:'center'
      },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FF8C00', // Orange accent color
        textAlign: 'center',
        marginBottom: 10,
    },
    logoContainer:{
      marginVertical:10,  
      marginBottom:50
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        // marginTop: 10,
    },
    emailText: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginBottom:10
    },
});

export default FooterScreen;

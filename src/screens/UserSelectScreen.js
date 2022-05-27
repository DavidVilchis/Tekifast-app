import React, { useState, useEffect } from 'react'
import { NativeBaseProvider, View, Center, Heading, Button, Image, VStack, extendTheme, Stagger, useDisclose, IconButton, Icon, Box, Menu } from 'native-base';
import { Fontisto } from "@expo/vector-icons";
import * as firebasSDK from '../../Firebase';

const UserSelectScreen = ({ navigation }) => {

    useEffect(() => {
        const unsuscribe = firebasSDK.auth.onAuthStateChanged(user => {
            if (user) {
                firebasSDK.db.collection("users").where("email", "==", user.email).get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if (doc.data().type === 'client') {
                                navigation.navigate("ClientMenu");
                            }
                        });
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    })
            }
        })
        return unsuscribe;
    }, [])

    const [isEng, setEng] = useState(true);
    const theme = extendTheme({
        colors: {
            primary: {
                50: '#e0fded',
                100: '#bbf2d3',
                200: '#93e9b7',
                300: '#6adf9b',
                400: '#42d680',
                500: '#29bd66',
                600: '#1d934f',
                700: '#116938',
                800: '#054020',
                900: '#001705'
            }
        }
    })
    return (
        <NativeBaseProvider theme={theme}>
            <Box bg="primary.50">
                <Button mt={"30px"} ml={"2"} width={"25%"} variant="ghost" leftIcon={<Icon as={Fontisto} name="world-o" size="sm" />} onPress={() => setEng(!isEng)}>
                    {isEng ? "ENG" : "ES"}
                </Button>
            </Box>
            <Center bg="primary.50" flex={1} px="3">
                <View>
                    <Image mt="-55px" mb="35px" source={require("./img/TEKIFAST-Transparent.png")} style={{ width: 300, height: 50 }} alt={"TekifastLogo"} />
                    <Heading color={"primary.700"} size="2xl" >{isEng ? "Welcome!" : "¡Bienvenido!"}</Heading>
                    <Heading color={"primary.800"} size="md" textAlign="center">{isEng ? "How do you want to log in?" : "¿Cómo quieres iniciar sesión?"}</Heading>
                    <VStack space={2} pt={5} alignItems="center">
                        <Button bg={"primary.600"} width="100%" onPress={() => navigation.navigate('ClientLogin')}>{isEng ? "CLIENT" : "CLIENTE"}</Button>
                        <Button bg={"primary.400"} width="100%" onPress={() => navigation.navigate('ProfessionalLogin')}>{isEng ? "PROFESSIONAL" : "PROFESIONAL"}</Button>
                    </VStack>
                </View>
            </Center>
        </NativeBaseProvider>
    )
}

export default UserSelectScreen;
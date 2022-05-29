import { Icon, Text, NativeBaseProvider, Box, Heading, VStack, FormControl, Input, Button, Center, Link, extendTheme, Fab, Pressable, useTheme } from 'native-base';
import React, { useState } from 'react';
import { Fontisto, Ionicons, AntDesign } from "@expo/vector-icons";
import * as firebaseSDK from '../../Firebase'

const Form = (props) => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const handleRecoverPassword = async () => {
        setLoading(true)
        await firebaseSDK.auth.sendPasswordResetEmail(email).then(() => {
            setLoading(false)
            props.navigation.goBack();
        }).catch(error => {
            console.log(error);
        })
    }
    return (
        <Center w="100%" h="100%" bg="primary.50">
            <Box safeArea p="2" py="8" w="100%" bg="primary.50" mt={"-300px"}>
                <Heading textAlign="center" size="lg" fontWeight="600" color="coolGray.800" _dark={{
                    color: "warmGray.50"
                }}>
                    Recover your password
                </Heading>
                <VStack space={3} mt="5" bg="primary.50">
                    <FormControl>
                        <FormControl.Label>Enter your email</FormControl.Label>
                        <Input placeholder="example@email.com" borderColor={"black"} onChangeText={(value) => setEmail(value)}/>
                    </FormControl>
                    <Button _loading={{
                        bg: "primary.300",
                        _text: {
                            color: "coolGray.700"
                        }
                    }}
                        isLoading={loading} isLoadingText={"Sending email"} mt="2" bg="primary.500" onPress={() => handleRecoverPassword()}>
                        Recover password
                    </Button>
                </VStack>
            </Box>
        </Center>
    )
};
const RecoverPassword = ({ navigation }) => {
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
            <Box position="relative" bg="primary.50">
                <Box position="relative" >
                    <Button mt={"30px"} mr={"3"} alignSelf="flex-end" variant="ghost" leftIcon={<Icon as={Fontisto} name="world-o" size="sm" />}>
                        ENG
                    </Button>
                </Box>
            </Box>
            <Form navigation={navigation} />
            <Fab mt={"20px"} onPress={() => navigation.goBack()} renderInPortal={false} shadow={2} size="4" placement="top-left" icon={<Icon color="white" as={Ionicons} name="chevron-back" size="4" />} />
        </NativeBaseProvider>
    )
}

export default RecoverPassword;
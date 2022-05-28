import React, { useState } from 'react';
import { CloseIcon, IconButton, Collapse, Alert, Icon, Text, NativeBaseProvider, Box, Heading, HStack, VStack, FormControl, Input, Button, Center, Link, extendTheme, Fab, Pressable } from 'native-base';
import { Fontisto, Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as firebasSDK from '../../Firebase';

const Form = (props) => {

    const [show, setShow] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [dataLogin, setDataLogin] = useState({
        email: '',
        password: ''
    });
    const [informationToast, setInformationToast] = useState({
        title: '',
        text: '',
        status: ''
    })

    const handleClick = () => setShow(!show);
    const handleChangeText = (name, value) => {
        setDataLogin({ ...dataLogin, [name]: value });
    }
    const handleLogin = () => {
        if (dataLogin.email != '' && dataLogin.password != '') {
            firebasSDK.auth.signInWithEmailAndPassword(dataLogin.email, dataLogin.password).then(userCredentials => {
                const user = userCredentials.user;
                console.log("Logged in with:", user.email);
                props.navigation.navigate("ProfessionalMenu");
            })
                .catch(error => {
                    setInformationToast({ ["title"]: "Sign in", ["text"]: error.toString(), ["status"]: "error" });
                    setShowToast(true)
                })
        }
        else {
            setInformationToast({ ["title"]: "Warning", ["text"]: "There are empty fields, verify your credentials", ["status"]: "warning" });
            setShowToast(true)
        }
    }
    return (
        <>
            <Collapse isOpen={showToast} bg="primary.50">
                <Alert mt={"30px"} w="100%" status={informationToast.status}>
                    <VStack space={1} flexShrink={1} w="100%">
                        <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                            <HStack flexShrink={1} space={2} alignItems="center">
                                <Alert.Icon />
                                <Text fontSize="md" fontWeight="medium" _dark={{
                                    color: "coolGray.800"
                                }}>
                                    {informationToast.title}
                                </Text>
                            </HStack>
                            <IconButton variant="unstyled" _focus={{
                                borderWidth: 0
                            }} icon={<CloseIcon size="3" color="coolGray.600" />} onPress={() => setShowToast(false)} />
                        </HStack>
                        <Box pl="6" _dark={{
                            _text: {
                                color: "coolGray.600"
                            }
                        }}>
                            {informationToast.text}
                        </Box>
                    </VStack>
                </Alert>
            </Collapse>

            <Center w="100%" h="100%" bg="primary.50">
                <Box mt={"-300px"} safeArea p="2" py="8" w="100%" bg="primary.50">
                    <Heading textAlign="center" size="lg" fontWeight="600" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }}>
                        I'm a Professional
                    </Heading>
                    <Heading textAlign="center" mt="2" _dark={{
                        color: "warmGray.200"
                    }} color="coolGray.600" fontWeight="medium" size="xs">
                        Sign in to continue!
                    </Heading>

                    <VStack space={3} mt="5" bg="primary.50">
                        <FormControl>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input onChangeText={(value) => { handleChangeText("email", value) }} placeholder="example@email.com" borderColor={"black"} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input onChangeText={(value) => { handleChangeText("password", value) }} type={show ? "text" : "password"} placeholder="Enter your password" borderColor={"black"}
                                InputRightElement={
                                    <Pressable p={2} borderWidth={0} onPress={handleClick}>
                                        <Icon as={<MaterialIcons name={show ? "visibility-off" : "visibility"} />} size={5} name="home" />
                                    </Pressable>
                                }
                            />
                            <Link _text={{
                                fontSize: "xs",
                                fontWeight: "500",
                                color: "indigo.500"
                            }} alignSelf="flex-end" mt="1" onPress={() => props.navigation.navigate('RecoverPassword')}>
                                Forget Password?
                            </Link>

                        </FormControl>
                        <Button mt="2" bg="primary.400" onPress={() => { handleLogin() }}>
                            Sign in
                        </Button>
                        <Button mt="1" bg="primary.800" leftIcon={<Icon as={AntDesign} name="google" size="sm" />}>
                            Sign in with Google
                        </Button>
                        <HStack mt="6" justifyContent="center">
                            <Text fontSize="sm" color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }}>
                                I'm a new user.{" "}
                            </Text>
                            <Link _text={{
                                color: "indigo.500",
                                fontWeight: "medium",
                                fontSize: "sm"
                            }} onPress={() => props.navigation.navigate('ProfessionalRegister')}>
                                Sign Up
                            </Link>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </>
    )
};
const ProfessionalLogin = ({ navigation }) => {
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

export default ProfessionalLogin;
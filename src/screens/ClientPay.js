import { CloseIcon, IconButton, Alert, Collapse, Icon, Text, NativeBaseProvider, Box, Heading, HStack, VStack, FormControl, Input, Button, Center, Link, extendTheme, Fab } from 'native-base';
import React, { useState } from 'react';
import { Fontisto, Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import * as firebasSDK from '../../Firebase';


const Form = (props) => {

    const [showToast, setShowToast] = useState(false);
    const [informationToast, setInformationToast] = useState({
        title: '',
        text: '',
        status: ''
    })
    const handleCash = async () => {
        firebasSDK.auth.createUserWithEmailAndPassword(props.userData.email, props.userData.password)
            .catch(error => {
                setInformationToast({ ["title"]: "Sign up", ["text"]: error.toString(), ["status"]: "error" });
                setShowToast(true)
            })
        try {
            await firebasSDK.db.collection("users").add({
                name: props.userData.name,
                email: props.userData.email,
                phone: props.userData.phone,
                address: props.userData.address,
                type: 'client'
            })
            props.navigation.navigate("ClientMenu");
        } catch (error) {
            setInformationToast({ ["title"]: "Sign up", ["text"]: error.toString(), ["status"]: "error" });
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
                <Box safeArea p="2" py="8" w="100%" bg="primary.50">
                    <Heading textAlign="center" size="lg" fontWeight="600" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }}>
                        Choose your payment method
                    </Heading>

                    <VStack space={3} mt="5" bg="primary.50">
                        <Button mt="2" bg="primary.400" leftIcon={<Icon as={Fontisto} name="paypal" size="sm" />} onPress={() => props.navigation.navigate('ClientMenu')}>
                            PayPal
                        </Button>
                        <Button mt="1" bg="primary.800" leftIcon={<Icon as={FontAwesome5} name="money-bill-wave" size="sm" />} onPress={() => handleCash()}>
                            Cash
                        </Button>
                    </VStack>
                </Box>
            </Center>
        </>
    )
};
const ClientPay = ({ navigation, route }) => {
    const [userData, setUserData] = useState({
        name: route.params.name,
        email: route.params.email,
        password: route.params.password,
        phone: route.params.phone,
        address: route.params.address
    });
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
    console.log(userData)
    return (
        <NativeBaseProvider theme={theme}>
            <Box position="relative" bg="primary.50">
                <Box position="relative" >
                    <Button mt={"30px"} mr={"3"} alignSelf="flex-end" variant="ghost" leftIcon={<Icon as={Fontisto} name="world-o" size="sm" />}>
                        ENG
                    </Button>
                </Box>
            </Box>
            <Form navigation={navigation} userData={userData} />
            <Fab mt={"20px"} onPress={() => navigation.goBack()} renderInPortal={false} shadow={2} size="4" placement="top-left" icon={<Icon color="white" as={Ionicons} name="chevron-back" size="4" />} />
        </NativeBaseProvider>
    )
}

export default ClientPay;
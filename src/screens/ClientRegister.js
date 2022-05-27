import { ScrollView, CloseIcon, IconButton, Alert, Collapse, Pressable, Icon, Text, NativeBaseProvider, Box, Heading, HStack, VStack, FormControl, Input, Button, Center, Link, extendTheme, Fab } from 'native-base';
import React, { useState } from 'react';
import { Fontisto, Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";

const Form = (props) => {

    const [show, setShow] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [showToast, setShowToast] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });
    const [informationToast, setInformationToast] = useState({
        title: '',
        text: '',
        status: ''
    })
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChangeText = (name, value) => {
        setUserData({ ...userData, [name]: value });
    }
    const handleNext = () => {
        if (userData.name != '' && userData.email != '' && userData.password != '' && userData.phone != '' && userData.address != '' && confirmPassword != '') {
            if (confirmPassword === userData.password) {
                props.navigation.navigate("ClientPay", { name: userData.name, email: userData.email, password: userData.password, phone: userData.phone, address: userData.address })
            }
            else {
                setInformationToast({ ["title"]: "Error", ["text"]: "The password is different", ["status"]: "error" });
                setShowToast(true)
                console.log("No son iguales");
            }
        }
        else {
            setInformationToast({ ["title"]: "Warning", ["text"]: "There are empty fields, verify please", ["status"]: "warning" });
            setShowToast(true)
        }
    }
    const handleClick = () => setShow(!show)
    const handleClickConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

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
                <Box mt={"-180px"} safeArea p="2" py="8" w="100%" bg="primary.50">
                    <Heading textAlign="center" size="lg" fontWeight="600" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }}>
                        I'm a Client
                    </Heading>
                    <Heading textAlign="center" mt="2" _dark={{
                        color: "warmGray.200"
                    }} color="coolGray.600" fontWeight="medium" size="xs">
                        Register
                    </Heading>
                    <ScrollView maxW="500" h="500px" _contentContainerStyle={{
                        px: "20px",
                        mb: "4",
                        minW: "72"
                    }}>
                        <VStack space={3} mt="5" bg="primary.50">

                            <FormControl>
                                <FormControl.Label>Full name</FormControl.Label>
                                <Input onChangeText={(value) => { handleChangeText('name', value) }} placeholder="Full Name" borderColor={"black"} />
                            </FormControl>

                            <FormControl>
                                <FormControl.Label>Email</FormControl.Label>
                                <Input onChangeText={(value) => { handleChangeText('email', value) }} placeholder="example@email.com" borderColor={"black"} />
                            </FormControl>

                            <FormControl>
                                <FormControl.Label>Password</FormControl.Label>
                                <Input onChangeText={(value) => { handleChangeText('password', value) }} type={show ? "text" : "password"} placeholder="Enter your password" borderColor={"black"}
                                    InputRightElement={
                                        <Pressable p={2} borderWidth={0} onPress={handleClick}>
                                            <Icon as={<MaterialIcons name={show ? "visibility-off" : "visibility"} />} size={5} name="home" />
                                        </Pressable>
                                    }
                                />
                            </FormControl>

                            <FormControl>
                                <FormControl.Label>Confirm Password</FormControl.Label>
                                <Input onChangeText={(value) => { setConfirmPassword(value) }} type={showConfirmPassword ? "text" : "password"} placeholder="Enter your password" borderColor={"black"}
                                    InputRightElement={
                                        <Pressable p={2} borderWidth={0} onPress={handleClickConfirmPassword}>
                                            <Icon as={<MaterialIcons name={showConfirmPassword ? "visibility-off" : "visibility"} />} size={5} name="home" />
                                        </Pressable>
                                    }
                                />
                            </FormControl>

                            <FormControl>
                                <FormControl.Label>Phone number</FormControl.Label>
                                <Input onChangeText={(value) => { handleChangeText('phone', value) }} placeholder="1234567890" borderColor={"black"} />
                            </FormControl>

                            <FormControl>
                                <FormControl.Label>Addres</FormControl.Label>
                                <Input onChangeText={(value) => { handleChangeText('address', value) }} placeholder="St. Example" borderColor={"black"} />
                            </FormControl>

                            <Button mt="2" bg="primary.400" onPress={() => { handleNext() }}>
                                Sign up
                            </Button>
                        </VStack>
                    </ScrollView>
                </Box>
            </Center>
        </>
    )
};
const ClientRegister = ({ navigation }) => {
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

export default ClientRegister;
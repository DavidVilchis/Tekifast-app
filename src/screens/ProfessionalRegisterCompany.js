import { ScrollView, CloseIcon, IconButton, Alert, Collapse, Pressable, Icon, Text, NativeBaseProvider, Box, Heading, HStack, VStack, FormControl, Input, Button, Center, Link, extendTheme, Fab } from 'native-base';
import React, { useState } from 'react';
import { Fontisto, Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as firebasSDK from '../../Firebase';

const Form = (props) => {
    const [showToast, setShowToast] = useState(false);
    const [userData, setUserData] = useState({
        name: props.route.params.name,
        email: props.route.params.email,
        password: props.route.params.password,
        phone: props.route.params.phone,
        address: props.route.params.address,
        category: props.route.params.category,
        filter: props.route.params.filter,
        name_company: '',
        ZIP: '',
        company_phone: '',
        company_address: '',
        RFC: ''
    });
    const [informationToast, setInformationToast] = useState({
        title: '',
        text: '',
        status: ''
    })

    const handleChangeText = (name, value) => {
        setUserData({ ...userData, [name]: value });
    }
    const handleNext = async () => {
        if (userData.name_company != '' && userData.ZIP != '' && userData.company_phone != '' && userData.company_address != '' && userData.RFC != '') {
            firebasSDK.auth.createUserWithEmailAndPassword(userData.email, userData.password)
                .then(async () => {
                    try {
                        await firebasSDK.db.collection("users").add({
                            name: userData.name,
                            email: userData.email,
                            phone: userData.phone,
                            address: userData.address,
                            type: 'professional'
                        })
                        await firebasSDK.db.collection("companys").add({
                            email: userData.email,
                            category: userData.category,
                            filter: userData.filter,
                            company_phone: userData.company_phone,
                            name_company: userData.name_company,
                            ZIP: userData.ZIP,
                            company_address: userData.company_address,
                            RFC: userData.RFC
                        })
                        props.navigation.navigate("ProfessionalMenu");
                    } catch (error) {
                        setInformationToast({ ["title"]: "Sign up", ["text"]: error.toString(), ["status"]: "error" });
                        setShowToast(true)
                    }
                })
                .catch(error => {
                    setInformationToast({ ["title"]: "Sign up", ["text"]: error.toString(), ["status"]: "error" });
                    setShowToast(true)
                })
        }
        else {
            setInformationToast({ ["title"]: "Warning", ["text"]: "There are empty fields, verify please", ["status"]: "warning" });
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
                <Box mt={"-180px"} safeArea p="2" py="8" w="100%" bg="primary.50">
                    <Heading textAlign="center" size="lg" fontWeight="600" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }}>
                        Company information
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
                                <FormControl.Label>Name company</FormControl.Label>
                                <Input onChangeText={(value) => { handleChangeText('name_company', value) }} placeholder="Enter your company" borderColor={"black"} />
                            </FormControl>

                            <FormControl>
                                <FormControl.Label>ZIP</FormControl.Label>
                                <Input onChangeText={(value) => { handleChangeText('ZIP', value) }} placeholder="123456" borderColor={"black"} />
                            </FormControl>

                            <FormControl>
                                <FormControl.Label>Company phone</FormControl.Label>
                                <Input onChangeText={(value) => { handleChangeText('company_phone', value) }} placeholder="1234567890" borderColor={"black"} />
                            </FormControl>

                            <FormControl>
                                <FormControl.Label>Company address</FormControl.Label>
                                <Input onChangeText={(value) => { handleChangeText('company_address', value) }} placeholder="St. Example" borderColor={"black"} />
                            </FormControl>

                            <FormControl>
                                <FormControl.Label>RFC</FormControl.Label>
                                <Input onChangeText={(value) => { handleChangeText('RFC', value) }} placeholder="Enter your RFC" borderColor={"black"} />
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
const ProfessionalRegisterCompany = ({ navigation, route }) => {
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
            <Box bg="primary.50" height={"100%"}>
                <Box position="relative" bg="primary.50">
                    <Box position="relative" >
                        <Button mt={"30px"} mr={"3"} alignSelf="flex-end" variant="ghost" leftIcon={<Icon as={Fontisto} name="world-o" size="sm" />}>
                            ENG
                        </Button>
                    </Box>
                </Box>
                <Form navigation={navigation} route={route} />
            </Box>
            <Fab mt={"20px"} onPress={() => navigation.goBack()} renderInPortal={false} shadow={2} size="4" placement="top-left" icon={<Icon color="white" as={Ionicons} name="chevron-back" size="4" />} />
        </NativeBaseProvider>
    )
}

export default ProfessionalRegisterCompany;
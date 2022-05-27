import { Pressable, Icon, Text, NativeBaseProvider, Box, Heading, HStack, VStack, FormControl, Input, Button, Center, Link, extendTheme, Fab } from 'native-base';
import React, {useState} from 'react';
import { Fontisto, Ionicons, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const ProfessionalRegisterCategory = ({ navigation, route }) => {

    const handleNext = (category) =>{
        navigation.navigate("ProfessionalRegisterFilter", { name: userData.name, email: userData.email, password: userData.password, phone: userData.phone, address: userData.address, category: category})
    }

    const [userData, setUserData] = useState({
        name: route.params.name,
        email: route.params.email,
        password: route.params.password,
        phone: route.params.phone,
        address: route.params.address
    });
    console.log(userData);
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
                <Box alignItems={"center"} mt={"40px"} bg="primary.50">
                    <Heading textAlign={"center"}>Choose the category of services to perform</Heading>
                    <VStack>
                        <Pressable mt={"30px"} onPress={() => {handleNext("Online");}}>
                            <Box alignItems={"center"} bgColor={"primary.600"} maxWidth="300" rounded="8">
                                <HStack space={"2"} m={"10px"}>
                                    <Icon as={MaterialCommunityIcons} name={"wifi-strength-4"} color={"white"} size={"md"} />
                                    <Heading color={"white"}>Online</Heading>
                                </HStack>
                            </Box>
                        </Pressable>
                        <Pressable mt={"30px"} onPress={() => {handleNext("FaceToFace");}}>
                            <Box alignItems={"center"} bgColor={"primary.600"} maxWidth="300" rounded="8">
                                <HStack space={"2"} m={"10px"}>
                                    <Icon as={MaterialCommunityIcons} name={"toolbox"} size={"md"} color={"white"}/>
                                    <Heading color={"white"}>Face to Face</Heading>
                                </HStack>
                            </Box>
                        </Pressable>
                    </VStack>
                </Box>
            </Box>
            <Fab mt={"20px"} onPress={() => navigation.goBack()} renderInPortal={false} shadow={2} size="4" placement="top-left" icon={<Icon color="white" as={Ionicons} name="chevron-back" size="4" />} />
        </NativeBaseProvider>
    )
}

export default ProfessionalRegisterCategory;
import { Checkbox, Pressable, Icon, Text, NativeBaseProvider, Box, Heading, HStack, VStack, FormControl, Input, Button, Center, Link, extendTheme, Fab } from 'native-base';
import React, { useState } from 'react';
import { Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const ProfessionalRegisterFilter = ({ navigation, route }) => {

    const handleNext = (filter) =>{
        navigation.navigate('ProfessionalRegisterCompany', { name: userData.name, email: userData.email, password: userData.password, phone: userData.phone, address: userData.address, category: userData.category, filter: filter})
    }

    const [userData, setUserData] = useState({
        name: route.params.name,
        email: route.params.email,
        password: route.params.password,
        phone: route.params.phone,
        address: route.params.address,
        category: route.params.category
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
                    <Heading textAlign={"center"}>Choose your filter</Heading>
                    <VStack>
                        <Fab onPress={() => {handleNext("Food")}} renderInPortal={false} shadow={2} placement="top" size="lg" mt={"20px"} icon={<Icon color="white" as={MaterialCommunityIcons} name="food-fork-drink" size="6" />} label="Food" />
                        <Fab onPress={() => {handleNext("Photographer")}} renderInPortal={false} shadow={2} placement="top" size="lg" mt={"20px"} icon={<Icon color="white" as={MaterialIcons} name="photo-camera" size="6" />} label="Photographer" />
                        <Fab onPress={() => {handleNext("Programmer")}} renderInPortal={false} shadow={2} placement="top" size="lg" mt={"20px"} icon={<Icon color="white" as={MaterialIcons} name="computer" size="6" />} label="Programmer" />
                        <Fab onPress={() => {handleNext("WebDesigner")}} renderInPortal={false} shadow={2} placement="top" size="lg" mt={"20px"} icon={<Icon color="white" as={MaterialIcons} name="web" size="6" />} label="Web designer" />
                    </VStack>
                </Box>
            </Box>
            <Fab mt={"20px"} onPress={() => navigation.goBack()} renderInPortal={false} shadow={2} size="4" placement="top-left" icon={<Icon color="white" as={Ionicons} name="chevron-back" size="4" />} />
        </NativeBaseProvider>
    )
}

export default ProfessionalRegisterFilter;
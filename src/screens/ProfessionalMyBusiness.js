import React from 'react';
import { NativeBaseProvider, Heading, Fab, extendTheme, Icon, Image, Box, Text, Pressable, HStack } from 'native-base';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const ProfessionalMyBusiness = () => {
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
            <Box alignItems={"center"} mt={"50px"}>
                <HStack>
                <Image source={{ uri: "https://scontent.fagu3-1.fna.fbcdn.net/v/t1.6435-9/32769182_930496470445910_155290997922725888_n.png?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeEarCNrFhG_YgCqljpJRlkejVO6yj0VGSCNU7rKPRUZIC6y8fdNnAkupiORTfsCtM0SChuzcmzD5ON0oV-8idqc&_nc_ohc=_Wme9O9-ZYcAX85qWmr&tn=d6r7CYLfODQwSxM5&_nc_ht=scontent.fagu3-1.fna&oh=00_AT8Kl8mHI-iLQVBLtx0Q44yPdXFBiKxMRMon5ZCjyKs3fQ&oe=6291A6B9" }} borderRadius={100} alt="Alternate Text" size="xl" />
                <Box position="relative" mt={"30%"} ml={"-10px"}>
                        <Pressable>
                            <Icon as={MaterialCommunityIcons} name="circle-edit-outline" size={27} color="black" />
                        </Pressable>
                    </Box>
                </HStack>
                <Heading color={"primary.600"} size={"xl"}>MagicSoft</Heading>
                <Text bold={"bold"}>Category of services: Online</Text>
                <Text bold={"bold"}>Categories: Programmer</Text>
            </Box>
            <Heading mt={"20px"} size={"md"} textAlign={"center"}>Company Information</Heading>
            <Box ml={"20px"}>
                <Text bold={"bold"} mt={"5px"}>Company ZIP: 20100</Text>
                <Text bold={"bold"} mt={"5px"}>Company phone: 4491234567</Text>
                <Text bold={"bold"} mt={"5px"}>Company RFC: FD1GD2FG</Text>
            </Box>
            <Box mt={"20px"} ml={"20px"}>
                <Pressable>
                    <Box>
                        <HStack>
                            <Icon as={MaterialCommunityIcons} name="star-box-multiple" size={"sm"} />
                            <Text ml={"5px"} fontSize={"md"} bold={"bold"}>Business Review</Text>
                        </HStack>
                    </Box>
                </Pressable>
                <Pressable mt={"10px"}>
                    <Box>
                        <HStack>
                            <Icon as={MaterialCommunityIcons} name="google-maps" size={"sm"} />
                            <Text ml={"5px"} fontSize={"md"} bold={"bold"}>Location</Text>
                        </HStack>
                    </Box>
                </Pressable>
            </Box>
        </NativeBaseProvider>
    )
}

export default ProfessionalMyBusiness;
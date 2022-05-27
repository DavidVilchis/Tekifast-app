import React from 'react';
import { NativeBaseProvider, Heading, extendTheme, Box, Pressable, VStack, HStack, Avatar, Badge, Spacer, Center, Text, Flex, ScrollView, useTheme } from 'native-base'

const Request = (props) => {
    return (
        <Pressable onPress={() => console.log("Hola")} mt="15px">
            <Box maxWidth="400" borderWidth="1" borderColor="coolGray.300" bg="coolGray.100" p="5" rounded="8">
                <HStack space={"3"} alignItems="center">
                    <Avatar bg="green.500" alignSelf="center" size="sm" source={{
                        uri: props.image
                    }}>
                        US
                    </Avatar>
                    <Badge colorScheme={props.state} _text={{
                        color: "white"
                    }} variant="solid" rounded="4">
                        {props.stateName}
                    </Badge>
                    <Spacer />
                    <Text fontSize={10} color="coolGray.800">
                        Date: {props.date}
                    </Text>
                </HStack>
                <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="md">
                    {props.name}
                </Text>
                <Text mt="2" fontSize="sm" color="coolGray.700">
                    {props.description}
                </Text>
                <Flex>
                    <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
                        Read More
                    </Text>
                </Flex>
            </Box>
        </Pressable>
    )
}

const ProfessionalHistory = ({ navigation }) => {
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
    const {
        colors
    } = useTheme();
    return (
        <NativeBaseProvider theme={theme}>
            <Box alignItems="center" mt="30px">
                <Heading mt="10px" color={"primary.500"}>H<Heading mt="10px" >istory</Heading></Heading>
                <ScrollView mt="30px" maxW="100%" h="600px" _contentContainerStyle={{
                    px: "20px",
                    mb: "4",
                    minW: "72"
                }}>
                    <Request state="success" stateName="Completed" date="May/01/2022" name="Armando" description="Mi computadora esta muy lenta y no abre lo que son los programas" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDXRgDe0O7ak78g3VNqmPeelIh6E61pkHYWg&usqp=CAU" />
                    <Request state="warning" stateName="In progress" date="Apr/26/2022" name="Cheems" description="Necesito un formateo completo de mi computadora" image="https://i.pinimg.com/474x/0c/18/d4/0c18d4728146722f70ed128dd2832f9c.jpg" />
                    <Request state="danger" stateName="Canceled" date="Apr/20/2022" name="Bigotes" description="Necesito la computadora de la NASA" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgdVuiZpQ6FqipLZPeMcm7SWKaXhDHN5KRdA&usqp=CAU" />
                </ScrollView>
                <ScrollView>
                    
                </ScrollView>
            </Box>
        </NativeBaseProvider>
    )
}

export default ProfessionalHistory;
import React from 'react';
import { NativeBaseProvider, Heading, extendTheme, Box, Pressable, VStack, HStack, Avatar, Badge, Spacer, Center, Text, Flex, ScrollView, useTheme, Link } from 'native-base'

const Request = (props) => {
    return (
        <Pressable onPress={() => props.navigation.navigate('DescriprionJobsClient')} mt="15px">
            <Box maxWidth="300" borderWidth="1" borderColor="coolGray.300" bg="coolGray.100" p="5" rounded="8">
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
                    <Text color="coolGray.800">
                        Date: {props.date}
                    </Text>
                </HStack>
                <Text color="coolGray.800" mt="3" fontWeight="medium" >
                    {props.name}
                </Text>
                <Text mt="2" color="coolGray.700">
                    {props.description}
                </Text>
                <Flex>
                <Link _text={{
                        color: "darkBlue.600",
                    }} onPress={() => props.navigation.navigate('DescriptionJobsClient')}>
                        Read more
                    </Link>
                </Flex>
            </Box>
        </Pressable>
    )
}

const ClientlHistory = ({ navigation }) => {
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

    const {colors} = useTheme();
    return (
        <NativeBaseProvider theme={theme}>
            <Box alignItems="center" mt="30px">
                <Heading mt="10px" color={"primary.500"}>H<Heading mt="10px" >istory</Heading></Heading>
                <ScrollView maxW="300" h="400px" _contentContainerStyle={{
                    px: "20px",
                    mb: "4",
                    minW: "72"
                }}>
                    <Request state="success" stateName="Completed" date="May/01/2022" name=" By: Mariana" description="Quiero mantenimiento para mi pc" image="https://as1.ftcdn.net/v2/jpg/04/74/15/20/1000_F_474152095_oLkSLTnfC5aCQfaZlOlWyuqpaPKw2s3z.jpg" />
                    <Request state="warning" stateName="In progress" date="Apr/27/2022" name="By: Zaira" description="Necesito un formateo" image="https://as1.ftcdn.net/v2/jpg/04/97/31/32/1000_F_497313299_kGWuSFjKIZ6rePqhMWhhUnR89uQ8rg7Q.jpg" />
                    <Request state="success" stateName="Completed" date="Apr/29/2022" name="By: Jonathan" description="Necesito una buena pc" image="https://as2.ftcdn.net/v2/jpg/04/95/99/55/1000_F_495995536_34fFGcMLbalDCMag34yfKpf5lwcTtpUP.jpg" />
                </ScrollView>
                <ScrollView>
                    
                </ScrollView>
            </Box>
        </NativeBaseProvider>
    )
}

export default ClientlHistory;
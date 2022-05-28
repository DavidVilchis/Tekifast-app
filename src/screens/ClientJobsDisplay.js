import React, { useState, useEffect } from 'react';
import { Spinner, Heading, Center, Icon, Fab, Flex, Badge, Spacer, Box, HStack, Pressable, Text, extendTheme, NativeBaseProvider } from 'native-base';
import { Ionicons } from "@expo/vector-icons";
import * as firebaseSDK from '../../Firebase';

const ClientJobsDisplay = ({ navigation, route }) => {
    const registro = [];
    const [tabla, setTabla] = useState([]);
    const [loading, setLoading] = useState(true)

    const getAll = async () => {
        await firebaseSDK.db.collection("companys").where("filter", "==", route.params.job).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    registro.push(doc.data());
                });
                setTabla(registro);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
        setLoading(false)
    }

    useEffect(() => {
        getAll();
    }, [])

    const Request = (props) => {
        console.log(tabla)
        return (
            <Pressable onPress={() => navigation.navigate("ClientCompanyDisplay", { company: props.name_company, email: props.email, category: props.category, filter: props.filter, ZIP: props.ZIP, company_address: props.company_address, company_phone: props.company_phone })} mt="15px">
                <Box maxWidth="400" borderWidth="1" borderColor="coolGray.300" bg="coolGray.100" p="5" rounded="8">
                    <HStack space={"3"} alignItems="center">
                        <Badge colorScheme={props.state} _text={{
                            color: "white"
                        }} variant="solid" rounded="4">
                            {props.title}
                        </Badge>
                        <Text fontSize={10} color="coolGray.800">
                            Rating:
                        </Text>
                    </HStack>
                    <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="md">
                        {props.name_company}
                    </Text>
                    <Text mt="2" fontSize="sm" color="coolGray.700">
                        Company Address: {props.company_address}
                    </Text>
                    <Text mt="2" fontSize="sm" color="coolGray.700">
                        Category: {props.category}
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
    if (loading) {
        return (
            <NativeBaseProvider theme={theme}>
                <Center mt={"50px"}>
                    <Heading mt="10px" color={"primary.500"}>{route.params.job}</Heading>
                </Center>
                <HStack space={2} mt={"100px"} justifyContent="center">
                    <Spinner accessibilityLabel="Loading posts" />
                    <Heading color="primary.500" fontSize="md">
                        Loading
                    </Heading>
                </HStack>
            </NativeBaseProvider >
        )
    }
    return (
        <NativeBaseProvider theme={theme}>
            <Center mt={"50px"}>
                <Heading mt="10px" color={"primary.500"}>{route.params.job}</Heading>
            </Center>
            {
                tabla.map(dataItem => (
                    <Request title={route.params.job} id={dataItem.id} name_company={dataItem.name_company} company_address={dataItem.company_address} filter={dataItem.filter} ZIP={dataItem.ZIP} company_phone={dataItem.company_phone} category={dataItem.category} email={dataItem.email} />
                ))
            }
            <Fab mt={"20px"} onPress={() => navigation.goBack()} renderInPortal={false} shadow={2} size="4" placement="top-left" icon={<Icon color="white" as={Ionicons} name="chevron-back" size="4" />} />
        </NativeBaseProvider>
    )
}

export default ClientJobsDisplay;
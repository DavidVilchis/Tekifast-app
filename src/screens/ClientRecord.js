import React, { useEffect, useState } from 'react';
import { Spinner, Icon, NativeBaseProvider, Heading, extendTheme, Box, Pressable, VStack, HStack, Avatar, Badge, Spacer, Center, Text, Flex, ScrollView, useTheme, Link, Button } from 'native-base'
import { Ionicons } from '@expo/vector-icons';
import * as firebaseSDK from '../../Firebase';

const Request = (props) => {
    return (
        <Pressable onPress={() => props.navigation.navigate('ClientJobDescription', { id: props.id, state: props.state, stateName: props.stateName, name: props.name, date: props.date, short_description: props.description, complete_description: props.complete_description })} mt="15px">
            <Box maxWidth="500" borderWidth="1" borderColor="coolGray.300" bg="coolGray.100" p="5" rounded="8">
                <HStack space={"3"} alignItems="center">
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
                    By: {props.name}
                </Text>
                <Text mt="2" color="coolGray.700">
                    {props.description}
                </Text>
                <Flex>
                    <Link _text={{
                        color: "darkBlue.600",
                    }} onPress={() => props.navigation.navigate('ClientJobDescription', { state: props.state, stateName: props.stateName, name: props.name, date: props.date, short_description: props.description, complete_description: props.complete_description })}>
                        Read more
                    </Link>
                </Flex>
            </Box>
        </Pressable>
    )
}

const ClientlHistory = ({ navigation }) => {
    const [loading, setLoading] = useState(true)
    const registro = [];
    const [tabla, setTabla] = useState([]);
    const getAll = async () => {
        await firebaseSDK.db.collection("requests").where("email_client", "==", firebaseSDK.auth.currentUser?.email).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const { state_name, name_company, date, short_description, complete_description } = doc.data();
                    registro.push({
                        id: doc.id,
                        state_name,
                        name_company,
                        date,
                        short_description,
                        complete_description
                    });
                });
                setTabla(registro);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
        setLoading(false);
    }
    useEffect(() => {
        getAll()
    }, [])
    const handleColorState = (state) => {
        if (state === 'Pendient') {
            return "muted";
        } else if (state === 'Completed') {
            return "success";
        } else if (state === 'In progress') {
            return "warning";
        } else if (state === 'Canceled') {
            return "danger";
        }
    }
    console.log(tabla)
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
                <Box alignItems="center" mt="30px">
                    <Heading mt="10px" color={"primary.500"}>H<Heading mt="10px" >istory</Heading></Heading>
                </Box>
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
            <Box alignItems="center" mt="30px">
                <Heading mt="10px" color={"primary.500"}>H<Heading mt="10px" >istory</Heading></Heading>
                <Button leftIcon={<Icon as={Ionicons} name="refresh" size="sm" />} mt={"10px"} w={"50%"} onPress={() => { setLoading(true); getAll(); }}>
                    Refresh
                </Button>
                <ScrollView maxW="100%" h="600px" _contentContainerStyle={{
                    px: "20px",
                    mb: "4",
                    minW: "72"
                }}>
                    {
                        tabla.map(dataItem => (
                            <Request id={dataItem.id} navigation={navigation} key={dataItem.id} state={handleColorState(dataItem.state_name)} name={dataItem.name_company} stateName={dataItem.state_name} date={dataItem.date} description={dataItem.short_description} complete_description={dataItem.complete_description} />
                        ))
                    }
                </ScrollView>
                <ScrollView>

                </ScrollView>
            </Box>
        </NativeBaseProvider>
    )
}

export default ClientlHistory;
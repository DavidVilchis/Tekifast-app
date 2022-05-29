import React, { useEffect, useState } from 'react';
import { Spinner, Alert, Collapse, Button, extendTheme, NativeBaseProvider, Heading, Box, Avatar, HStack, VStack, Text, Fab, Icon, IconButton, CloseIcon } from 'native-base';
import { Ionicons } from "@expo/vector-icons";
import * as firebasSDK from '../../Firebase';

const ProfessionalJobDescription = ({ navigation, route }) => {
    const registro = [];
    const [tabla, setTabla] = useState([])
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState("")
    const getDataAll = async () => {
        const dbRef = firebasSDK.db.collection("requests").doc(route.params.id)
        const doc = await dbRef.get();
        const { email_client, notifcation, state_name, name_company, date, short_description, complete_description } = doc.data();
        registro.push({
            id: doc.id,
            state_name,
            name_company,
            date,
            short_description,
            complete_description,
            notifcation,
        });
        firebasSDK.db.collection("users").where("email", "==", email_client).get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setName(doc.data().name)
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
        setTabla(registro);
        setLoading(false)
    }
    const [show, setShow] = useState(false);
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
        getDataAll();
        return (
            <NativeBaseProvider theme={theme}>
                <HStack space={2} mt={"100px"} justifyContent="center">
                    <Spinner accessibilityLabel="Loading posts" />
                    <Heading color="primary.500" fontSize="md">
                        Loading
                    </Heading>
                </HStack>
            </NativeBaseProvider>
        )
    }
    return (
        <NativeBaseProvider theme={theme}>
            <Fab mt={"20px"} onPress={() => navigation.goBack()} renderInPortal={false} shadow={2} size="4" placement="top-left" icon={<Icon color="white" as={Ionicons} name="chevron-back" size="4" />} />
            <Collapse isOpen={show}>
                <Alert mt={"70px"} w="100%" maxW="400" status="success">
                    <VStack space={1} flexShrink={1} w="100%">
                        <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                            <HStack flexShrink={1} space={2} alignItems="center">
                                <Alert.Icon />
                                <Text fontSize="md" fontWeight="medium" _dark={{
                                    color: "coolGray.800"
                                }}>
                                    Status Request
                                </Text>
                            </HStack>
                            <IconButton variant="unstyled" _focus={{
                                borderWidth: 0
                            }} icon={<CloseIcon size="3" color="coolGray.600" />} onPress={() => setShow(false)} />
                        </HStack>
                        <Box pl="6" _dark={{
                            _text: {
                                color: "coolGray.600"
                            }
                        }}>
                            You accepted this job!
                        </Box>
                    </VStack>
                </Alert>
            </Collapse>
            {
                tabla.map(dataItem => (
                    <>
                        <Box key={dataItem.id}>
                            <Box mt={!show ? '90px' : '10px'} ml={'20px'}>
                                <HStack space={"2"}>
                                    <VStack>
                                        <Heading color={"primary.500"}>{name}</Heading>
                                        <Heading size={'sm'}>Date: {dataItem.date}</Heading>
                                    </VStack>
                                </HStack>
                            </Box>
                            <Box m={'20px'}>
                                <Heading size={'md'}>Short Description</Heading>
                                <Text>{dataItem.short_description}</Text>
                                <Heading size={'md'} mt={"5px"}>Complete Description</Heading>
                                <Text>{dataItem.complete_description}</Text>
                            </Box>
                            <Box mt={'20px'} alignItems={'center'}>
                                <HStack space={"2"}>
                                    <Button variant={"outline"} colorScheme={"danger"}>Decline</Button>
                                    <Button colorScheme={"success"} onPress={() => setShow(true)}>Accept</Button>
                                </HStack>
                            </Box>
                        </Box>
                    </>
                ))
            }

        </NativeBaseProvider>
    )
}

export default ProfessionalJobDescription;

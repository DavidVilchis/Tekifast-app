import React, { useEffect, useState } from 'react';
import { Spinner, Flex, Spacer, Badge, Pressable, CloseIcon, IconButton, Alert, TextArea, Collapse, Modal, FormControl, NativeBaseProvider, Center, Heading, Fab, Icon, extendTheme, HStack, Text, VStack, Button, Box, ScrollView } from 'native-base';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as firebaseSDK from '../../Firebase';

const ClientCompanyDisplay = ({ navigation, route }) => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [showToast, setShowToast] = useState(false);
    const fecha = new Date();
    const registro = [];
    const [tabla, setTabla] = useState([]);
    const [loading, setLoading] = useState(true)

    const getDataAll = async () => {
        await firebaseSDK.db.collection("requests").where("email_company", "==", route.params.email).get()
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
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
            setLoading(false)
    }

    useEffect(() => {
        firebaseSDK.db.collection("users").where("email", "==", route.params.email).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setName(doc.data().name)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
        getDataAll();
    }, [])
    const [informationToast, setInformationToast] = useState({
        title: '',
        text: '',
        status: ''
    })
    const [requestData, setRequestData] = useState({
        name_company: route.params.company,
        email_company: route.params.email,
        email_client: firebaseSDK.auth.currentUser?.email,
        short_description: '',
        complete_description: ''
    })
    const handleChangeText = (name, value) => {
        setRequestData({ ...requestData, [name]: value });
    }
    const handleSave = async () => {
        try {
            await firebaseSDK.db.collection("requests").add({
                name_company: requestData.name_company,
                email_company: requestData.email_company,
                email_client: requestData.email_client,
                short_description: requestData.short_description,
                complete_description: requestData.complete_description,
                state_name: "Pendient",
                date: fecha.toLocaleDateString()
            })
            setInformationToast({ ["title"]: "New Request", ["text"]: "Your request is saved!", ["status"]: "success" });
            setShowToast(true)
            setShowModal(false);
            getDataAll();
        } catch (error) {

        }
    }
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
    const Request = (props) => {
        return (
            <Pressable onPress={() => props.navigation.navigate('ClientJobDescription', { id: props.id, state: props.state, stateName: props.stateName, name: props.name, date: props.date, short_description: props.description, complete_description: props.complete_description })} mt="15px">
                <Box maxWidth="400" borderWidth="1" borderColor="coolGray.300" bg="coolGray.100" p="5" rounded="8">
                    <HStack space={"3"} alignItems="center">
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
                    <Heading mt="30px" color={"primary.500"} size={"2xl"}>{route.params.company}</Heading>
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
            <Collapse isOpen={showToast}>
                <Alert mt={"100px"} w="100%" status={informationToast.status}>
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
            <Center>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>New Request</Modal.Header>
                        <Modal.Body>
                            <FormControl>
                                <FormControl.Label>Date: {fecha.toLocaleDateString()}</FormControl.Label>
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>Short description</FormControl.Label>
                                <TextArea placeholder='Enter a short and simple description' onChangeText={(value) => { handleChangeText("short_description", value) }} />
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>Complete description</FormControl.Label>
                                <TextArea placeholder='Enter the complete description, with all specifics' onChangeText={(value) => { handleChangeText("complete_description", value) }} />
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                    setShowModal(false);
                                }}>
                                    Cancel
                                </Button>
                                <Button onPress={() => {
                                    handleSave()
                                }}>
                                    Save
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Center>
            <Center mt={"50px"}>
                <Heading mt="30px" color={"primary.500"} size={"2xl"}>{route.params.company}</Heading>
                <Heading mt={"10px"} size={"md"} color={"primary.600"}>{name}</Heading>
                <Heading mt={"10px"} size={"sm"}>{route.params.filter}</Heading>
                <HStack space={2} mt={"10px"}>
                    <MaterialCommunityIcons name="briefcase-account-outline" size={35} color="black" />
                    <Text color="black" fontSize="xl" fontWeight={"bold"}>
                        {route.params.category}
                    </Text>
                </HStack>
            </Center>
            <HStack space={2} ml={"30px"} mt={"30px"}>
                <MaterialCommunityIcons name="email" size={24} color="black" />
                <Text color="black" fontSize="md" fontWeight={"bold"}>
                    {route.params.email}
                </Text>
            </HStack>
            <HStack space={2} ml={"30px"} mt={"10px"}>
                <MaterialCommunityIcons name="mailbox-outline" size={24} color="black" />
                <Text color="black" fontSize="md" fontWeight={"bold"}>
                    ZIP: {route.params.ZIP}
                </Text>
            </HStack>
            <HStack space={2} ml={"30px"} mt={"10px"}>
                <MaterialCommunityIcons name="home" size={24} color="black" />
                <Text color="black" fontSize="md" fontWeight={"bold"}>
                    {route.params.company_address}
                </Text>
            </HStack>
            <HStack space={2} ml={"30px"} mt={"10px"}>
                <MaterialCommunityIcons name="cellphone" size={24} color="black" />
                <Text color="black" fontSize="md" fontWeight={"bold"}>
                    {route.params.company_phone}
                </Text>
            </HStack>
            <VStack mt={"40px"} alignItems={"center"}>
                <Button bgColor={"primary.800"} onPress={() => { setShowModal(true) }} width={"50%"}>New Request</Button>
            </VStack>
            <Heading textAlign={"center"} mt={"30px"} size={"md"} color={"primary.600"}>Our history</Heading>
            <ScrollView maxW="100%">
                {
                    tabla.map(dataItem => (
                        <Request id={dataItem.id} navigation={navigation} key={dataItem.id} state={handleColorState(dataItem.state_name)} name={dataItem.name_company} stateName={dataItem.state_name} date={dataItem.date} description={dataItem.short_description} complete_description={dataItem.complete_description} />
                    ))
                }
            </ScrollView>
            <Fab mt={"20px"} onPress={() => navigation.goBack()} renderInPortal={false} shadow={2} size="4" placement="top-left" icon={<Icon color="white" as={Ionicons} name="chevron-back" size="4" />} />
        </NativeBaseProvider>
    )
}

export default ClientCompanyDisplay;
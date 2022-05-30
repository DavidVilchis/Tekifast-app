import React, { useEffect, useState } from 'react';
import { Center, Input, FormControl, Modal, Badge, Spinner, Alert, Collapse, Button, extendTheme, NativeBaseProvider, Heading, Box, Avatar, HStack, VStack, Text, Fab, Icon, IconButton, CloseIcon, ScrollView } from 'native-base';
import { Ionicons } from "@expo/vector-icons";
import * as firebasSDK from '../../Firebase';

const ProfessionalJobDescription = ({ navigation, route }) => {
    const registro = [];
    const [tabla, setTabla] = useState([])
    const [loading, setLoading] = useState(true)
    const [showToast, setShowToast] = useState(false);
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [showModal, setShowModal] = useState(false);
    const registroReview = [];
    const [tablaReview, setTablaReview] = useState([])

    const [informationToast, setInformationToast] = useState({
        title: '',
        text: '',
        status: ''
    })
    const getDataAll = async () => {
        const dbRef = firebasSDK.db.collection("requests").doc(route.params.id)
        const doc = await dbRef.get();
        const { amount, email_company, email_client, notifcation, state_name, name_company, date, short_description, complete_description } = doc.data();
        registro.push({
            id: doc.id,
            state_name,
            name_company,
            date,
            short_description,
            complete_description,
            notifcation,
            email_client,
            email_company,
            amount
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
        console.log(route.params.id)
        firebasSDK.db.collection("reviews").where("id_request", "==", route.params.id).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const { advisor, id_request, rating } = doc.data()
                    registroReview.push({
                        id: doc.id,
                        advisor: advisor,
                        id_request: id_request,
                        rating: rating
                    });
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
        setTablaReview(registroReview)
        setTabla(registro);
        setLoading(false)
    }
    const [show, setShow] = useState(false);
    const handleAccept = async (id) => {
        const dbRef = firebasSDK.db.collection("requests").doc(id);
        await dbRef.set({
            complete_description: tabla[0]["complete_description"],
            date: tabla[0]["date"],
            email_client: tabla[0]["email_client"],
            email_company: tabla[0]["email_company"],
            name_company: tabla[0]["name_company"],
            short_description: tabla[0]["short_description"],
            state_name: "In progress"
        })
        setInformationToast({ ["title"]: "Status Request", ["text"]: "You accepted this request!", ["status"]: "success" });
        setShowToast(true)
        getDataAll()
    }
    const handleDecline = async (id) => {
        const dbRef = firebasSDK.db.collection("requests").doc(id);
        await dbRef.set({
            complete_description: tabla[0]["complete_description"],
            date: tabla[0]["date"],
            email_client: tabla[0]["email_client"],
            email_company: tabla[0]["email_company"],
            name_company: tabla[0]["name_company"],
            short_description: tabla[0]["short_description"],
            state_name: "Cancelled"
        })
        setInformationToast({ ["title"]: "Status Request", ["text"]: "You declined or cancelled this request", ["status"]: "success" });
        setShowToast(true)
        getDataAll()
    }
    const handlePayment = async () => {
        const dbRef = firebasSDK.db.collection("requests").doc(tabla[0]["id"]);
        await dbRef.set({
            complete_description: tabla[0]["complete_description"],
            date: tabla[0]["date"],
            email_client: tabla[0]["email_client"],
            email_company: tabla[0]["email_company"],
            name_company: tabla[0]["name_company"],
            short_description: tabla[0]["short_description"],
            state_name: "Completed",
            amount: amount
        })
        setInformationToast({ ["title"]: "Status Request", ["text"]: "You finished this request!", ["status"]: "success" });
        setShowToast(true)
        setShowModal(false)
        getDataAll()
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
    const StarsReview = (props) => {
        if (props.rating === 5) {
            return (
                <>
                    <Box m={"5px"} bgColor={'primary.100'} borderRadius={"xl"}>
                        <Text ml={"20px"} mt={"20px"}>{props.advisor}</Text>
                        <HStack ml={"20px"} mb={"20px"}>
                            <Ionicons name="star" size={24} color="black" />
                            <Ionicons name="star" size={24} color="black" />
                            <Ionicons name="star" size={24} color="black" />
                            <Ionicons name="star" size={24} color="black" />
                            <Ionicons name="star" size={24} color="black" />
                        </HStack>
                    </Box>
                </>
            )
        }
        if (props.rating === 4) {
            return (
                <>
                    <Box m={"5px"} bgColor={'primary.100'} borderRadius={"xl"}>
                        <Text ml={"20px"} mt={"20px"}>{props.advisor}</Text>
                        <HStack ml={"20px"} mb={"20px"}>
                            <Ionicons name="star" size={24} color="black" />
                            <Ionicons name="star" size={24} color="black" />
                            <Ionicons name="star" size={24} color="black" />
                            <Ionicons name="star" size={24} color="black" />
                        </HStack>
                    </Box>
                </>
            )
        }
        if (props.rating === 3) {
            return (
                <>
                    <Box m={"5px"} bgColor={'primary.100'} borderRadius={"xl"}>
                        <Text ml={"20px"} mt={"20px"}>{props.advisor}</Text>
                        <HStack ml={"20px"} mb={"20px"}>
                            <Ionicons name="star" size={24} color="black" />
                            <Ionicons name="star" size={24} color="black" />
                            <Ionicons name="star" size={24} color="black" />
                        </HStack>
                    </Box>
                </>
            )
        }
        if (props.rating === 2) {
            return (
                <>
                    <Box m={"5px"} bgColor={'primary.100'} borderRadius={"xl"}>
                        <Text ml={"20px"} mt={"20px"}>{props.advisor}</Text>
                        <HStack ml={"20px"} mb={"20px"}>
                            <Ionicons name="star" size={24} color="black" />
                            <Ionicons name="star" size={24} color="black" />
                        </HStack>
                    </Box>
                </>
            )
        }
        if (props.rating === 1) {
            return (
                <>
                    <Box m={"5px"} bgColor={'primary.100'} borderRadius={"xl"}>
                        <Text ml={"20px"} mt={"20px"}>{props.advisor}</Text>
                        <HStack ml={"20px"} mb={"20px"}>
                            <Ionicons name="star" size={24} color="black" />
                        </HStack>
                    </Box>
                </>
            )
        }
    }
    const handleColorState = (state) => {
        if (state === 'Pendient') {
            return "muted";
        } else if (state === 'Completed') {
            return "success";
        } else if (state === 'In progress') {
            return "warning";
        } else if (state === 'Cancelled') {
            return "danger";
        }
    }
    const handleShowButton = (state, id, amount) => {
        if (state === 'Pendient') {
            return (
                <>
                    <Box mt={'20px'} alignItems={'center'}>
                        <HStack space={"2"}>
                            <Button variant={"outline"} onPress={() => handleDecline(id)} colorScheme={"danger"}>Decline</Button>
                            <Button colorScheme={"success"} onPress={() => handleAccept(id)}>Accept</Button>
                        </HStack>
                    </Box>
                </>
            )
        } else if (state === 'Completed') {
            return (
                <>
                    <Box ml={'20px'}>
                        <Heading size={'md'}>Amount</Heading>
                        <Text>${amount} MX</Text>
                        <Heading size={'md'}>Reviews</Heading>
                    </Box>
                </>
            )
        } else if (state === 'In progress') {
            return (
                <>
                    <Box mt={'20px'} alignItems={'center'}>
                        <HStack space={"2"}>
                            <Button onPress={() => handleDecline(id)} colorScheme={"danger"}>Cancel</Button>
                            <Button colorScheme={"success"} onPress={() => setShowModal(true)}>Finish</Button>
                        </HStack>
                    </Box>
                </>
            )
        }
    }
    return (
        <NativeBaseProvider theme={theme}>
            <Fab mt={"20px"} onPress={() => navigation.goBack()} renderInPortal={false} shadow={2} size="4" placement="top-left" icon={<Icon color="white" as={Ionicons} name="chevron-back" size="4" />} />
            <Center>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Payment</Modal.Header>
                        <Modal.Body>
                            <FormControl>
                                <FormControl.Label>Amount</FormControl.Label>
                                <Input onChangeText={(value) => setAmount(value)} />
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
                                    handlePayment()
                                }}>
                                    Save
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Center>
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
                            <Badge ml={"20px"} width={"25%"} colorScheme={handleColorState(dataItem.state_name)} _text={{
                                color: "white"
                            }} variant="solid" rounded="4">
                                {dataItem.state_name}
                            </Badge>
                            <Box m={'20px'}>
                                <Heading size={'md'}>Short Description</Heading>
                                <Text>{dataItem.short_description}</Text>
                                <Heading size={'md'} mt={"5px"}>Complete Description</Heading>
                                <Text>{dataItem.complete_description}</Text>
                            </Box>
                            {
                                handleShowButton(dataItem.state_name, dataItem.id, dataItem.amount)
                            }
                            <ScrollView m={"20px"}>
                                {
                                    tablaReview.map(dataItem => (
                                        <StarsReview id={dataItem.id} key={dataItem.id} rating={dataItem.rating} advisor={dataItem.advisor} />
                                    ))
                                }
                            </ScrollView>
                        </Box>
                    </>
                ))
            }

        </NativeBaseProvider>
    )
}

export default ProfessionalJobDescription;

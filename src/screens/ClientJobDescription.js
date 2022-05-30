import React, { useState, useEffect } from 'react';
import { Spinner, Center, Modal, Badge, Alert, Collapse, Button, extendTheme, NativeBaseProvider, Heading, Box, Avatar, HStack, VStack, Text, Fab, Icon, IconButton, CloseIcon, ScrollView, FormControl, TextArea } from 'native-base';
import { Ionicons } from "@expo/vector-icons";
import { AirbnbRating } from 'react-native-ratings';
import * as firebaseSDK from '../../Firebase';

const ClientJobDescription = ({ navigation, route }) => {
    const [show, setShow] = React.useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalDeleteReview, setShowModalDeleteReview] = useState(false);
    const [showModalReview, setShowModalReview] = useState(false);
    const registro = [];
    const [tabla, setTabla] = useState([])
    const registroReview = [];
    const [tablaReview, setTablaReview] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingSave, setLoadingSave] = useState(false)
    const [idReview, setIdReview] = useState("")
    const getDataAll = async () => {
        const dbRef = firebaseSDK.db.collection("requests").doc(route.params.id)
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
        await firebaseSDK.db.collection("reviews").where("id_request", "==", route.params.id).get()
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
        setTablaReview(registroReview);
        setTabla(registro)
        setLoading(false)
    }
    const handleDelete = async () => {
        const dbRef = firebaseSDK.db.collection("requests").doc(route.params.id);
        await dbRef.delete();
        navigation.goBack();
    }
    const handleDeleteReview = async () => {
        const dbRef = firebaseSDK.db.collection("reviews").doc(idReview);
        await dbRef.delete();
        setShowModalDeleteReview(false)
        getDataAll()
    }
    const handleSave = async () => {
        setLoadingSave(true)
        try {
            await firebaseSDK.db.collection("reviews").add({
                id_request: reviewData.id_request,
                advisor: reviewData.advisor,
                rating: reviewData.rating
            })
            setShowModalReview(false)
            setLoadingSave(false)
            getDataAll()
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
        } else if (state === 'Cancelled') {
            return "danger";
        }
    }
    const [reviewData, setReviewData] = useState({
        id_request: route.params.id,
        advisor: '',
        rating: 3
    })
    const handleChangeText = (name, value) => {
        setReviewData({ ...reviewData, [name]: value });
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
    const handleShowButton = (state) => {
        if (state === 'Pendient') {
            return (
                <>
                    <Box mt={'20px'} alignItems={'center'}>
                        <HStack space={"2"}>
                            <Button variant={"outline"} onPress={() => setShowModal(true)} colorScheme={"danger"}>Cancel and Delete</Button>
                        </HStack>
                    </Box>
                </>
            )
        } else if (state === 'Completed') {
            return (
                <>
                    <Box ml={'20px'}>
                        <Heading size={'md'}>Amount</Heading>
                        <Text>${tabla[0]["amount"]} MX</Text>
                        <Box mt={"20px"} alignItems={"center"}>
                            <Button w={"50%"} onPress={() => setShowModalReview(true)}>New review</Button>
                        </Box>
                        <Heading size={'md'}>Reviews</Heading>
                    </Box>
                </>
            )
        }
    }
    const StarsReview = (props) => {
        if (props.rating === 5) {
            return (
                <>
                    <Box m={"5px"} bgColor={'primary.100'} borderRadius={"xl"}>
                        <Text ml={"20px"} mt={"20px"}>{props.advisor}</Text>
                        <HStack ml={"20px"} mb={"5px"}>
                            <Ionicons name="star" size={24} color="black" />
                            <Ionicons name="star" size={24} color="black" />
                            <Ionicons name="star" size={24} color="black" />
                            <Ionicons name="star" size={24} color="black" />
                            <Ionicons name="star" size={24} color="black" />
                        </HStack>
                        <Box alignItems={"center"}>
                            <Button mb={"10px"} width={"25%"} onPress={() => {setShowModalDeleteReview(true); setIdReview(props.id)}} colorScheme={"danger"}>Delete</Button>
                        </Box>
                    </Box>
                </>
            )
        }
        if (props.rating === 4) {
            return (
                <>
                    <Box m={"5px"} bgColor={'primary.100'} borderRadius={"xl"}>
                        <Text ml={"20px"} mt={"20px"}>{props.advisor}</Text>
                        <HStack ml={"20px"} mb={"5px"}>
                            <Ionicons name="star" size={24} color="black" />
                            <Ionicons name="star" size={24} color="black" />
                            <Ionicons name="star" size={24} color="black" />
                            <Ionicons name="star" size={24} color="black" />
                        </HStack>
                        <Box alignItems={"center"}>
                            <Button mb={"10px"} width={"25%"} onPress={() => {setShowModalDeleteReview(true); setIdReview(props.id)}} colorScheme={"danger"}>Delete</Button>
                        </Box>
                    </Box>
                </>
            )
        }
        if (props.rating === 3) {
            return (
                <>
                    <Box m={"5px"} bgColor={'primary.100'} borderRadius={"xl"}>
                        <Text ml={"20px"} mt={"20px"}>{props.advisor}</Text>
                        <HStack ml={"20px"} mb={"5px"}>
                            <Ionicons name="star" size={24} color="black" />
                            <Ionicons name="star" size={24} color="black" />
                            <Ionicons name="star" size={24} color="black" />
                        </HStack>
                        <Box alignItems={"center"}>
                            <Button mb={"10px"} width={"25%"} onPress={() => {setShowModalDeleteReview(true); setIdReview(props.id)}} colorScheme={"danger"}>Delete</Button>
                        </Box>
                    </Box>
                </>
            )
        }
        if (props.rating === 2) {
            return (
                <>
                    <Box m={"5px"} bgColor={'primary.100'} borderRadius={"xl"}>
                        <Text ml={"20px"} mt={"20px"}>{props.advisor}</Text>
                        <HStack ml={"20px"} mb={"5px"}>
                            <Ionicons name="star" size={24} color="black" />
                            <Ionicons name="star" size={24} color="black" />
                        </HStack>
                        <Box alignItems={"center"}>
                            <Button mb={"10px"} width={"25%"} onPress={() => {setShowModalDeleteReview(true); setIdReview(props.id)}} colorScheme={"danger"}>Delete</Button>
                        </Box>
                    </Box>
                </>
            )
        }
        if (props.rating === 1) {
            return (
                <>
                    <Box m={"5px"} bgColor={'primary.100'} borderRadius={"xl"}>
                        <Text ml={"20px"} mt={"20px"}>{props.advisor}</Text>
                        <HStack ml={"20px"} mb={"5px"}>
                            <Ionicons name="star" size={24} color="black" />
                        </HStack>
                        <Box alignItems={"center"}>
                            <Button mb={"10px"} width={"25%"} onPress={() => {setShowModalDeleteReview(true); setIdReview(props.id)}} colorScheme={"danger"}>Delete</Button>
                        </Box>
                    </Box>
                </>
            )
        }
    }
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
            <Center>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Request Delete</Modal.Header>
                        <Modal.Body>
                            Are you sure to delete this request?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button variant="outline" colorScheme="danger" onPress={() => {
                                    setShowModalReview(false);
                                }}>
                                    Cancel
                                </Button>
                                <Button onPress={() => {
                                    handleDelete()
                                }}>
                                    Yes
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
                <Modal isOpen={showModalDeleteReview} onClose={() => setShowModalDeleteReview(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Request Delete</Modal.Header>
                        <Modal.Body>
                            Are you sure to delete this request?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button variant="outline" colorScheme="danger" onPress={() => {
                                    setShowModalDeleteReview(false);
                                }}>
                                    Cancel
                                </Button>
                                <Button onPress={() => {
                                    handleDeleteReview()
                                }}>
                                    Yes
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
                <Modal isOpen={showModalReview} onClose={() => setShowModalReview(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>New review</Modal.Header>
                        <Modal.Body>
                            <AirbnbRating
                                count={5}
                                reviews={["Bad", "Regular", "Good", "Very Good", "Excellent"]}
                                size={20}
                                reviewSize={20}
                                onFinishRating={(value) => handleChangeText("rating", value)}
                            />
                            <FormControl>
                                <FormControl.Label>Advisor</FormControl.Label>
                                <TextArea placeholder='Enter a short and simple tip' onChangeText={(value) => handleChangeText("advisor", value)} />
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button variant="outline" colorScheme="danger" onPress={() => {
                                    setShowModalReview(false);
                                }}>
                                    Cancel
                                </Button>
                                <Button isLoading={loadingSave} onPress={() => {
                                    handleSave()
                                }}>
                                    Saved
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Center>
            <Fab mt={"20px"} onPress={() => navigation.goBack()} renderInPortal={false} shadow={2} size="4" placement="top-left" icon={<Icon color="white" as={Ionicons} name="chevron-back" size="4" />} />
            <Box mt={!show ? '90px' : '10px'} ml={'20px'}>
                <VStack>
                    <Heading color={"primary.500"}>{tabla[0]["name_company"]}</Heading>
                    <Heading size={'sm'}>Date: {tabla[0]["date"]}</Heading>
                    <Badge colorScheme={handleColorState(tabla[0]["state_name"])} _text={{
                        color: "white"
                    }} variant="solid" rounded="4" w={"35%"}>
                        {tabla[0]["state_name"]}
                    </Badge>
                </VStack>
            </Box>
            <Box m={'20px'}>
                <Heading size={'md'}>Short Description</Heading>
                <Text>{tabla[0]["short_description"]}</Text>
                <Heading size={'md'} mt={"5px"}>Complete Description</Heading>
                <Text>{tabla[0]["complete_description"]}</Text>
            </Box>
            {handleShowButton(route.params.stateName)}
            <ScrollView m={"20px"}>
                {
                    tablaReview.map(dataItem => (
                        <StarsReview id={dataItem.id} key={dataItem.id} rating={dataItem.rating} advisor={dataItem.advisor} />
                    ))
                }
            </ScrollView>
        </NativeBaseProvider>
    )
}

export default ClientJobDescription;

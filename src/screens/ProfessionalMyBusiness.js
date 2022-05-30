import React, { useEffect, useState } from 'react';
import { NativeBaseProvider, Heading, Fab, extendTheme, Icon, Image, Box, Text, Pressable, Button, HStack, Spinner, Center, Modal, FormControl, Input } from 'native-base';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as firebaseSDK from '../../Firebase';

const ProfessionalMyBusiness = () => {
    const registro = [];
    const [businessData, setBusinessData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [businessDataEdit, setBusinessDataEdit] = useState({});
    const [showModal, setShowModal] = useState(false);

    const handleChangeText = (name, value) => {
        setBusinessDataEdit({ ...businessDataEdit, [name]: value });
    }
    const getDataAll = async () => {
        await firebaseSDK.db.collection("companys").where("email", "==", firebaseSDK.auth.currentUser?.email).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const { RFC, ZIP, category, company_address, company_phone, email, filter, name_company } = doc.data();
                    registro.push({
                        id: doc.id,
                        RFC: RFC,
                        ZIP: ZIP,
                        category: category,
                        company_address: company_address,
                        company_phone: company_phone,
                        email: email,
                        filter: filter,
                        name_company: name_company
                    })
                    setBusinessData(registro)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
        setLoading(false)
    }
    useEffect(() => {
        getDataAll();
    }, [])
    const handleUpdate = async () => {
        const dbRef = firebaseSDK.db.collection("companys").doc(businessData[0]["id"]);
        await dbRef.set({
            RFC: businessDataEdit.RFC,
            ZIP: businessDataEdit.ZIP,
            category: businessDataEdit.category,
            company_address: businessDataEdit.company_address,
            company_phone: businessDataEdit.company_phone,
            email: businessDataEdit.email,
            filter: businessDataEdit.filter,
            name_company: businessDataEdit.name_company
        })
        setShowModal(false);
        getDataAll();
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
                        <Modal.Header>Profile Edit</Modal.Header>
                        <Modal.Body>
                            <FormControl>
                                <FormControl.Label>Name company</FormControl.Label>
                                <Input value={businessDataEdit.name_company} onChangeText={(value) => handleChangeText("name_company", value)} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>RFC</FormControl.Label>
                                <Input value={businessDataEdit.RFC} onChangeText={(value) => handleChangeText("RFC", value)} />
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>ZIP</FormControl.Label>
                                <Input value={businessDataEdit.ZIP} onChangeText={(value) => handleChangeText("ZIP", value)} />
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>Company address</FormControl.Label>
                                <Input value={businessDataEdit.company_address} onChangeText={(value) => handleChangeText("company_address", value)} />
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>Company phone</FormControl.Label>
                                <Input value={businessDataEdit.company_phone} onChangeText={(value) => handleChangeText("company_phone", value)} />
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
                                    handleUpdate()
                                }}>
                                    Save
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Center>
            <Box alignItems={"center"} mt={"50px"}>
                <HStack>
                    <Image source={{ uri: "https://scontent.fagu3-1.fna.fbcdn.net/v/t1.6435-9/32769182_930496470445910_155290997922725888_n.png?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeEarCNrFhG_YgCqljpJRlkejVO6yj0VGSCNU7rKPRUZIC6y8fdNnAkupiORTfsCtM0SChuzcmzD5ON0oV-8idqc&_nc_ohc=_Wme9O9-ZYcAX85qWmr&tn=d6r7CYLfODQwSxM5&_nc_ht=scontent.fagu3-1.fna&oh=00_AT8Kl8mHI-iLQVBLtx0Q44yPdXFBiKxMRMon5ZCjyKs3fQ&oe=6291A6B9" }} borderRadius={100} alt="Alternate Text" size="xl" />
                    <Box position="relative" mt={"30%"} ml={"-10px"}>
                        <Pressable onPress={() => {
                            setBusinessDataEdit(businessData[0]);
                            setShowModal(true);
                        }}>
                            <Icon as={MaterialCommunityIcons} name="circle-edit-outline" size={27} color="black" />
                        </Pressable>
                    </Box>
                </HStack>
                <Heading color={"primary.600"} size={"xl"}>{businessData[0]["name_company"]}</Heading>
                <Text bold={"bold"}>Category of services: {businessData[0]["category"]}</Text>
                <Text bold={"bold"}>Categories: {businessData[0]["filter"]}</Text>
            </Box>
            <Heading mt={"20px"} size={"md"} textAlign={"center"}>Company Information</Heading>
            <Box ml={"20px"}>
                <Text bold={"bold"} mt={"5px"}>Company ZIP: {businessData[0]["ZIP"]}</Text>
                <Text bold={"bold"} mt={"5px"}>Company phone: {businessData[0]["company_phone"]}</Text>
                <Text bold={"bold"} mt={"5px"}>Company RFC: {businessData[0]["RFC"]}</Text>
            </Box>
            <Box mt={"20px"} ml={"20px"}>
                <Box>
                    <HStack>
                        <Icon as={MaterialCommunityIcons} name="google-maps" size={"sm"} />
                        <Text ml={"5px"} fontSize={"md"} bold={"bold"}>{businessData[0]["company_address"]}</Text>
                    </HStack>
                </Box>
            </Box>
        </NativeBaseProvider>
    )
}

export default ProfessionalMyBusiness;
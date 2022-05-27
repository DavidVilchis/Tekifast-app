import { Modal, Icon, Text, NativeBaseProvider, Box, Heading, HStack, VStack, FormControl, Input, Button, Center, Spacer, extendTheme, Badge, Avatar, Flex, Pressable } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Fontisto, Ionicons, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import * as firebasSDK from '../../Firebase';


const ClientProfile = ({ navigation }) => {
    const handleSignOut = () => {
        firebasSDK.auth.signOut().then(() => {
            navigation.navigate("UserSelect")
        })
            .catch(error => console.log(error))
    }
    const [userData, setUserData] = useState({
        id: '',
        name: '',
        address: '',
        email: '',
        phone: ''
    })
    const [userDataEdit, setUserDataEdit] = useState({});

    const [showModal, setShowModal] = useState(false);
    
    const handleChangeText = (name, value) => {
        setUserDataEdit({ ...userDataEdit, [name]: value });
    }
    const handleUpdate = async () =>{
        const dbRef = firebasSDK.db.collection("users").doc(userData.id);
        await dbRef.set({
            name: userDataEdit.name,
            address: userDataEdit.address,
            phone: userDataEdit.phone,
            email: userDataEdit.email,
            type: "client"
        })
        firebasSDK.db.collection("users").where("email", "==", firebasSDK.auth.currentUser?.email).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setUserData({ ['id']: doc.id, ['name']: doc.data().name, ['address']: doc.data().address, ['email']: doc.data().email, ['phone']: doc.data().phone });
                });
                setShowModal(false);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
    }
    useEffect(() => {
        firebasSDK.db.collection("users").where("email", "==", firebasSDK.auth.currentUser?.email).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setUserData({ ['id']: doc.id, ['name']: doc.data().name, ['address']: doc.data().address, ['email']: doc.data().email, ['phone']: doc.data().phone });
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
    }, [])
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
            <Center>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Profile Edit</Modal.Header>
                        <Modal.Body>
                            <FormControl>
                                <FormControl.Label>Name</FormControl.Label>
                                <Input value={userDataEdit.name} onChangeText={(value) => handleChangeText("name", value)}/>
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>Address</FormControl.Label>
                                <Input value={userDataEdit.address} onChangeText={(value) => handleChangeText("address", value)}/>
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>Phone</FormControl.Label>
                                <Input value={userDataEdit.phone} onChangeText={(value) => handleChangeText("phone", value)}/>
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
            <Box mt={"50px"} alignItems={"center"}>
                <HStack>
                    <Avatar bg="purple.600" alignSelf="center" size="2xl" source={{
                        uri: "https://imagenes.elpais.com/resizer/pK0Or4c41-yQsPSgkLgah604U24=/1960x1103/cloudfront-eu-central-1.images.arcpublishing.com/prisa/PQK2TSGWNVFWZE263CAATCRU5Y.webp"
                    }}>
                        RB
                    </Avatar>
                    <Box position="relative" mt={"30%"} ml={"-10px"}>
                        <Pressable onPress={() => {
                            setUserDataEdit(userData);
                            setShowModal(true);
                            }}>
                            <Icon as={MaterialCommunityIcons} name="circle-edit-outline" size={27} color="black" />
                        </Pressable>
                    </Box>
                </HStack>
                <Heading mt="15px" textAlign={"center"}>{userData.name}</Heading>
            </Box>
            <Box mt="10px" ml="10px">
                <HStack space={2} mt={"2px"}>
                    <MaterialCommunityIcons name="email" size={24} color="black" />
                    <Text color="black" fontSize="md">
                        {firebasSDK.auth.currentUser?.email}
                    </Text>
                </HStack>
                <HStack space={2} mt={"2px"}>
                    <MaterialCommunityIcons name="home" size={24} color="black" />
                    <Text color="black" fontSize="md">
                        {userData.address}
                    </Text>
                </HStack>
                <HStack space={2} mt={"2px"}>
                    <MaterialCommunityIcons name="cellphone" size={24} color="black" />
                    <Text color="black" fontSize="md">
                        {userData.phone}
                    </Text>
                </HStack>
                <Box alignItems="center" mt="15px">
                    <Button onPress={() => handleSignOut()} colorScheme={"error"} width={"50%"} variant="subtle" leftIcon={<Icon as={MaterialCommunityIcons} name="logout" size="sm" />}>
                        Logout
                    </Button>
                </Box>
            </Box>
        </NativeBaseProvider>
    )
}

export default ClientProfile;
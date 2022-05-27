import { Modal, Icon, Text, NativeBaseProvider, Box, Heading, HStack, VStack, FormControl, Input, Button, Center, Spacer, extendTheme, Badge, Avatar, Flex, Pressable } from 'native-base';
import React, {useState, useEffect} from 'react';
import { Fontisto, Ionicons, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import * as firebasSDK from '../../Firebase';


import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const ProfessionalProfile = ({ navigation }) => {

    const handleSignOut = () => {
        firebasSDK.auth.signOut().then(() => {
            navigation.navigate("UserSelect")
        })
            .catch(error => console.log(error))
    }
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
            type: "professional"
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
    const [userData, setUserData] = useState({
        id: '',
        name: '',
        address: '',
        email: '',
        phone: ''
    })
    const [userDataEdit, setUserDataEdit] = useState({});

    const [name, setName] = useState("");
    const [showModal, setShowModal] = useState(false);

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
                        uri: "data:image/jpeg;base64,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"
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

export default ProfessionalProfile;
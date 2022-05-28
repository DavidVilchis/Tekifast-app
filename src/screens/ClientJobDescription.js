import React, {useState} from 'react';
import { Center, Modal, Badge, Alert, Collapse, Button, extendTheme, NativeBaseProvider, Heading, Box, Avatar, HStack, VStack, Text, Fab, Icon, IconButton, CloseIcon } from 'native-base';
import { Ionicons } from "@expo/vector-icons";
import * as firebaseSDK from '../../Firebase';

const ClientJobDescription = ({ navigation, route }) => {
    const [show, setShow] = React.useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleDelete = async() =>{
        const dbRef = firebaseSDK.db.collection("requests").doc(route.params.id);
        await dbRef.delete();
        navigation.goBack();
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
                                    setShowModal(false);
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
            </Center>
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
            <Box mt={!show ? '90px' : '10px'} ml={'20px'}>
                <VStack>
                    <Heading color={"primary.500"}>{route.params.name}</Heading>
                    <Heading size={'sm'}>Date: {route.params.date}</Heading>
                    <Badge colorScheme={route.params.state} _text={{
                        color: "white"
                    }} variant="solid" rounded="4" w={"35%"}>
                        {route.params.stateName}
                    </Badge>
                </VStack>
            </Box>
            <Box m={'20px'}>
                <Heading size={'md'}>Short Description</Heading>
                <Text>{route.params.short_description}</Text>
                <Heading size={'md'} mt={"5px"}>Complete Description</Heading>
                <Text>{route.params.complete_description}</Text>
            </Box>
            <Box mt={'20px'} alignItems={'center'}>
                <Button variant={"outline"} onPress={() => setShowModal(true)} colorScheme={"danger"}>Cancel and Delete</Button>
            </Box>
        </NativeBaseProvider>
    )
}

export default ClientJobDescription;

import React, {useState, useEffect} from 'react';
import { Icon, Button, Spinner, NativeBaseProvider, Heading, extendTheme, Box, Pressable, VStack, HStack, Avatar, Badge, Spacer, Center, Text, Flex, ScrollView, useTheme } from 'native-base'
import * as firebaseSDK from '../../Firebase';
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const Request = (props) => {
    return (
        <Pressable onPress={() => {
            props.navigation.navigate('ProfessionalJobDescription', { id: props.id });
        }} mt="15px">
            <Box maxWidth="500" borderWidth="1" borderColor="coolGray.300" bg="coolGray.100" p="5" rounded="8">
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
                    {props.short_description}
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

const ProfessionalHistory = ({ navigation }) => {
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
    const registro = [];
    const [tabla, setTabla] = useState([]);
    const [loading, setLoading] = useState(true)
    const getDataAll = async () => {
        await firebaseSDK.db.collection("requests").where("email_company", "==", firebaseSDK.auth.currentUser?.email).where("state_name", "in", ["Cancelled", "In progress", "Completed"]).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const { email_company, email_client, notifcation, state_name, name_company, date, short_description, complete_description } = doc.data();
                    registro.push({
                        id: doc.id,
                        state_name,
                        name_company,
                        date,
                        short_description,
                        complete_description,
                        notifcation,
                        email_client,
                        email_company
                    });
                });
                setTabla(registro);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
        console.log(tabla)
        setLoading(false)
    }
    useEffect(() => {
        getDataAll();
    }, [])
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
    if (loading) {
        return (
            <>
                <Box alignItems="center" mt="30px">
                    <Heading mt="10px" color={"primary.500"}>H<Heading mt="10px" >istory</Heading></Heading>
                </Box>
                <HStack space={2} mt={"100px"} justifyContent="center">
                    <Spinner accessibilityLabel="Loading posts" />
                    <Heading color="primary.500" fontSize="md">
                        Loading
                    </Heading>
                </HStack>
            </>
        )
    }
    return (
        <NativeBaseProvider theme={theme}>
            <Box alignItems="center" mt="30px">
            <Heading mt="10px" color={"primary.500"}>H<Heading mt="10px" >istory</Heading></Heading>
                <Button leftIcon={<Icon as={Ionicons} name="refresh" size="sm" />} mt={"10px"} w={"50%"} onPress={() => { setLoading(true); getDataAll(); }}>
                    Refresh
                </Button>
                <ScrollView maxW="100%" h="600px" _contentContainerStyle={{
                    px: "20px",
                    mb: "4",
                    minW: "72"
                }}>
                    {
                        tabla.map(dataItem => (
                            <Request
                                notifcation={dataItem.notifcation}
                                id={dataItem.id}
                                navigation={navigation}
                                key={dataItem.id}
                                state={handleColorState(dataItem.state_name)}
                                name={dataItem.name_company}
                                stateName={dataItem.state_name}
                                date={dataItem.date}
                                short_description={dataItem.short_description}
                                complete_description={dataItem.complete_description}
                                email_client={dataItem.email_client}
                                email_company={dataItem.email_company} 
                            />
                        ))
                    }
                </ScrollView>
            </Box>
        </NativeBaseProvider>
    )
}

export default ProfessionalHistory;
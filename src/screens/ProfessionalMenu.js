import { ScrollView, Spinner, Text, NativeBaseProvider, Box, Heading, HStack, Spacer, extendTheme, Badge, Avatar, Flex, Pressable, Center } from 'native-base';
import React, { useEffect, useState } from 'react';
import ProfessionalProfile from './ProfessionalProfile';
import ProfessionalHistory from './ProfessionalHistory';
import ProfessionalMyBusiness from './ProfessionalMyBusiness';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import * as firebaseSDK from '../../Firebase';

const Tab = createMaterialBottomTabNavigator();

const Request = (props) => {
    const handleNotification = (notification) => {
        if (notification) {
            return (
                <Badge colorScheme="primary.700" _text={{
                    color: "white"
                }} variant="solid" rounded="4">
                    New!
                </Badge>
            )
        }
    }
    return (
        <Pressable onPress={() => props.navigation.navigate('ProfessionalJobDescription',{ id: props.id})} mt="15px">
            <Box maxWidth="500" borderWidth="1" borderColor="coolGray.300" bg="coolGray.100" p="5" rounded="8">
                <HStack space={"3"} alignItems="center">
                    {
                        handleNotification(props.notifcation)
                    }
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

const Home = ({ navigation }) => {
    const registro = [];
    const [tabla, setTabla] = useState([]);
    const [loading, setLoading] = useState(true)
    const getDataAll = async () => {
        await firebaseSDK.db.collection("requests").where("email_company", "==", firebaseSDK.auth.currentUser?.email).where("state_name", "==", "Pendient").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const { email_client, notifcation, state_name, name_company, date, short_description, complete_description } = doc.data();
                    registro.push({
                        id: doc.id,
                        state_name,
                        name_company,
                        date,
                        short_description,
                        complete_description,
                        notifcation,
                        email_client
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
        } else if (state === 'Canceled') {
            return "danger";
        }
    }
    if (loading) {
        return (
            <>
                <Box alignItems="center" mt="30px">
                    <Heading mt="10px" color={"primary.500"}>N<Heading mt="10px" >ews requests</Heading></Heading>
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
        <>
            <Box alignItems="center" mt="30px">
                <Heading mt="10px" color={"primary.500"}>N<Heading mt="10px" >ews requests</Heading></Heading>
                <ScrollView maxW="100%" h="600px" _contentContainerStyle={{
                    px: "20px",
                    mb: "4",
                    minW: "72"
                }}>
                    {
                        tabla.map(dataItem => (
                            <Request notifcation={dataItem.notifcation} id={dataItem.id} navigation={navigation} key={dataItem.id} state={handleColorState(dataItem.state_name)} name={dataItem.name_company} stateName={dataItem.state_name} date={dataItem.date} short_description={dataItem.short_description} complete_description={dataItem.complete_description} />
                        ))
                    }
                </ScrollView>
            </Box>
        </>
    )
}

const ProfessionalMenu = ({ navigation }) => {
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
            <Tab.Navigator barStyle={{ backgroundColor: '#bbf2d3' }}>
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="ProfessionalHistory"
                    component={ProfessionalHistory}
                    options={{
                        tabBarLabel: 'History',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="history" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="ProfessionalMyBusiness"
                    component={ProfessionalMyBusiness}
                    options={{
                        tabBarLabel: 'My Business',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="briefcase-variant-outline" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="ProfessionalProfile"
                    component={ProfessionalProfile}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="account" color={color} size={26} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NativeBaseProvider>
    )
}

export default ProfessionalMenu;
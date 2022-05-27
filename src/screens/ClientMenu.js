import { Text, NativeBaseProvider, Box, Heading,  Center, extendTheme, Fab, Icon} from 'native-base';
import React from "react";
import ClientProfile from './ClientProfile';
import ClientSearch from './ClientSearch';
import ClientRecord from './ClientRecord';
import { AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const Home = () => {
  return (
    <>
      <Center mt={"50px"}>
        <Heading mt="10px" color={"primary.500"}>W<Heading mt="10px" >hat do you need?</Heading></Heading>

        <Text>{"\n"}</Text>

        <Box height="100" w="400" shadow="2" rounded="lg" _dark={{
          bg: "coolGray.200:alpha.20"
        }} _light={{
          bg: "coolGray.200:alpha.20"
        }}>
          <Center>
            <Text>{"\n"}</Text>
            <Fab renderInPortal={false} shadow={2} placement="top" size="lg" icon={<Icon color="white" as={MaterialCommunityIcons} name="food-fork-drink" size="6" />} label="Food" />
          </Center>
        </Box>
      </Center>



      <Center>
        <Box height="100" w="400" shadow="2" rounded="lg" _dark={{
          bg: "coolGray.200:alpha.20"
        }} _light={{
          bg: "coolGray.200:alpha.20"
        }}>
          <Center>
            <Text>{"\n"}</Text>
            <Fab renderInPortal={false} shadow={2} placement="top" size="lg" icon={<Icon color="white" as={MaterialIcons} name="photo-camera" size="6" />} label="Photographer" />
          </Center>
        </Box>
      </Center>



      <Center>
        <Box height="100" w="400" shadow="2" rounded="lg" _dark={{
          bg: "coolGray.200:alpha.20"
        }} _light={{
          bg: "coolGray.200:alpha.20"
        }}>
          <Center>
            <Text>{"\n"}</Text>
            <Fab renderInPortal={false} shadow={2} placement="top" size="lg" icon={<Icon color="white" as={MaterialIcons} name="computer" size="6" />} label="Programer" />
          </Center>
        </Box>
      </Center>



      <Center>
        <Box height="100" w="400" shadow="2" rounded="lg" _dark={{
          bg: "coolGray.200:alpha.20"
        }} _light={{
          bg: "coolGray.200:alpha.20"
        }}>
          <Center>
            <Text>{"\n"}</Text>
            <Fab renderInPortal={false} shadow={2} placement="top" size="lg" icon={<Icon color="white" as={MaterialIcons} name="web" size="6" />} label="Web designer" />
          </Center>
        </Box>
      </Center>
    </>

  )

};


const ClientMenu = ({ navigation }) => {
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
          name="ClientRecord"
          component={ClientRecord}
          options={{
            tabBarLabel: 'Record',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="book" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="ClientSearch"
          component={ClientSearch}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color }) => (
              <AntDesign name="search1" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="ClientProfile"
          component={ClientProfile}
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

export default ClientMenu;
import React from "react";
import { Container, Text, Heading, Icon, NativeBaseProvider, Input, Stack, Box } from "native-base";
import { Ionicons } from '@expo/vector-icons';

const SearchClient = () => {
  return (
    <NativeBaseProvider>
      <Box m={"10px"} mt={"80px"}>
        <Input variant="outline" size="lg" placeholder="Search" InputLeftElement={<Icon as={<Ionicons name="search" />} size={5} ml="2" color="muted.400" />}/>
      </Box>
    </NativeBaseProvider>
  )
};
export default SearchClient;
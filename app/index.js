import { useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing , setRefreshing] = useState(false);
  const {data , isLoading , error:isError , refetch} = useFetch(
    "search" , {
      query : "developer",
      num_pages:1
    }
  );

    const onRefresh = () => {
      setRefreshing(true)
      refetch()
      setRefreshing(false)
    }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.heartOutline} dimension='100%' />
          ),
          headerTitle: "",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} 
      refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`)
              }
            }}
          />

          <Popularjobs data={data} isLoading={isLoading} error={isError} />
          <Nearbyjobs data={data} isLoading={isLoading} error={isError} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
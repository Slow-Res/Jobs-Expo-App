import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularjobs.style";
import { useRouter } from "expo-router";
import { COLORS , SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard"
import useFetch from "../../../hooks/useFetch";


const Popularjobs = ({data , isLoading , error:isError}) => {


  const [selectedJob , setSelectedJob]  =useState()
  const router = useRouter();
  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerTitle}>Popular jobs</Text>
      <TouchableOpacity>
        <Text style={styles.headerBtn}>Show All</Text>
        
      </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
      {
        isLoading ? <ActivityIndicator size={"large"} color={COLORS.primary}/> :
        isError ? <Text style={{color:"red" , fontSize:24 , padding:15}}> {isError} </Text> : 
        <FlatList
          data={data}
          renderItem={({item}) => (<PopularJobCard selectedJob={selectedJob} handleCardPress={handleCardPress} item={item}/>)}
          keyExtractor={item => item?.job_id}
          contentContainerStyle={{columnGap:SIZES.medium}}
          horizontal

        />
      }
      </View>
    </View>
  );
};

export default Popularjobs;

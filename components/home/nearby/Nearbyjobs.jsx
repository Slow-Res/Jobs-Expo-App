import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import styles from './nearbyjobs.style'
import useFetch from '../../../hooks/useFetch';
import { useRouter } from "expo-router";
import { COLORS , SIZES } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

const Nearbyjobs = ({data , isLoading , error:isError}) => {

  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerTitle}>Nearby jobs</Text>
      <TouchableOpacity>
        <Text style={styles.headerBtn}>Show All {data.length}</Text>
        
      </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
      {
        isLoading ? <ActivityIndicator size={"large"} color={COLORS.primary}/> :
        isError ? <Text style={{color:"red" , fontSize:24 , padding:15}}> {isError} </Text> : 
        data.map(job => {
          return <NearbyJobCard 
            job={job}
            key={`nearby-job-${job?.job_id}`}
            handleNavigate={() =>{ router.push(`/job-details/${job.job_id}`)}
            }
          />
        })
      }
      </View>
    </View>
  );
}

export default Nearbyjobs
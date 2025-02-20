import { Alert, StyleSheet, Text, View, Button, Image } from 'react-native'
import React, { useContext } from 'react'
import { WeatherNewsProvider, WeatherNewsContext } from '../android/newsContext'
import Loader from './Loader';
import { ScrollView } from 'react-native-gesture-handler';


const timeAgo = (publishedAt) => {
  const publishedDate = new Date(publishedAt);
  const now = new Date();
  const diffInSeconds = Math.floor((now - publishedDate) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minutes ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hours ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} days ago`;
  }
};

let NewsDataDisplay = () => {
  const { news, error, getWeatherNews } = useContext(WeatherNewsContext);
  if (news && news.length > 0) {
    return (
      <View>
        {news.map((news, index) => (
          <View key={index} style={styles.newscontainer}>
            {news.urlToImage && (
              <Image source={{ uri: news.urlToImage }} style={{ width: '100%', height: 200 }} />
            )}
            <View style={styles.newstextcontainer}>
              <Text>{new Date(news.publishedAt).toLocaleString()}</Text>
            <Text style={styles.newstitle}>{`${news.title}`} </Text>
              <Text style={styles.newdescription}>{news.description}</Text>
            <Text style={styles.hrsagotext}>- {timeAgo(news.publishedAt)}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }

  if (!news) {
    return <Loader />;
  }

}
export default function AboutPage() {
  return (
    <WeatherNewsProvider>
      <ScrollView style={styles.scrollview}>
        <NewsDataDisplay />
      </ScrollView>
    </WeatherNewsProvider>
  )
}

const styles = StyleSheet.create({
  newscontainer: {
    width: '95%',
    margin: 'auto',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.6)',
    borderRadius: 5,
    padding:10,
    marginTop:10
  },
  newstextcontainer:{
     paddingVertical:10,
     paddingHorizontal:5
  },
  newstitle:{
    fontSize:14,
    fontWeight:'bold',
    textAlign:'justify'
  },
  newdescription:{
    textAlign:'justify'
  },
  hrsagotext:{
    textAlign:'right',
    marginTop:10
  }
})
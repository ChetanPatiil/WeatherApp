import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Button, StyleSheet, Text, View, Image, Touchable, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WeatherProvider, WeatherContext } from '../android/weatherContext';
import AboutPage from './NewsPage';
import Loader from './Loader';
import { greetingMessage } from './GreetingMessage';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FullDateTimeFormat } from './DateTime';
import { TextInput } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  city: Yup.string().matches(/^[A-Za-z\s]+$/, 'City should contain only letters'),
});


const Stack = createStackNavigator();

const WeatherInfo = ({ navigation }) => {
  const { weather, error, getWeatherData } = useContext(WeatherContext);
  const [seacrhcity, setSeacrhCity] = useState('');
  const [tempcolor, setTempColor] = useState('');
  const [seasonimg, setSeasonImg] = useState('');

  let handleSearchCityInput = (input) => {
    setSeacrhCity(input);
    getWeatherData(input)
  }

  
  
  let handleTermoMeterStyle = (temp) => {
    if (temp < 0) {
      setTempColor('#00A7D0');
    } else if (temp < 15) {
      setTempColor('#6EC6FF');
    } else if (temp < 25) {
      setTempColor('#3CB371');
    } else if (temp < 30) {
      setTempColor('#ffd11a');
    } else if (temp < 40) {
      setTempColor('#FF7F50');
    } else {
      setTempColor('#FF4500');
    }
  }


  useEffect(() => {
    if (weather && weather.main && weather.main.temp) {
      let temp = Math.round(weather.main.temp);
      handleTermoMeterStyle(temp);
    }
    if (tempcolor) {
      navigation.setOptions({
        headerStyle: {
          backgroundColor: tempcolor,
        }, headerTintColor: 'white'
      });
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(tempcolor);
    }

    const weatherCondition = (weather)? weather.weather[0].main: '';
    let handleSeasonsImages = () => {
      console.log(weatherCondition);
      
      if (weatherCondition === 'Clear') {
        setSeasonImg(require('../assets/summerseason.png'));
      } else if (weatherCondition === 'Clouds') {
        setSeasonImg(require('../assets/rainyseason.png'));
      } else if (weatherCondition === 'Rain') {
        setSeasonImg(require('../assets/rainyseason.png'));
      } else if (weatherCondition === 'Snow') {
        setSeasonImg(require('../assets/winterseason.png'));
      } else {
        setSeasonImg(require('../assets/commonimg.png')); 
      }
    };
    handleSeasonsImages()
  }, [weather, tempcolor]);


  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!weather) {
    return <Loader loading={true}></Loader>
  }

  return (

    <View style={[styles.container, { backgroundColor: tempcolor }]}>
      <Formik
        initialValues={{ city: '' }}
        validationSchema={validationSchema}
        onSubmit={() => {
          getWeatherData(seacrhcity);
          setSeacrhCity('');
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <>
            <View style={styles.searchbar}>
              <TextInput
                value={seacrhcity}
                style={styles.searchinput}
                onChangeText={(input) => {
                  handleChange('city')(input);
                  handleSearchCityInput(input);
                }}
                onBlur={handleBlur('city')}
                placeholder="Enter City"
              />

              <TouchableOpacity
                style={styles.searchbutton}
                onPress={() => {
                  handleSubmit()
                }}
              >
                <Text style={styles.searchbuttontext}>Search</Text>
              </TouchableOpacity>
            </View>
            {(touched.city && errors.city && (
              <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 14, fontWeight: '', marginTop: 5, width: '85%' }}>
                {errors.city}
              </Text>)
            )}
          </>
        )}
      </Formik>
      <View style={styles.datetimecontainer}>
        <MaterialCommunityIcons name="calendar-clock" size={30} color="rgba(0, 0, 0, 0.7)" />
        <Text style={styles.datetimetext} >{FullDateTimeFormat()}</Text>
      </View>
      <View style={styles.detailscontainer}>
        <View style={styles.citycontainer}>
          <Ionicons name='location' color='white' style={styles.cityname} />
          <Text style={styles.cityname}>{`${weather.name}, ${weather.sys.country}`}</Text>
        </View>
        <View style={styles.detailstop}>
          <Image source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png` }} style={styles.weathericon} />
          <View style={styles.detailsconright}>
            <Text style={[styles.detailsrightlabel, { backgroundColor: 'rgba(255,255,255,0.8)', color: 'rgba(0,0,0,0.7)' }]}>Current</Text>
            <Text style={[styles.temptext, { backgroundColor: tempcolor }]}>{Math.round(weather.main.temp)}°<Ionicons name='thermometer-outline' color='white' size={40} /></Text>
            <Text style={[styles.detailsrightlabel, { fontSize: 20 }]}>{weather.weather[0].description}</Text>
          </View >
        </View>

        <View style={styles.alltempscontainer}>

          <View style={styles.tempbox}>
            <Text style={styles.tempboxtextlabel}>Feel Like</Text>
            <Text style={[styles.tempboxtextlabel, { color: 'rgba(0,0,0,0.8)', fontSize: 16 }]}>{weather.main.feels_like}°</Text>
          </View>

          <View style={styles.tempbox}>
            <Text style={styles.tempboxtextlabel}>Minimum</Text>
            <Text style={[styles.tempboxtextlabel, { color: 'rgba(0,0,0,0.8)', fontSize: 16 }]}>{weather.main.temp_min}°</Text>
          </View>

          <View style={styles.tempbox}>
            <Text style={styles.tempboxtextlabel}>Maximum</Text>
            <Text style={[styles.tempboxtextlabel, { color: 'rgba(0,0,0,0.8)', fontSize: 16 }]}>{weather.main.temp_max}°</Text>
          </View>
        </View>
      </View>
      <View style={styles.detailsbottom}>
        <View style={styles.detailsbottombox}>
          <Ionicons name='water' color='black' size={30} />
          <Text style={styles.detailsbottomtext}>{weather.main.humidity}%</Text>
        </View>
        <View style={styles.detailsbottombox}>
          <Ionicons name='speedometer' color='black' size={30} />
          <Text style={styles.detailsbottomtext}>{weather.main.pressure} mb</Text>
        </View>
        <View style={styles.detailsbottombox}>
          <Feather name='wind' color='black' size={30} />
          <Text style={styles.detailsbottomtext}>{weather.wind.speed} m/s</Text>
        </View>
      </View>
      <View style={styles.footerimage}>
        <Image
          source={seasonimg}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
    </View>
  );
};



export default function HomePage({ navigation }) {
  return (
    <WeatherProvider>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <WeatherInfo navigation={navigation} />
    </WeatherProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'deepskyblue',
    padding: 5,
  },
  searchbar: {
    width: '90%',
    flexDirection: 'row',
    marginTop: 15,
  },
  searchinput: {
    width: '60%',
    borderWidth: 1,
    borderColor: 'white',
    borderStyle: 'solid',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  searchbutton: {
    width: '40%',
    backgroundColor: '#ff9933',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: { width: 3, height: 6 },
    shadowRadius: 10,
    elevation: 10,
  },
  searchbuttontext: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
    color: 'white'

  },
  datetimecontainer: {
    marginVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  datetimetext: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.7)',
    marginLeft: 10
  },
  detailscontainer: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center'
  },
  citycontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent:'center',
    marginTop: 5,
    width:'90%',
  },
  cityname: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  detailstop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weathericon: {
    width: '50%',
    width: 150,
    height: 150,
  },
  detailsconright: {
    padding: 15,
  },
  temptext: {
    fontSize: 60,
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingHorizontal: 5,
  },
  detailsrightlabel: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    color: 'rgba(56, 56, 56, 0.8)',
    textTransform: 'capitalize',
  },
  detailsbottom: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25
  },
  detailsbottombox: {
    backgroundColor: '#ff9933',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 5,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: { width: 3, height: 6 },
    shadowRadius: 10,
    elevation: 5,
  }
  ,
  detailsbottomtext: {
    fontWeight: 'bold',
    color: '#343434',
    fontSize: 16
  },
  alltempscontainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 2,
    borderTopColor: 'white'
  },
  alltempscontainertext: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,

  },
  tempbox: {
    alignItems: 'center',
    width: '25%'
  },
  tempboxtextlabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  footerimage: {
    width: '100%',
    height: 200
  }


});







// greetMessageBox:{
//         padding:5,
//         borderRadius:5,
// },
// greetMessageBoxTitle:{
//       fontSize:25,
//       color:'white',
//       fontWeight:'bold',
//       textAlign:'center'
//}


{/* <View style={styles.datetimecontainer}>
       <Text>{FullDateTimeFormat()}</Text>
      </View> */}
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import React from 'react'
import { TypewriterText } from '../../../components/elements/typewriter'




const FarmAi = () => {
  return (
    <SafeAreaView style={styles.layout}>
      <View style={styles.main}>
        <View>
          <Image
            style={{width:54, height:54}}
            resizeMode='contain'
            source={require('../../../assets/icons/terra.png')}/>
        </View>
        <View style={styles.textContainer}>
          <TypewriterText
          title={" Welcome To Terra.Ai"}/>
        </View>
        <View style={styles.bento}>
          <View style={styles.flex_2}>
            <View>
              <Image
                style={styles.svg}
                resizeMode='contain'
                source={require('../../../assets/icons/Crop.png')
              }/>
            </View>

            <View>
              <Text style={styles.title_text}>Crop Health</Text>
              <Text style={styles.p}>Monitor & diagnose issues</Text>
            </View>
          </View>

          <View style={styles.flex_1}>
            <View>
              <Image
                style={styles.svg}
                resizeMode='contain'
                source={require('../../../assets/icons/insights.png')
              }/>
            </View>

            <View>
              <Text style={styles.title_text}>Yield Insights</Text>
              <Text style={styles.p}>Optimize production</Text>
            </View>
          </View>

          <View style={styles.flex_1}>
            <View>
              <Image
                style={styles.svg}
                resizeMode='contain'
                source={require('../../../assets/icons/pest.png')
              }/>
            </View>
            <View>
              <Text style={styles.title_text}>Pest Control</Text>
              <Text style={styles.p}>Detection & treatment</Text>
            </View>
          </View>


          <View style={styles.flex_2}>
            <View>
              <Image
                style={styles.svg}
                resizeMode='contain'
                source={require('../../../assets/icons/weather.png')
              }/>
            </View>

            <View>
              <Text style={styles.title_text}>Weather Ai</Text>
              <Text style={styles.p}>Smart forecasting</Text>
            </View>
          </View>

        </View>
      </View>
    </SafeAreaView>
  )
}

const  styles = StyleSheet.create({
  layout:{
    flex:1,
    height: '100%',
    padding:16,
    justifyContent:'center',
    alignItems:'center'
  },
  main:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    gap:20
  },
  intro:{

  },
  bento:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center',
    gap:20

  },
  svg:{
    width: 52,
    height: 52,
  },
  title_text:{
    fontSize:  16,
    fontWeight: 'bold',
    color:'#8F95B2'

  },
  p:{
    fontSize:12,
    color:'#ADAEB1'
  },

  flex_1:{
    width:'50%',
    height:150,
    backgroundColor:'#ffffff',
    borderRadius:20,
    padding: 12,
    gap:4
  }, 
  flex_2:{
    width:'40%',
    backgroundColor:'#ffffff',
    borderRadius:20,
    padding:16
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  blueText: {
    color: '#60A5FA',
  },
  pinkText: {
    color: '#EC4899',
  },

})


export default FarmAi
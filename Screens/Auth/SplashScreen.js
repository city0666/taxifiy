import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Button,
    Image
} from 'react-native';




const SplashScreen = ({navigation}) => {
    return (
    <View style={styles.container}>
    
      <View style={styles.header}>
      <Text style={styles.textSign01}>Taxitify</Text>

    {/* <Image
    source={require('../../assets/images/test1.png')}
    style={styles.logo}
/> */}
</View>

      <View style={styles.footer}>
      <Text style={{fontSize:35, color: '#892c91'}}>Welcome to the  Taxitify app</Text>
      <Text style={{fontSize:15, color: '#892c91', textAlign:"center"}}> Taxitify ride with you love</Text>
      </View>
<View style={styles.button}>
<TouchableOpacity
    onPress={() => navigation.navigate('SignInScreen')}
    style={[styles.signIn, {
        borderColor: '#892c91',
        borderWidth: 1,
        marginTop: 15
    }]}
>
    <Text style={[styles.textSign, {
        color: '#892c91'
    }]}>Sign In</Text>
</TouchableOpacity>

<TouchableOpacity
    onPress={() => navigation.navigate('SignUpScreen')}
    style={[styles.signIn, {
        backgroundColor: '#892c91',
        marginTop: 15
    }]}
>
    <Text style={[styles.textSign, {
        color: 'white'
    }]}>Register</Text>
</TouchableOpacity>

</View>

     
      <View style={styles.box2}>
      <TouchableOpacity>
        <Text style={styles.title}>en</Text>

     </TouchableOpacity>

      </View>
      <Text style={{fontSize:15, color: '#892c91', textAlign:"center"}}> by logging or registering i agree to your </Text>
      <TouchableOpacity>

      <Text  style={{fontSize:15, color: '#892c91', textAlign:"center", fontWeight:"bold"}}>      Terms Of Serivce and Privacy Policy
</Text>
     </TouchableOpacity>

      </View>


    );
};


      

export default SplashScreen;
const {height} = Dimensions.get("screen");
 const height_logo = height * 0.40;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor : 'white',
    
  },
  header: {
    flex: .66,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"white"
},
  footer: {
    flex: .14,
    backgroundColor: 'white',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 25,
   
},
  button: {
    flex:.18,
      flexDirection:'row',
      justifyContent: 'space-around',
      marginTop:'6%'

  },
  signIn: {
    width: '45%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  
},
  textSign: {
    fontSize: 25,
},
textSign01: {
    fontSize: 50,
    fontWeight: 'bold',
    color: "#892c91",
    
},
  box2:{
    height:50,
    position: 'absolute',
    alignItems: 'center',
    borderWidth:3,
    borderColor:'#892c91',
    borderRadius:50,
    height:35,
    width:35,
    top:25,
    right:10,
    justifyContent: 'center',


  },
 
  
logo: {
    width:height_logo,
    height:height_logo
},
title:{
    color:'#892c91',
    fontSize:20,
    fontWeight:'bold'
}

  
});

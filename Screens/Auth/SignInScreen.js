import React ,{useState,useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Dimensions,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../constants/color';
import * as yup from 'yup'
import { useFormikContext, Formik, Form, Field } from 'formik';
import {useSelector,useDispatch} from 'react-redux';
// import {Context as AuthContext} from '../../context/AuthContext';
import * as authactions from '../../store/actions/auth';

import { LinearGradient } from 'expo-linear-gradient';



const SignInScreen = ({navigation}) => {
    // const { state, signin } = useContext;
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
        const [fetched, setFetched] = React.useState(false);

    const dispatch = useDispatch();

useEffect(() => {
    setFetched(true);

    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
      setFetched(true);

    }

    return () => setFetched(false);

  }, [error]);

  

  return (
 
<Formik    

initialValues={{ email: '', password: '' }}
onSubmit={ async values  => {
    setError(null);

   setIsLoading(true);
   try {
    await dispatch(authactions.createLogin(values));
    } catch (err) { 
      setError(err.message);
      setIsLoading(false);
    }
   setIsLoading(false);

 }
}
validationSchema={yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(6)         
    .required(),
   


})}
>
{({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
    <View style={styles.container}>
    <StatusBar backgroundColor= '#7c2b83'

    barStyle="light-content"/>
      <View style={styles.header}>

{/* <Animatable.Image 
    animation="bounceIn"
    duraton="5000"  
source={require('../../assets/logo.png')}
style={styles.logo}
resizeMode="center"

/>
 */}
          <Text style={styles.text_header}>Welcome!</Text>
          <Text style={styles.text_header01}>Taxitify RiderApp</Text>

      </View>
      {/* <KeyboardAwareView animated={true}> */}
      <KeyboardAvoidingView behavior="padding" style={styles.footer}>
      <Animatable.View 
          animation="fadeInUpBig"
          style={[styles.footer, {
              backgroundColor: 'white'
          }]}
      >
          <Text style={[styles.text_footer, {
              color: Colors.buttonred
          }]}>email</Text>
          <View style={styles.action}>
              <FontAwesome 
                  name="user-o"
                  color={Colors.buttonred}
                  size={20}
              />
              <TextInput 
                  placeholder="Your Email"
                  placeholderTextColor="#666666"
                  style={[styles.textInput, {
                      color: Colors.buttonred
                  }]}
                  autoCapitalize="none"
                  autoCorrect = {false}
                  value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              />
              {values.email ? 
              <Animatable.View
                  animation="bounceIn"
              >
                  <Feather 
                      name="check-circle"
                      color="green"
                      size={20}
                  />
              </Animatable.View>
              : null}
          </View>
          {touched.email && errors.email &&
            <Animatable.View animation="fadeInLeft" duration={500}>

              <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
              </Animatable.View>
            }
          {/* { data.isValidUser ? null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
          </Animatable.View>
          }
           */}

          <Text style={[styles.text_footer, {
              color:  Colors.buttonred
,
              marginTop: 10
          }]}>Password</Text>
          <View style={styles.action}>
              <Feather 
                  name="lock"
                  color={Colors.buttonred}
                  size={20}
              />
              <TextInput 
                  placeholder="Your Password"
                  placeholderTextColor="#666666"
                 
                  style={[styles.textInput, {
                    color: Colors.buttonred
                  }]}
                  secureTextEntry

                  value={values.password}
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
      autoCapitalize ="none"
      autoCorrect = {false}

                
              />
              <TouchableOpacity
                //   onPress={updateSecureTextEntry}
              >
                  {touched.password ? 
                  <Feather 
                      name="eye-off"
                      color="grey"
                      size={20}
                  />
                  :
                  <Feather 
                      name="eye"
                      color="grey"
                      size={20}
                  />
                  }
              </TouchableOpacity>
          </View>
          {touched.password && errors.password &&
            <Animatable.View animation="fadeInLeft" duration={500}>
        
            <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
        
          </Animatable.View>
            }
          {/* { state.errorMessage?null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
        
    <Text>{state.errorMessage}</Text>    </Animatable.View>
          }
           */}

          <TouchableOpacity>
              <Text style={{color: '#009387', marginTop:15,marginBottom:15}}>Forgot password?</Text>
          </TouchableOpacity>
          <View style={styles.button}>
            { isLoading?(<ActivityIndicator size="small" color='#009387'/>) :(<TouchableOpacity
                  style={styles.signIn}
                  onPress={handleSubmit}              >
               <LinearGradient
                    colors={['#7c2b83', '#892c91']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
    
              </TouchableOpacity>)}
              <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => navigation.navigate('testlogin')}
              >
              <LinearGradient

          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={[styles.signIn, {
                      borderColor: '#7c2b83',
                      borderWidth: 1,
                      marginTop: 15
                  }]}
              >
          <Text
            style={{
              backgroundColor: 'transparent',
              fontSize: 15,
              color: '#fff',
            }}>
            Sign in with Facebook
          </Text>
        </LinearGradient>
        </TouchableOpacity>

              <TouchableOpacity
                  onPress={() => navigation.navigate('SignUpScreen')}
                  style={[styles.signIn, {
                      borderColor: '#7c2b83',
                      borderWidth: 1,
                      marginTop: 15
                  }]}
              >
                  <Text style={[styles.textSign, {
                      color: '#7c2b83'
                  }]}>Sign Up</Text>
              </TouchableOpacity>
          </View>
          
      </Animatable.View>
      </KeyboardAvoidingView>

    </View>
    )}
      </Formik>
  );
};

export default SignInScreen;

const {height} = Dimensions.get("screen");
 const height_logo = height * 0.28;
 const newLocal = 100;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white'
  },
  header: {
   
        flex:.3,
        justifyContent: 'center',
         alignItems:'center'
    
  },
  logo: {
    width: height_logo,
    height: height_logo,
    
},
  footer: {
      flex: .7,
      //backgroundColor: '#fff',
      borderTopLeftRadius: 3,
      borderTopRightRadius: 55,
      paddingHorizontal: 20,
      paddingVertical: 30,
    //   opacity:.5
    
  },
  text_header: {
      color: '#892c91',
      fontWeight: 'bold',
      fontSize: 30,
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
  },
  signIn: {
      width: '100%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginTop:0
    
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }
});

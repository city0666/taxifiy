import { AsyncStorage } from 'react-native';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';


let timer;
export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};
export const authenticate = (userId, token, email,name) => {
  return dispatch => {
  //  dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token, email:email ,name:name});
  };
};

export const createRegister = ( values) => {
    console.log(values.email)
    return async dispatch => {
      // any async code you want!
      const response = await fetch(
        'http://54.87.154.240:8080/api/v1/users/signup/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
          name:values.name,
            email:values.email,
            password:values.password,
            passwordConfirm:values.conformpassword,
            role: "rider",

        })      }
      );
  
       const resData = await response.json();
       console.log(resData.token)
      if(resData.error )
      {
        console.log(resData.message);
      let message = resData.message
        throw new Error(message);
      }
  
     // dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
     //dispatch({ type: SIGNUP, token: resData.token, userId: resData.data.user._id ,email:resData.data.user.email});
    // dispatch({ type: AUTHENTICATE, userId: userId, token: token, email:email });
    dispatch(
      authenticate(
        resData.data.user._id, 
        resData.token,
        resData.data.user.email,
        resData.data.user.name
       // parseInt(resData.expiresIn) * 1000
      )
    );
    saveDataToStorage( resData.token, resData.data.user._id, resData.data.user.email,resData.data.user.name,resData.data.user.email,);
    //  const expirationDate = new Date(
    //   new Date().getTime() + parseInt(resData.expiresIn) * 1000
    // );
    // saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    // saveDataToStorage( resData.token, resData.data.user._id, resData.data.user.email);


    };
  };
  export const createLogin = ( values) => {
    console.log(values.email)
    return async dispatch => {
      // any async code you want!
      const response = await fetch(
        'http://54.87.154.240:8080/api/v1/users/login/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({

            email:values.email,
            password:values.password

        })      }
      );
       const resData = await response.json();
       console.log(resData.token)


       if(resData.error )
{
  console.log(resData.message);
let message = resData.message
  throw new Error(message);
}
// token,data._id

console.log(resData.data.user.name)

//dispatch({ type: SIGNUP, token: resData.token, userId: resData.data.user._id, email: resData.data.user.name });
// dispatch({ type: LOGIN, token: resData.token, userId: resData.data.user._id ,email:resData.data.user.email});


dispatch(
  authenticate(
    resData.data.user._id, 
    resData.token,
   // parseInt(resData.expiresIn) * 1000
   resData.data.user.email,
   resData.data.user.name

  )
);
// const expirationDate = new Date(
//   new Date().getTime() + parseInt(resData.expiresIn) * 1000
// );
saveDataToStorage( resData.token, resData.data.user._id, resData.data.user.email, resData.data.user.name);

    };
  };
  
  export const logout = () => {
   // clearLogoutTimer();
    AsyncStorage.removeItem('userData');
   // AsyncStorage.removeItem('driverOnline');
    return { type: LOGOUT };
  };
  // const clearLogoutTimer = () => {
  //   if (timer) {
  //     clearTimeout(timer);
  //   }
  // };
  // const setLogoutTimer = expirationTime => {
  //   return dispatch => {
  //     timer = setTimeout(() => {
  //       dispatch(logout());
  //     }, expirationTime);
  //   };
  // };
  const saveDataToStorage = (token, name, email,userId) => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        token: token,
        userId: userId,
        email: email,
        name: name,
      //  expiryDate: expirationDate.toISOString()
      })
    );
  };
  
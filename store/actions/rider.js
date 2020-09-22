export const getonlinedriver = ( ) => {
   console.log("sreeraj")
    return async dispatch => {
      // any async code you want!
      const response = await fetch(
        'http://54.87.154.240:8080/api/v1/onlinedriver/',
        // {
        // //  method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //   name:values.name,
        //     email:values.email,
        //     password:values.password,
        //     passwordConfirm:values.conformpassword,
        //     role: "rider",

        // })      }
      );
      const test = await response.json();
   const resData =test.data
  
    //    const resData = await response.json();
        console.log(resData)
      if(resData.error )
      {
        console.log(resData.message);
      let message = resData.message
        throw new Error(message);
      }
      dispatch({ type: "onlinedrivers", sreeraj:resData});

     // dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
     //dispatch({ type: SIGNUP, token: resData.token, userId: resData.data.user._id ,email:resData.data.user.email});
    // dispatch({ type: AUTHENTICATE, userId: userId, token: token, email:email });
    // dispatch(
    //   authenticate(
    //     resData.data.user._id, 
    //     resData.token,
    //     resData.data.user.email,
    //     resData.data.user.name
    //    // parseInt(resData.expiresIn) * 1000
    //   )
    // );
    // saveDataToStorage( resData.token, resData.data.user._id, resData.data.user.email,resData.data.user.name,resData.data.user.email,);
    //  const expirationDate = new Date(
    //   new Date().getTime() + parseInt(resData.expiresIn) * 1000
    // );
    // saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    // saveDataToStorage( resData.token, resData.data.user._id, resData.data.user.email);


    };
  };
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

     

    };
  };

  export const getdirectionfromgoogle = ( placeID,mylocationlongitude,mylocationlatitude ) => {
    console.log(placeID,mylocationlongitude,mylocationlatitude )
    return async dispatch => {
      // any async code you want!
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${
          mylocationlatitude 
          },${
            mylocationlongitude
          }&destination=place_id:${placeID}&key=AIzaSyCudc5akB8KhWTntNWFff4d4D47pX9dfVM`
           
      );
             const json = await response.json();
             console.log(json);
             dispatch({ type: "googleres", googledir:json});

  }
}

export const bookingriderrequest = (userid,ridername,destination,currentlocation,traveltime, distance)=>{

}
export const findnearestdrivers =(curretntlocation)=>{}
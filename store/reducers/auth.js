import{LOGIN,SIGNUP,AUTHENTICATE,LOGOUT,SET_DID_TRY_AL} from '../actions/auth';


const initialState = {
  token: null,
  userId: null,
  email:null,
  name: null,
  didTryAutoLogin: false

};

const auth  = (state = initialState, action) => {
  switch (action.type) {

  
      case AUTHENTICATE:
      return  {
        token: action.token,
        userId: action.userId,
        email:action.email,
        name:action.name
      };
      case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true
      };
      case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true
      };
    
    }
    return state;

 };


 export default auth;
import { createContext, useContext, useReducer } from 'react';

const initialState = {
  name: '',
  email: '',
  birth: '',
  gender: '',
};

const userInfoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return { ...state, ...action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const UserInfoContext = createContext(null);
const UserInfoDispatchContext = createContext(null);

export const UserInfoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userInfoReducer, initialState);

  return (
    <UserInfoContext.Provider value={state}>
      <UserInfoDispatchContext.Provider value={dispatch}>
        {children}
      </UserInfoDispatchContext.Provider>
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => useContext(UserInfoContext);
export const useUserInfoDispatch = () => useContext(UserInfoDispatchContext);
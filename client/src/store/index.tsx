import { 
  useState, 
  useEffect, 
  useContext, 
  createContext, 
  ReactNode, 
  Dispatch, 
  SetStateAction 
} from 'react';
import axios from 'axios';

interface Shop {
  id?: number;
  name?: string;
  address?: string;
  created_at?: Date;
  updated_at?: Date;
}

interface User {
  id?: number;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  email?: string;
  created_at?: Date;
  updated_at?: Date;
  shops?: Shop[]
}

interface State {
  user: User | null;
  loading: boolean;
}

//Interfaces in TS are used to describe an object (ie. {name: 'Izzy', age: '33} - {name: string; age: number;})
interface StoreContextType {
  state: State;
  setState: Dispatch<SetStateAction<State>>;
}

// The createContext taikes an initial value, but you must describe the initial value/argument and what the contecxt object will look like later 
//So, storeContextType describes the object that I'm passing in on like 67 through the value prop
const StoreContext = createContext<StoreContextType | undefined>(undefined);

const initialState: State = {
  user: null,
  loading: true
};


export function StoreProvider(props: {children: ReactNode}) {
  const [state, setState] = useState(initialState);
  
  useEffect(() => {
    axios.get('/auth/user')
      .then(res => {
        setState({
          ...state,
          user: res.data.user,
          loading: false
        });
      });
  }, [])

  return (
    <StoreContext.Provider value={{
      state,
      setState
    }}>
      {props.children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext);


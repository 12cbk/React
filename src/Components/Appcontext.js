import { createContext, useContext, useState ,useReducer } from "react";


const AppContext = createContext();


export const useAppContext = () => useContext(AppContext);

function cartReducer(state, action) {
    switch (action.type) {
      case "ADD_MOVIE":
        return state.some((movie) => movie.id === action.payload.id)
          ? state
          : [...state, action.payload];
      case "REMOVE_MOVIE":
        return state.filter((movie) => movie.id !== action.payload.id);
      case "CLEAR_CART":
        return [];
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
  
  
  const initialCartState = [];

export function AppProvider({ children }) {
    const [selectedMovie, setSelectedMovie] = useState(null); 
    const[searchTerm, setSearchTerm] = useState(""); 
   
    const [cart, dispatch] = useReducer(cartReducer, initialCartState);


    

  return (
    <AppContext.Provider value={{ selectedMovie, setSelectedMovie,searchTerm, setSearchTerm,cart, dispatch}}>
      {children}
    </AppContext.Provider>
  );
}

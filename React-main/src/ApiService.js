import axios from "axios";

export const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/proxy");
    
    return response.data; 
  } catch (error) {
    console.error("Error axios:", error);
    return [];
  }
};

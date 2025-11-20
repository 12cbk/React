import axios from "axios";

export const fetchData = async (category) => {
  try {
    // //console.log("API",category);
    // const response = await axios.get('http://localhost:5000/api/proxy?category=${category}');
    const response = await axios.get(`http://localhost:5000/api/proxy?category=${category}`);

    return response.data; 
  } catch (error) {
    console.error("Error axios:", error);
    return [];
  }
};

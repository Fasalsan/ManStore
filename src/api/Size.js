import request from "../util/helper";


const GetAllSize = async () => {
    try {
       const response = await request("Size/GetAll", "get");
      return response;
    } catch (error) {
      throw error; 
    }
  };


export {GetAllSize};
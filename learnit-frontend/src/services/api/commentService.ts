import axios, { AxiosResponse } from "axios";


export const AddComment = async (comment: Comment): Promise<Comment> => {
 try {
    const data = JSON.stringify(comment); // Corrected from Comment to comment
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5292/api/instructor",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response: AxiosResponse<Comment> = await axios(config);
    return response.data; // Ensure the function returns the response data
 } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
 }
};

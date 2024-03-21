import axios, { AxiosResponse } from "axios";
import Assignment from "../../model/assignment";

export const addAssignment = async (newAssignmentData: Assignment): Promise<void> => {
  try {
    const response: AxiosResponse<void> = await axios.post(
      "http://localhost:5110/api/assignment",
      newAssignmentData
    );
    console.log('Assignment added successfully');
    alert('Assignment added successfully')
    } catch (error) {
        if (axios.isAxiosError(error)) {
        throw new Error(error.message);
        } 
        else {
        throw new Error("Unknown error");
        }
  }
};

import axios, { AxiosResponse } from "axios";
import Assignment from "../../model/assignment";
import useCookies from "../hooks/useCookies";

export const AddAssignment = async (
  newAssignmentData: Assignment
): Promise<void> => {
  try {
    const { getCookie } = useCookies();
    const token = getCookie("token");
    const response: AxiosResponse<void> = await axios.post(
      "http://localhost:5110/api/assignment",
      newAssignmentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Assignment added successfully");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
};

export const GetAssignmentByCourseId = async (
  courseId: number
): Promise<Assignment[]> => {
  try {
    const { getCookie } = useCookies();
    const token = getCookie("token");
    const response: AxiosResponse<Assignment[]> = await axios.get<Assignment[]>(
      `http://localhost:5110/api/assignment/course/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
};

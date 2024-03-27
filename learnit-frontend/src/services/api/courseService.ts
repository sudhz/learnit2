import axios, { AxiosResponse } from "axios";
import Course from "../../model/course";
import useLocalStorage from "../hooks/useLocalStorage";

export const GetCourses = async (): Promise<Course[]> => {
  try {
    const { getItem } = useLocalStorage("user");
    const token = getItem().token;
    const response: AxiosResponse<Course[]> = await axios.get(
      "http://localhost:5110/api/course",
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

export const GetCoursesByStudentId = async (id: number): Promise<Course[]> => {
  try {
    const { getItem } = useLocalStorage("user");
    const token = getItem().token;
    const response: AxiosResponse<Course[]> = await axios.get(
      `http://localhost:5110/api/student/${id}/courses`,
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

export const GetCoursesByInstructorId = async (
  id: number
): Promise<Course[]> => {
  try {
    const { getItem } = useLocalStorage("user");
    const token = getItem().token;
    const response: AxiosResponse<Course[]> = await axios.get(
      `http://localhost:5110/api/instructor/${id}/courses`,
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

export const GetTopCoursesByCourseId = async (
  id: number
): Promise<Course[]> => {
  try {
    const { getItem } = useLocalStorage("user");
    const token = getItem().token;
    const response: AxiosResponse<Course[]> = await axios.get(
      `http://localhost:5110/api/course/${id}/top-courses`,
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

export const GetTimeTable = async (id: number): Promise<Course[]> => {
  try {
    const { getItem } = useLocalStorage("user");
    const token = getItem().token;
    const response: AxiosResponse<Course[]> = await axios.get(
      `http://localhost:5110/api/student/${id}/courses`,
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

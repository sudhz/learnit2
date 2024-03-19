import axios, { AxiosResponse } from "axios";
import Course from "../../model/course";

export const GetCourses = async (): Promise<Course[]> => {
  try {
    const response: AxiosResponse<Course[]> = await axios.get(
      "http://localhost:5110/course"
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

/* export const GetCourse = async (id: number): Promise<Course> => {
  try {
    const response: AxiosResponse<Course> = await axios.get(
      `http://localhost:5292/api/course/${id}`
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

export const GetCourseByInstructor = async (
  instructorId: number
): Promise<Course[]> => {
  try {
    const response: AxiosResponse<Course[]> = await axios.get(
      `http://localhost:5292/api/course/Instructor/${instructorId}`
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

export const GetCoursesByStudentId = async (id: number): Promise<number[]> => {
  try {
    const response: AxiosResponse<number[]> = await axios.get(
      `http://localhost:5292/api/Course_Student_Mapping/student/${id}`
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
 */
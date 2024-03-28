import axios, { AxiosError, AxiosResponse } from "axios";
import Instructor from "../../model/instructor";
import useCookies from "../hooks/useCookies";

export const AddInstructor = async (
  instructor: Instructor
): Promise<Instructor> => {
  try {
    const data = JSON.stringify(instructor);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5110/api/instructor",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response: Instructor = await axios.request(config);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new AxiosError(error.response?.data.message);
    } else {
      throw new AxiosError("Unknown error");
    }
  }
};

export const GetInstructor = async (id: number): Promise<Instructor> => {
  try {
    const { getCookie } = useCookies();
    const token = getCookie("token");
    const response: AxiosResponse<Instructor> = await axios.get(
      `http://localhost:5110/api/instructor/${id}`,
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

export const UpdateInstructor = async (newDetails: Instructor) => {
  try {
    const { getCookie } = useCookies();
    const token = getCookie("token");
    const data = JSON.stringify(newDetails);
    const config = {
      method: "put",
      url: `http://localhost:5110/api/instructor/${newDetails.instructorId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    const response = await axios.request(config);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
};

export const AuthInstructor = async (email: string, password: string) => {
  try {
    const data = JSON.stringify({
      email: email,
      password: password,
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5110/api/instructor/auth",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new AxiosError(error.response?.data.message);
    } else {
      throw new AxiosError("Unknown error");
    }
  }
};

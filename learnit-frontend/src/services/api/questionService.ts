import axios, { AxiosResponse } from "axios";
import Quiz from "../../model/quiz";
import useCookies from "../hooks/useCookies";

export const GetQuizzesByModuleId = async (
  moduleId: number
): Promise<Quiz[]> => {
  try {
    const { getCookie } = useCookies();
    const token = getCookie("token");
    const response: AxiosResponse<Quiz[]> = await axios.get(
      `http://localhost:5110/api/quiz/${moduleId}`,
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

export const AddQuizQuestion = async (quizInfo: Quiz): Promise<Quiz> => {
  try {
    const { getCookie } = useCookies();
    const token = getCookie("token");
    const response: AxiosResponse<Quiz> = await axios.post(
      "http://localhost:5110/api/question",
      quizInfo,
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

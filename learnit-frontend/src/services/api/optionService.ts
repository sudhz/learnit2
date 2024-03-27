import axios, { AxiosResponse } from "axios";
import QuizOption from "../../model/quiz_options";
import useLocalStorage from "../hooks/useLocalStorage";

export const GetQuizOptionsByQuestionId = async (
  quizQuestionId: number
): Promise<QuizOption[]> => {
  try {
    const { getItem } = useLocalStorage("user");
    const token = getItem().token;
    const response: AxiosResponse<QuizOption[]> = await axios.get(
      `http://localhost:5110/api/option/${quizQuestionId}`,
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

export const GetQuizByModule_QT = async (
  quizQuestionId: number
): Promise<QuizOption[]> => {
  try {
    const { getItem } = useLocalStorage("user");
    const token = getItem().token;
    const response: AxiosResponse<QuizOption[]> = await axios.get(
      `http://localhost:5110/api/option/${quizQuestionId}`,
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

export const CreateQuizOptions = async (
  quizOptions: QuizOption[]
): Promise<QuizOption[]> => {
  try {
    const { getItem } = useLocalStorage("user");
    const token = getItem().token;
    const response: AxiosResponse<QuizOption[]> = await axios.post(
      "http://localhost:5110/api/option",
      quizOptions,
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

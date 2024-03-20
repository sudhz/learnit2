import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography, Radio, FormControl, FormControlLabel, FormGroup, FormLabel, RadioGroup } from '@mui/material';
import Quiz from '../../model/quiz';
import { GetQuizzesByModuleId } from '../../services/api/quizService';

const Quizz: React.FC = () => {
 const { id } = useParams<{ id: string }>();
 const [quizQuestions, setQuizQuestions] = useState<Quiz[]>([]);
 const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
 const [userSelections, setUserSelections] = useState<{ [key: number]: number }>({});
 const [score, setScore] = useState(0);
 const [quizFinished, setQuizFinished] = useState(false);

 useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await GetQuizzesByModuleId(Number(id));
        setQuizQuestions(response);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      }
    };

    fetchQuizQuestions();
 }, [id]);

 const handleOptionChange = (optionId: number) => {
    setUserSelections(prevSelections => ({ ...prevSelections, [currentQuestionIndex]: optionId }));
 };

 const handleSubmit = () => {
    let totalScore = 0;
    quizQuestions.forEach((question, index) => {
      const userAnswer = userSelections[index];
      const correctOption = question.quizOptions.find(option => option.isCorrect);
      if (userAnswer === correctOption?.quizOptionId) {
        totalScore++;
      }
    });
    setScore(totalScore);
    setQuizFinished(true);
 };

 const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
 };

 return (
    <Box sx={{ marginBottom: 2 }}>
      {quizQuestions.length > 0 && !quizFinished && (
        <>
          <FormControl component="fieldset" key={quizQuestions[currentQuestionIndex].quizQuestionId}>
            <FormLabel component="legend">{quizQuestions[currentQuestionIndex].quizQuestionText}</FormLabel>
            <FormGroup>
              <RadioGroup
                name={`question-${currentQuestionIndex}`}
                onChange={(e) => handleOptionChange(Number(e.target.value))}
              >
                {quizQuestions[currentQuestionIndex].quizOptions.map((option, optionIndex) => (
                 <FormControlLabel
                    key={option.quizOptionId}
                    value={option.quizOptionId}
                    control={<Radio />}
                    label={option.quizOptionText}
                 />
                ))}
              </RadioGroup>
            </FormGroup>
          </FormControl>
          <Box display="flex" justifyContent="space-between" sx={{ marginTop: 2 }}>
            {currentQuestionIndex === quizQuestions.length - 1 ? (
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleNextQuestion}>
                Next
              </Button>
            )}
          </Box>
        </>
      )}
      {quizFinished && (
        <Typography variant="h6">Your score: {score}</Typography>
      )}
    </Box>
 );
};

export default Quizz;

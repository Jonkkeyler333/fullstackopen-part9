import React, { useState } from "react";
import type { NewDiary, DiaryFormProps } from "../types";
import diaryService from "../service/diaryService";
import axios from "axios";

const DiaryForm = ({ onEntrySubmit }: DiaryFormProps) => {
  const [weather, setWeather] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const weatherOptions: string[] = [
    "sunny",
    "rainy",
    "cloudy",
    "stormy",
    "windy",
  ];
  const visibilityOptions: string[] = ["great", "good", "ok", "poor"];

  const handleWeather = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setWeather(event.target.value);
  };

  const handleVisibility = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setVisibility(event.target.value);
  };

  const handleEntrySubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiaryEntry: NewDiary = {
      weather,
      visibility,
      comment,
      date,
    };
    try {
      const response = await diaryService.addDiary(newDiaryEntry);
      onEntrySubmit(response);
      setSuccess("Entry added successfully!");
      console.log(response);
      setTimeout(() => {
        setSuccess("");
      }, 3500);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.error[0].message);
        setError(error.response?.data.error[0].message);
        setTimeout(() => {
          setError("");
        }, 3500);
      }
    } finally {
      setComment("");
      setDate("");
      setVisibility("");
      setWeather("");
    }
  };

  return (
    <div>
      <h1>Add new Entry</h1>
      <form onSubmit={handleEntrySubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <div>
          <div>
            <label>
              Date :
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </label>
          </div>
          <label>
            Weather :
            {weatherOptions.map((option) => (
              <label>
                <input
                  type="radio"
                  value={option}
                  name="weatherGroup"
                  checked={weather === option}
                  onChange={handleWeather}
                  required
                />
                {option}
              </label>
            ))}
          </label>
        </div>
        <div>
          <label>
            Visibility :
            {visibilityOptions.map((option) => (
              <label>
                <input
                  type="radio"
                  value={option}
                  name="visibilityGroup"
                  checked={visibility === option}
                  onChange={handleVisibility}
                  required
                />
                {option}
              </label>
            ))}
          </label>
        </div>
        <div>
          <label>
            Comment : 
            <input
              type="text"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DiaryForm;

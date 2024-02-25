import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi"; // Import icons for light and dark mode
import logo from "./assets/logo.svg";
import "./App.css";

function App() {
  const [subjects, setSubjects] = useState([{ grade: "", credit: "" }]);
  const [sgpa, setSgpa] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true); // State for tracking dark mode

  const handleInputChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { grade: "", credit: "" }]);
  };

  const handleRemoveSubject = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
  };

  const handleSGPA = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    subjects.forEach((subject) => {
      const credit = parseInt(subject.credit);
      const gradePoint = getGradePoint(subject.grade);

      if (!isNaN(credit) && !isNaN(gradePoint)) {
        totalCredits += credit;
        totalGradePoints += credit * gradePoint;
      }
    });

    if (totalCredits > 0) {
      const calculatedSgpa = totalGradePoints / totalCredits;
      setSgpa(calculatedSgpa.toFixed(2));
    } else {
      setSgpa(null);
    }
  };

  const getGradePoint = (grade) => {
    switch (grade) {
      case "O":
        return 10;
      case "A+":
        return 9;
      case "A":
        return 8;
      case "B+":
        return 7;
      case "B":
        return 6;
      case "C":
        return 5;
      case "P":
        return 0; // Assuming "P" means Pass and has no grade point
      case "F":
        return 4;
      default:
        return NaN; // Invalid grade
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div  className={`App ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }  md:py-0 py-20  text-gray-900 md:h-screen`}>
      <div
        className={`App ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } flex md:flex-row flex-col items-center justify-center text-gray-900 md:h-screen`}
      >
        <div className="md:hidden block flex flex-col justify-start items-center md:space-y-20 md:mb-0 mb-10">
          <h1
            className={`text-3xl font-bold flex justify-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {sgpa !== null ? `Your Score ${sgpa}` : "Your Score  0.00"}
          </h1>
        </div>
        <div className={`flex flex-col md:w-1/2 w-full justify-center`}>
          <div className="flex flex-col md:w-1/2  space-y-5 justify-center items-center pb-5">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="flex justify-between md:space-x-3 space-x-1 items-center  rounded"
              >
                <select
                  className={`p-3  border ${
                    isDarkMode
                      ? "border-gray-600 dark:bg-gray-800 dark:text-white"
                      : "border-gray-300 rounded"
                  }`}
                  value={subject.grade}
                  onChange={(e) =>
                    handleInputChange(index, "grade", e.target.value)
                  }
                >
                  <option value="">Select Grade</option>
                  <option value="O">O</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="P">P</option>
                  <option value="F">F</option>
                </select>
                <select
                  className={`p-3  border ${
                    isDarkMode
                      ? "border-gray-600 dark:bg-gray-800 dark:text-white"
                      : "border-gray-300 rounded"
                  }`}
                  value={subject.credit}
                  onChange={(e) =>
                    handleInputChange(index, "credit", e.target.value)
                  }
                >
                  <option value="">Select Credit</option>
                  {[...Array(7)].map((_, optionIndex) => (
                    <option key={optionIndex + 1} value={optionIndex + 1}>
                      {optionIndex + 1}
                    </option>
                  ))}
                </select>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
                  onClick={() => handleRemoveSubject(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <div className="flex md:w-1/2 justify-end md:pr-1 pr-7 my-5">
            <button
              className="flex border rounded-full p-2 items-center space-x-2 text-left font-medium"
              onClick={handleAddSubject}
            >
              <FaPlus
                onClick={handleAddSubject}
                color={`${isDarkMode ? "white" : "black"}`}
                size={10}
              />
            </button>
          </div>
          <div className="my-4 md:w-1/2 w-full md:px-0 px-10 flex justify-center">
            <button
              type="submit"
              onClick={handleSGPA}
              className="custom-button w-full mt-5 hover:text-black py-3 px-8 md:px-16"
            >
              <span className="button-text font-medium">CALCULATE</span>
            </button>
          </div>
        </div>
        <div className="md:block hidden flex flex-col justify-start items-center md:space-y-20 md:mb-0 mb-10">
          <h1
            className={`text-3xl font-bold flex justify-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {sgpa !== null ? `Your Score ${sgpa}` : "Your Score  0.00"}
          </h1>
          <div className={`text-center text-${isDarkMode ? "white" : "black"}`}>
            Copyright (c) 2024 Shree1767
          </div>
        </div>
        <div className="absolute top-0 right-0 m-5 cursor-pointer">
          {isDarkMode ? (
            <button
              onClick={toggleDarkMode}
              className="flex space-x-2 items-center"
            >
              <span className={`text-${isDarkMode ? "white" : "black"}`}>
                Light
              </span>
              <FiSun className="text-white" size={20} />
            </button>
          ) : (
            <button
              onClick={toggleDarkMode}
              className="flex space-x-2 items-center"
            >
              <span className={`text-${isDarkMode ? "white" : "black"}`}>
                Dark
              </span>
              <FiMoon className="text-gray-600" size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import ConfettiExplosion from "../components/background";

const SurveyForm: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#11192D] min-h-screen flex flex-col items-center px-4">
      <h1 className="text-3xl text-center text-white font-bold mt-8">
        Questionnaire
      </h1>
      {formSubmitted && <ConfettiExplosion />}
      <div className="bg-[#1e8296] absolute top-[8rem] -z-5 left-[-15rem] h-[15.25rem] w-[15.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]"></div>

      <form
        id="form"
        onSubmit={handleSubmit}
        className="bg-transparent backdrop-blur-lg rounded-lg shadow-lg shadow-slate-700 max-w-lg w-full mx-auto mt-8 p-8 text-white"
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            required
            className="appearance-none border border-gray-400 rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            className="appearance-none border border-gray-400 rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-white mb-2"
          >
            Age
          </label>
          <input
            type="text"
            id="age"
            placeholder="Enter your age"
            required
            className="appearance-none border border-gray-400 rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-white mb-2"
          >
            Which option best describes you?
          </label>
          <select
            name="role"
            id="role"
            required
            className="appearance-none border border-gray-400 rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="student">Student</option>
            <option value="intern">Intern</option>
            <option value="professional">Professional</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-white mb-2">
            Would you recommend GeeksforGeeks to a friend?
          </label>
          <div className="flex space-x-4">
            {["Yes", "No", "Maybe"].map((option, index) => (
              <label
                key={index}
                className="flex items-center text-sm font-medium"
              >
                <input
                  type="radio"
                  id={`recommend-${index}`}
                  name="recommend"
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-white mb-2">
            Languages and Frameworks known
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              "C",
              "C++",
              "C#",
              "Java",
              "Python",
              "JavaScript",
              "React",
              "Angular",
              "Django",
              "Spring",
            ].map((lang, index) => (
              <label key={index} className="flex items-center text-sm font-medium">
                <input
                  type="checkbox"
                  name="inp"
                  className="mr-2"
                  id={`inp-${index}`}
                />
                {lang}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-white mb-2"
          >
            Any comments or suggestions
          </label>
          <textarea
            name="comment"
            id="comment"
            required
            placeholder="Enter your comment here"
            className="appearance-none border border-gray-400 rounded w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-green-600"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-sky-500 text-white font-bold py-3 px-6 rounded focus:outline-none focus:ring-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;

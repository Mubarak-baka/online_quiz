import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function ProfilePage() {
  const { current_user } = useContext(UserContext);
  console.log("user",current_user)
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {!current_user ? (
        <p className="text-red-500 text-lg font-semibold">Not authorized</p>
      ) : (
        <>
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">Profile</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <h3 className="text-xl font-medium text-gray-600">Username</h3>
              <p className="text-gray-800">{current_user.username}</p>
            </div>

            <div className="flex justify-between">
              <h3 className="text-xl font-medium text-gray-600">Email</h3>
              <p className="text-gray-800">{current_user.email}</p>
            </div>

            <div className="flex justify-between">
              <h3 className="text-xl font-medium text-gray-600">Role</h3>
              <p className={`text-sm font-semibold ${current_user.role === "admin" ? "text-blue-900" : "text-orange-600 border p-3"}`}>
                {current_user.role === "admin" ? "Admin" : "User"}
              </p>
            </div>
          </div>

          {/* Quiz Attempts Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-700">Your Quiz Attempts</h3>
            {current_user.quiz_attempts.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {current_user.quiz_attempts.map((attempt, index) => (
                  <li key={index} className="border p-4 rounded-lg shadow-md">
                    
                    <strong>Quiz id:</strong> {attempt.quiz_id} <br />
                    <strong>Score:</strong> {attempt.score}%
                    <ul className="mt-2">
                      {attempt.questions.map((q) => (
                        <li key={q.question_id} className="text-gray-600">- {q.question_text}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-2">No quiz attempts yet.</p>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Update Profile
            </button>
          </div>
        </>
      )}
    </div>
  );
}

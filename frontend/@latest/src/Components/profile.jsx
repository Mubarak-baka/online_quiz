import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { User, Mail, Shield, Trophy, Clock, BookOpen } from 'lucide-react';

export default function ProfilePage() {
  const { current_user } = useContext(UserContext);
  console.log("user",current_user)
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!current_user ? (
          <div className="text-center py-12">
            <div className="bg-red-50 rounded-lg p-6 inline-block">
              <p className="text-red-600 text-lg font-semibold flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Not authorized
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-3 rounded-full">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{current_user.username}</h2>
                    <p className="text-blue-100 flex items-center mt-1">
                      <Mail className="w-4 h-4 mr-1" />
                      {current_user.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                  <Shield className="w-4 h-4 text-blue-600 mr-2" />
                  <span className={`font-medium ${
                    current_user.role === "admin" ? "text-blue-700" : "text-indigo-600"
                  }`}>
                    {current_user.role === "admin" ? "Administrator" : current_user.role.charAt(0).toUpperCase() + current_user.role.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quiz Attempts Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                    Quiz Performance
                  </h3>
                  <span className="text-sm text-gray-500">
                    {current_user.quiz_attempts.length} attempts
                  </span>
                </div>
              </div>

              <div className="px-6 py-4">
                {current_user.quiz_attempts.length > 0 ? (
                  <div className="space-y-4">
                    {current_user.quiz_attempts.map((attempt, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 text-blue-600 mr-2" />
                            <span className="font-medium text-gray-900">Quiz #{attempt.quiz_id}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-500">Completed</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-3">
                          <div className="flex-grow">
                            <div className="h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-blue-600 rounded-full"
                                style={{ width: `${attempt.score}%` }}
                              />
                            </div>
                          </div>
                          <span className="ml-3 text-sm font-semibold text-gray-700">
                            {attempt.score}%
                          </span>
                        </div>

                        <div className="space-y-1">
                          {attempt.questions.map((q) => (
                            <p key={q.question_id} className="text-sm text-gray-600 pl-4 border-l-2 border-gray-200">
                              {q.question_text}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No quiz attempts yet.</p>
                    <p className="text-sm text-gray-400">Take your first quiz to see your performance!</p>
                  </div>
                )}
              </div>
            </div>

      
          </div>
        )}
      </div>
    </div>
  );
}
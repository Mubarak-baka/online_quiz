import { Brain, ArrowRight, Trophy, Users, Timer } from "lucide-react";
import {  Link } from "react-router-dom";
function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">QuizMaster</span>
            </div>

            {/* Authentication Buttons */}
            <div className="flex space-x-4">
              <button className="text-gray-600 hover:text-gray-900">Sign In</button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                Sign Up Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Test Your Knowledge,<br />Challenge Your Mind
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join millions of learners and test your knowledge across thousands of topics.
            Create your own quizzes or compete with others in real-time challenges.
          </p>
          <Link  className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition flex items-center space-x-2 mx-auto" to="/readquiz">
            Start Quiz Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            { icon: <Trophy className="w-12 h-12 text-indigo-600 mb-4" />, title: "Compete & Win", description: "Challenge others in real-time competitions and climb the leaderboard." },
            { icon: <Users className="w-12 h-12 text-indigo-600 mb-4" />, title: "Social Learning", description: "Join study groups and share knowledge with learners worldwide." },
            { icon: <Timer className="w-12 h-12 text-indigo-600 mb-4" />, title: "Adaptive Learning", description: "Questions adapt to your skill level for optimal learning progress." },
          ].map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Featured Categories */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Quiz Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Science', 'History', 'Technology', 'Arts'].map((category) => (
              <div 
                key={category}
                className="bg-white p-6 rounded-lg text-center cursor-pointer hover:bg-indigo-50 transition"
              >
                <h3 className="font-semibold text-lg text-gray-900">{category}</h3>
                <p className="text-gray-500 text-sm mt-1">100+ Quizzes</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">QuizMaster</span>
          </div>
          <p className="text-center text-gray-500">© 2024 QuizMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home; 
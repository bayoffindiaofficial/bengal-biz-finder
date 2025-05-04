
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate form
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }
      
      if (formData.name.trim() === "") {
        setError("Name is required");
        setLoading(false);
        return;
      }
      
      if (formData.phone.trim() === "") {
        setError("Phone is required");
        setLoading(false);
        return;
      }
    }
    
    if (formData.email.trim() === "") {
      setError("Email is required");
      setLoading(false);
      return;
    }
    
    if (formData.password.trim() === "") {
      setError("Password is required");
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // In a real app, we would make API calls to authenticate/register the user
      console.log("Form submitted:", formData);
      
      // For now, we just show a message that this feature is coming soon
      setError("This feature will be available soon after Supabase integration.");
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className="min-h-screen bg-bengalbiz-background">
        <Header title={isLogin ? "Login" : "Create Account"} />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {isLogin ? "Login to Your Account" : "Create a New Account"}
            </h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bengalbiz-primary focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bengalbiz-primary focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </>
              )}

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bengalbiz-primary focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bengalbiz-primary focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>

              {!isLogin && (
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bengalbiz-primary focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                </div>
              )}

              <button
                type="submit"
                className={`w-full bg-bengalbiz-primary text-white font-medium py-2 px-4 rounded-md hover:bg-bengalbiz-primary/90 transition-colors ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {isLogin ? "Logging in..." : "Signing up..."}
                  </span>
                ) : isLogin ? (
                  "Login"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={toggleAuthMode}
                className="text-bengalbiz-primary font-medium hover:underline"
              >
                {isLogin
                  ? "Need an account? Sign up"
                  : "Already have an account? Login"}
              </button>
            </div>
            
            <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
              <p className="mb-2">
                By continuing, you agree to Bengal Biz Finder's
              </p>
              <div className="space-x-2">
                <Link to="#" className="text-bengalbiz-primary hover:underline">Terms of Service</Link>
                <span>and</span>
                <Link to="#" className="text-bengalbiz-primary hover:underline">Privacy Policy</Link>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <h3 className="text-xl font-semibold mb-4">Why list your business with us?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-bengalbiz-primary bg-opacity-10 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-bengalbiz-primary"
                  >
                    <path d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2a2 2 0 0 1 2-2"></path>
                    <path d="M17 12a2 2 0 0 1 2 2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2a2 2 0 0 1 2-2"></path>
                    <path d="M17 6a2 2 0 0 1 2 2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2a2 2 0 0 1 2-2"></path>
                  </svg>
                </div>
                <h4 className="font-semibold mb-1">Increased Visibility</h4>
                <p className="text-sm text-gray-600">
                  Get discovered by customers looking for your services.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-bengalbiz-primary bg-opacity-10 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-bengalbiz-primary"
                  >
                    <polyline points="20 12 20 22 4 22 4 12"></polyline>
                    <rect x="2" y="7" width="20" height="5"></rect>
                    <line x1="12" y1="22" x2="12" y2="7"></line>
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                  </svg>
                </div>
                <h4 className="font-semibold mb-1">Free Listing</h4>
                <p className="text-sm text-gray-600">
                  Create your business profile at no cost.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-bengalbiz-primary bg-opacity-10 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-bengalbiz-primary"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h4 className="font-semibold mb-1">Credibility</h4>
                <p className="text-sm text-gray-600">
                  Build trust with verified business profiles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default Auth;

import { useState } from "react";
import loginImg from "../../assets/images/login.png";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import toast from "react-hot-toast";
import Button from "../../components/Shared/Button";
import { CgSpinner } from "react-icons/cg";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  // const { isLoading } = useLoginMutation();
  // const credentials = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [login] = useLoginMutation();
  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    // try {
    //   const res = await login(data).unwrap();

    //   const { access, refresh } = res;
    //   // Dispatch userLoggedIn to update Redux state
    //   dispatch(
    //     setCredentials({
    //       access: access,
    //       refresh: refresh,
    //     })
    //   );
    // } catch (error) {
    //   console.error("Login failed:", error);
    //   return;
    // }
    toast.success("Login successful!");
    setEmail("");
    setPassword("");
    console.log("go to home");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-row-reverse font-poppins bg-primary text-[#4C4C4C]">
      {/* Left Side - Login Form */}
      <div className="w-full rounded-l-[100px] md:w-7/12 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl mb-2">Welcome back!</h1>
            <p className="text-gray-600 text-sm">
              Enter your Credentials to access your account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="****"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded"
                />
                <span className="text-gray-700">Remember for 30 days</span>
              </label>
              {/* <a href="#" className="hover:underline text-primary">
                Forgot Password
              </a> */}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 rounded-md transition-colors duration-200"
            >
              Login
            </button>
          </form>

          {/* Social Login */}
          {/* <div className="mt-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <FaApple className="text-2xl" />
                <span className="text-sm font-medium text-gray-800">Apple</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
               <FcGoogle className="text-2xl" />
                <span className="text-sm font-medium text-gray-800">
                  Google
                </span>
              </button>
            </div>
          </div> */}

          {/* Sign Up Link */}
          {/* <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <a href="#" className="font-semibold text-primary hover:underline">
              Sign Up
            </a>
          </p> */}
        </div>
      </div>
      {/* Right side - Hero Image */}
      <div
        className="hidden flex-1 lg:flex w-3/12 bg-primary bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${loginImg})` }}
      >
        {/* <img src={loginImg} alt="A1c Boost" className="my-auto w-full" /> */}
        <div className="flex justify-center items-center h-full mx-auto">
          <img src={logo} className="h-40" alt="Ober Logo" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;

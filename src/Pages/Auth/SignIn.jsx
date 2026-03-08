import { useState } from "react";
import loginImg from "../../assets/images/login.png";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import toast from "react-hot-toast";
import Button from "../../components/Shared/Button";
import { CgSpinner } from "react-icons/cg";

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
    <div className="min-h-screen flex flex-row-reverse font-nunito bg-primary">
      {/* Left Side - Login Form */}
      <div className="w-full rounded-l-[100px] md:w-7/12 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">
          {/* Ober Logo */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-[#06C] mb-2">
                Your Email
              </label>
              <input
                type="email"
                placeholder="Example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-[#06C] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 Character"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-black" />
                  ) : (
                    <Eye className="h-5 w-5 text-black" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 rounded-md transition-colors duration-200"
            >
              Login
            </button>
          </form>{" "}
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

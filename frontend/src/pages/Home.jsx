import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import BASE_API from "../../utils/baseApi";

const Home = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data Submitted: ", data);
    const payLoad = {
      email: data.email,
      password: data.password,
    };

    try {
      let r = await fetch(`${BASE_API}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(payLoad),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let res = await r.json();
      if (r.ok) {
        const token = res.token;
        if (token) {
          localStorage.setItem("token", token);
        }
        const user = res.admin;
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          login(user);
        }
        console.log("Response after login", res);
        console.log("Response after login", res.admin);
        navigate(`/${user.role}`);
      } else {
        setError("nouserfound", { type: "manual", message: res.message });
      }
    } catch (err) {
      console.log("Error in login:", err);
    }
  };
  return (
    <div className="d-flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">Login</h1>
        <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
        {errors.nouserfound && (
          <span className="text-red-600 mt-1 text-sm">
            {errors.nouserfound.message}
          </span>
        )}
        <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <svg
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
              fill="#6B7280"
            />
          </svg>
          <input
            type="email"
            placeholder="Email id"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              onChange: () => clearErrors("nouserfound"),
            })}
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
          />
        </div>

        {errors.email && (
          <span className="text-red-600 mt-1 text-sm">
            {errors.email.message}
          </span>
        )}

        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <svg
            width="13"
            height="17"
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
              fill="#6B7280"
            />
          </svg>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              onChange: () => clearErrors("nouserfound"),
            })}
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
          />
        </div>
        {errors.password && (
          <span className="text-red-600 mt-1 text-sm">
            {errors.password.message}
          </span>
        )}

        <div className="mt-5 text-left text-indigo-500">
          <a className="text-sm" href="#">
            Forgot password?
          </a>
        </div>

        <input
          disabled={isSubmitting}
          type="submit"
          value="Login"
          className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
        />
        <p className="text-gray-500 text-sm mt-3 mb-11">
          Don’t have an account?
          <a className="text-indigo-500" href="/signup">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Home;

import styles from "./signup.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    watch, 
    formState: { errors, isSubmitting, validate },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data Submitted: ", data);
    const payLoad = {
      college_name: data.collegeName,
      email: data.email,
      password: data.password,
      role: "admin", // Default role is 'admin'
    };

    try {
      let r = await fetch("http://localhost:5174/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(payLoad),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let res = await r.json();
      console.log("Response", res);
      if (r.status === 201) {
        // navigate to login page after successful signup
        navigate("/");
      }
    } catch (err) {
      console.log("Error in signup:", err);
    }
  };

  const password = watch("password");

  return (
    <div className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>College Registration</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="collegeName" className={styles.label}>
              College Name
            </label>
            <input
              type="text"
              {...register("collegeName", {
                required: {
                  value: true,
                  message: "College name is required",
                },
              })}
              className={styles.input}
              placeholder="Enter college name"
            />
            {errors.collegeName && (
              <span className={styles.error}>{errors.collegeName.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "email is required",
                },
              })}
              className={styles.input}
              placeholder="Enter email address"
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={styles.input}
              placeholder="Enter password"
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Please confirm your password",
                },
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={styles.input}
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <span className={styles.error}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <input
            disabled={isSubmitting}
            type="submit"
            value="Register College"
            className={styles.button}
          />
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => navigate("/")}
            >
              Already Registered? Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

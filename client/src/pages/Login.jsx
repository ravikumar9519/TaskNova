import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button, Loading, Textbox } from "../components";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { useEffect } from "react";

const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials(res));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#302943] via-slate-900 to-black'>
      <div className='flex flex-col items-center justify-center w-full gap-0 md:w-auto md:gap-40 md:flex-row'>
        <div className='flex flex-col items-center justify-center w-full h-full lg:w-2/3'>
          <div className='flex flex-col items-center justify-center w-full gap-5 md:max-w-lg 2xl:max-w-3xl md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 px-3 py-1 text-sm text-gray-900 border border-purple-800 rounded-full md:text-base dark:border-gray-700 dark:text-purple-400'>
              Manage all your tasks in one place!
            </span>
            <p className='flex flex-col gap-0 text-4xl font-black text-center text-purple-700 from-purple-500 via-fuchsia-500 to-indigo-500 md:gap-4 md:text-6xl 2xl:text-7xl dark:text-gray-400'>
              <span>Cloud-based</span>
              <span>Task Manager</span>
            </p>

            <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center w-full p-4 md:w-1/3 md:p-1'>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white dark:bg-slate-900 px-10 pt-14 pb-10'
          >
            <div>
              <p className='text-3xl font-bold text-center text-purple-700 '>
                Welcome back!
              </p>
              <p className='text-base text-center text-gray-700 dark:text-gray-500'>
                Keep all your credentials safe!
              </p>
            </div>
            <div className='flex flex-col gap-y-5'>
              <Textbox
                placeholder='you@example.com'
                type='email'
                name='email'
                label='Email Address'
                className='w-full border-purple-800 rounded-full'
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email?.message || ""}
              />
              <Textbox
                placeholder='password'
                type='password'
                name='password'
                label='Password'
                className='w-full border-purple-800 rounded-full'
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password?.message || ""}
              />
              <span
                className='text-sm text-gray-600 cursor-pointer hover:underline hover:text-purple-500 dark:text-gray-400'
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </span>
            </div>

            {isLoading ? (
              <Loading />
            ) : (
              <Button
                type='submit'
                label='Log in'
                className='w-full h-10 text-white bg-purple-700 rounded-full'
              />
            )}

            {/* 👉 New User Section */}
            <div className='mt-5 text-center'>
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                New here?{" "}
                <span
                  className='font-medium text-purple-700 cursor-pointer hover:underline'
                  onClick={() => navigate("/register")}
                >
                  Register Now
                </span>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

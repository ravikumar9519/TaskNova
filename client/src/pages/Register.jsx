import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { toast } from "sonner";
import { Button, Loading, Textbox } from "../components";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const handleRegister = async (data) => {
    const modifiedData = {
      ...data,
      isAdmin: data.role === "admin",
    };

    try {
      const res = await registerUser(modifiedData).unwrap();
      dispatch(setCredentials(res));
      toast.success("Registration successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#302943] via-slate-900 to-black'>
      <div className='flex flex-col items-center justify-center w-full gap-0 md:w-auto md:gap-40 md:flex-row'>
        {/* Left side banner */}
        <div className='flex flex-col items-center justify-center w-full h-full lg:w-2/3'>
          <div className='flex flex-col items-center justify-center w-full gap-5 md:max-w-lg 2xl:max-w-3xl md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 px-3 py-1 text-sm text-gray-900 border border-purple-700 rounded-full md:text-base dark:border-gray-700 dark:text-purple-600'>
              Join us and manage your tasks efficiently!
            </span>
            <p className='flex flex-col gap-0 text-4xl font-black text-center text-purple-800 md:gap-4 md:text-6xl 2xl:text-7xl dark:text-gray-400'>
              <span>Start Your</span>
              <span>Task Journey</span>
            </p>
            <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div>

        {/* Register form */}
        <div className='flex flex-col items-center justify-center w-full p-4 md:w-1/3 md:p-1'>
          <form
            onSubmit={handleSubmit(handleRegister)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-6 bg-white dark:bg-slate-900 px-10 py-10 rounded-xl shadow-lg'
          >
            <div>
              <p className='text-3xl font-bold text-center text-purple-800'>
                Create your account
              </p>
              <p className='text-base text-center text-gray-700 dark:text-gray-500'>
                Sign up to start managing your tasks.
              </p>
            </div>

            <div className='flex flex-col gap-y-5'>
              <Textbox
                label='Name'
                name='name'
                placeholder='John Doe'
                register={register("name", {
                  required: "Name is required!",
                })}
                error={errors.name?.message}
                className='w-full rounded-full'
              />
              <Textbox
                label='Title'
                name='title'
                placeholder='e.g. Project Manager'
                register={register("title", {
                  required: "Title is required!",
                })}
                error={errors.title?.message}
                className='w-full rounded-full'
              />
              <Textbox
                label='Email'
                name='email'
                placeholder='you@example.com'
                type='email'
                register={register("email", {
                  required: "Email is required!",
                })}
                error={errors.email?.message}
                className='w-full rounded-full'
              />
              <Textbox
                label='Password'
                name='password'
                placeholder='••••••••'
                type='password'
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password?.message}
                className='w-full rounded-full'
              />

              {/* Role Dropdown */}
              <div className='flex flex-col'>
                <label className='mb-1 font-semibold text-gray-700 dark:text-gray-300'>
                  Role
                </label>
                <select
                  {...register("role", { required: "Role is required!" })}
                  className='w-full p-2 text-gray-700 bg-white border border-purple-700 rounded-full dark:bg-slate-800 dark:text-white dark:border-purple-600'
                >
                  <option value=''>Select role</option>
                  <option value='user'>User</option>
                  <option value='admin'>Admin</option>
                </select>
                {errors.role && (
                  <p className='mt-1 text-sm text-red-500'>
                    {errors.role.message}
                  </p>
                )}
              </div>
            </div>

            {isLoading ? (
              <Loading />
            ) : (
              <Button
                type='submit'
                label='Register'
                className='w-full h-10 text-white bg-purple-700 rounded-full'
              />
            )}

            {/* Already have account */}
            <p className='text-sm text-center text-gray-600 dark:text-gray-400'>
              Already have an account?{" "}
              <Link
                to='/login'
                className='font-medium text-purple-700 hover:underline dark:text-purple-400'
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

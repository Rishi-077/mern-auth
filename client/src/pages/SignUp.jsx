import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form action="" className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            id="username"
            className="bg-slate-100 p-3 rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            className="bg-slate-100 p-3 rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            className="bg-slate-100 p-3 rounded-lg"
          />
          <button
            type="submit"
            className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          >
            Sign Up
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={"/signin"}>
            <span className="text-blue-500">Sign in</span>
          </Link>
        </div>
      </div>
    </>
  );
}

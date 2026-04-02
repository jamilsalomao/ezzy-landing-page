import { Link } from "react-router-dom";

export default function SubHeader() {
  return (
    <header className="w-full bg-white shadow-sm py-4 px-6 flex justify-center items-center">
      <Link to="/" className="text-2xl font-extrabold tracking-tight text-gray-900 hover:opacity-80 transition cursor-pointer">
        ezzy<span className="text-orange-500">.</span>
      </Link>
    </header>
  );
}

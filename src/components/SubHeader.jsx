import { Link } from "react-router-dom";

export default function SubHeader() {
  return (
    <header className="w-full bg-white shadow-sm py-4 px-6 flex justify-center items-center">
      <Link to="/" className="flex items-center hover:opacity-80 transition cursor-pointer">
        <img src="/logo-ezzy.svg" alt="EzzyApp" className="h-8 w-auto" />
      </Link>
    </header>
  );
}

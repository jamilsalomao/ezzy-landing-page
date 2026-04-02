import { Link } from "react-router-dom";

export default function SubFooter() {
  return (
    <footer className="mt-20 border-t border-gray-200 pt-10 pb-10 text-center text-gray-500 text-sm w-full">
      <p>© 2025 Ezzy App. Todos os direitos reservados.</p>
      <div className="flex flex-wrap justify-center gap-6 mt-4 font-medium px-4">
        <Link to="/" className="hover:text-orange-600 transition">
          Home
        </Link>
        <Link to="/termos" className="hover:text-orange-600 transition">
          Termos de Uso
        </Link>
        <Link to="/privacidade" className="hover:text-orange-600 transition">
          Privacidade
        </Link>
        <Link to="/ajuda" className="hover:text-orange-600 transition">
          Central de Ajuda
        </Link>
        <Link to="/status" className="hover:text-orange-600 transition">
          Rastrear Serviço
        </Link>
      </div>
    </footer>
  );
}

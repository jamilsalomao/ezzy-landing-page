import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";
import SubHeader from "../components/SubHeader";
import SubFooter from "../components/SubFooter";
import { useDynamicTitle } from "../hooks/useDynamicTitle";

export default function NotFound() {
  useDynamicTitle("Página Não Encontrada | Ezzy App");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <SubHeader />
      
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} className="text-orange-500" />
          </div>
          
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">404</h1>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Página não encontrada</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Parece que a página que você tentou acessar não existe ou foi removida.
          </p>
          
          <Link
            to="/"
            className="flex justify-center items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl transition duration-300 shadow-lg shadow-orange-200"
          >
            <ArrowLeft size={20} />
            Voltar para o Início
          </Link>
        </div>
      </main>

      <SubFooter />
    </div>
  );
}

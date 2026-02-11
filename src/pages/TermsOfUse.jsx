import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-orange-600 font-bold mb-8 hover:underline"
        >
          <ArrowLeft size={20} /> Voltar para o Início
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Termos de Uso</h1>
        <p className="text-gray-500 mb-8 text-sm">
          Última atualização: 11 de Fevereiro de 2026
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              1. Aceitação dos Termos
            </h2>
            <p>
              Ao acessar e utilizar o aplicativo <strong>Ezzy</strong>{" "}
              ("Serviço"), você concorda em cumprir e ficar vinculado aos
              seguintes termos e condições de uso. Se você não concordar com
              qualquer parte destes termos, não deverá utilizar nosso Serviço.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. Descrição do Serviço
            </h2>
            <p>
              O Ezzy é uma plataforma de gestão de clientes e serviços voltada
              para pequenas empresas e autônomos. O aplicativo permite o
              cadastro de clientes, registro de atendimentos, controle de equipe
              e visualização de métricas básicas.
            </p>
            <p className="mt-2">
              <strong>Fase Beta:</strong> O Serviço atualmente opera em fase
              "Beta", o que significa que está em testes e aprimoramento
              contínuo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. Uso do Serviço
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Você é responsável por manter a confidencialidade de sua conta e
                senha.
              </li>
              <li>
                Você concorda em não utilizar o Serviço para qualquer finalidade
                ilegal ou não autorizada.
              </li>
              <li>
                O uso durante a fase Beta é gratuito, porém nos reservamos o
                direito de introduzir planos pagos no futuro, mediante aviso
                prévio.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. Privacidade de Dados
            </h2>
            <p>
              A sua privacidade é importante para nós. Leia nossa{" "}
              <Link
                to="/privacidade"
                className="text-orange-600 hover:underline"
              >
                Política de Privacidade
              </Link>{" "}
              para entender como coletamos e usamos suas informações.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. Limitação de Responsabilidade
            </h2>
            <p>
              O Serviço é fornecido "como está" e "conforme disponível". Não
              garantimos que o serviço será ininterrupto, seguro ou livre de
              erros. Em nenhuma circunstância o Ezzy será responsável por danos
              diretos, indiretos, incidentais ou consequentes resultantes do uso
              ou da impossibilidade de uso do serviço.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. Modificações nos Termos
            </h2>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer
              momento. As alterações entrarão em vigor imediatamente após a
              publicação no aplicativo ou site. O uso continuado do Serviço após
              as alterações constitui aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contato</h2>
            <p>
              Para dúvidas sobre estes termos, entre em contato conosco pelo
              e-mail:{" "}
              <a
                href="mailto:contato.ezzyapp@gmail.com"
                className="text-orange-600 hover:underline"
              >
                contato.ezzyapp@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
      <footer className="mt-20 border-t border-gray-200 pt-10 pb-10 text-center text-gray-500 text-sm">
        <p>© 2025 Ezzy Gestão. Todos os direitos reservados.</p>
        <div className="flex justify-center gap-6 mt-4 font-medium">
          <Link to="/" className="hover:text-orange-600 transition">
            Home
          </Link>
          <Link to="/privacidade" className="hover:text-orange-600 transition">
            Privacidade
          </Link>
          <Link to="/ajuda" className="hover:text-orange-600 transition">
            Central de Ajuda
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfUse;

import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-orange-600 font-bold mb-8 hover:underline"
        >
          <ArrowLeft size={20} /> Voltar para o Início
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Política de Privacidade
        </h1>
        <p className="text-gray-500 mb-8 text-sm">
          Última atualização: 11 de Fevereiro de 2026
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              1. Introdução
            </h2>
            <p>
              Nós do <strong>Ezzy</strong> estamos comprometidos em proteger a
              sua privacidade. Esta Política de Privacidade explica como
              coletamos, usamos, e protegemos suas informações pessoais ao
              utilizar nosso aplicativo e site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. Dados que Coletamos
            </h2>
            <p className="mb-2">
              Para fornecer nossos serviços, podemos coletar os seguintes dados:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Informações de Cadastro:</strong> Nome, e-mail, número
                de telefone (WhatsApp) e nome da empresa.
              </li>
              <li>
                <strong>Dados de Uso:</strong> Informações sobre como você
                interage com o aplicativo, registros de serviços e clientes
                inseridos na plataforma.
              </li>
              <li>
                <strong>Dados do Dispositivo:</strong> Modelo do aparelho,
                sistema operacional e identificadores únicos para fins de
                suporte e melhoria.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. Como Usamos seus Dados
            </h2>
            <p>Utilizamos suas informações para:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Fornecer e manter o Serviço;</li>
              <li>Gerenciar sua conta e acesso à equipe;</li>
              <li>
                Entrar em contato com você para suporte, atualizações ou
                comunicados importantes;
              </li>
              <li>Melhorar a funcionalidade e a experiência do usuário.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. Compartilhamento de Dados
            </h2>
            <p>
              Nós <strong>não vendemos</strong> seus dados pessoais. Podemos
              compartilhar informações apenas com:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                Provedores de serviços terceirizados essenciais (ex: hospedagem
                em nuvem, serviços de envio de e-mail/autenticação), que,
                seguindo estritas obrigações de confidencialidade, processam
                dados em nosso nome.
              </li>
              <li>Autoridades legais, quando exigido por lei.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. Segurança dos Dados
            </h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais para
              proteger seus dados, incluindo criptografia em trânsito e em
              repouso. No entanto, nenhum método de transmissão pela internet é
              100% seguro, e não podemos garantir segurança absoluta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. Seus Direitos (LGPD)
            </h2>
            <p>
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem
              direito a solicitar o acesso, correção, anonimização ou exclusão
              de seus dados pessoais. Para exercer esses direitos, entre em
              contato conosco.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contato</h2>
            <p>
              Se você tiver dúvidas sobre esta Política de Privacidade, entre em
              contato pelo e-mail:{" "}
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
    </div>
  );
};

export default PrivacyPolicy;

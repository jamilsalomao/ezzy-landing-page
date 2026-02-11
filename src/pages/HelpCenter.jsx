import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  HelpCircle,
  ChevronDown,
  Trash2,
  Mail,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

const faqData = [
  {
    question: "Como crio um novo orçamento?",
    answer:
      "No menu principal, clique em '+' ou 'Novo', selecione o cliente desejado e adicione os serviços. Você pode salvar como 'Em Análise' e enviar para o cliente aprovar.",
  },
  {
    question: "Como funciona o pagamento parcelado?",
    answer:
      "Ao finalizar um serviço e registrar o pagamento, selecione a opção de pagamento (ex: Cartão de Crédito) e escolha o número de parcelas. O financeiro registrará as entradas nos meses correspondentes.",
  },
  {
    question: "Posso adicionar membros à minha equipe?",
    answer:
      "Sim! No plano Pro, vá em 'Equipe' > 'Convidar Membro'. Você pode definir permissões como 'Administrador' (acesso total) ou 'Funcionário' (acesso restrito).",
  },
  {
    question: "Se eu trocar de celular, perco meus dados?",
    answer:
      "Não! Seus dados são salvos automaticamente na nuvem. Basta baixar o app no novo aparelho e fazer login com seu e-mail e senha para recuperar tudo instantaneamente.",
  },
  {
    question: "Consigo ver quanto lucrei no mês?",
    answer:
      "Sim. Na aba 'Financeiro' ou 'Relatórios', voê tem uma visão clara das suas receitas, despesas e lucro líquido, podendo filtrar por mês ou período personalizado.",
  },
  {
    question: "Posso enviar o orçamento em PDF para o cliente?",
    answer:
      "Com certeza. Ao finalizar um orçamento ou ordem de serviço, clique no ícone de 'Compartilhar' e escolha a opção PDF. O documento vai pronto e profissional para o WhatsApp do cliente.",
  },
  {
    question: "Como aviso o cliente sobre o andamento do serviço?",
    answer:
      "O Ezzy tem integração direta com o WhatsApp. Em cada etapa (Aprovado, Em Andamento, Concluído), você tem um botão rápido para enviar uma mensagem pré-definida de atualização para o seu cliente.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Absolutamente. Utilizamos criptografia de ponta (SSL) e servidores seguros na nuvem para armazenar e proteger as informações da sua empresa e dos seus clientes.",
  },
];

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [hash]);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-orange-600 font-bold mb-8 hover:underline"
        >
          <ArrowLeft size={20} /> Voltar para o Início
        </Link>

        <div className="text-center mb-12 border-b border-gray-50 pb-10">
          <div className="inline-block p-3 rounded-full bg-orange-100 text-orange-600 mb-6">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Central de Ajuda
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tire suas dúvidas e gerencie sua conta com total transparência.
          </p>
        </div>

        <div className="space-y-16">
          <section id="faq">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <MessageCircle className="text-orange-500" /> Perguntas Frequentes
            </h2>
            <div className="space-y-4">
              {faqData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-gray-50 transition"
                  >
                    <span className="font-semibold text-gray-800 text-lg">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={20} className="text-gray-400" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50 mt-4">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </section>

          <section
            id="dados"
            className="bg-white rounded-2xl border border-red-100 overflow-hidden shadow-sm"
          >
            <div className="bg-red-50 p-6 border-b border-red-100">
              <h2 className="text-xl font-bold text-red-700 flex items-center gap-2">
                <Trash2 size={24} /> Gerenciamento de Conta e Exclusão de Dados
              </h2>
            </div>
            <div className="p-8">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Valorizamos sua privacidade e controle sobre seus dados. Caso
                você deseje <strong>excluir permanentemente</strong> sua conta e
                todos os dados associados ao Ezzy (incluindo clientes, serviços
                e histórico financeiro), você pode solicitar a exclusão a
                qualquer momento.
              </p>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Mail size={20} className="text-gray-500" /> Como solicitar:
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>
                    <span className="font-semibold text-gray-900">
                      1. Envie um e-mail para:
                    </span>
                    <a
                      href="mailto:contato.ezzyapp@gmail.com"
                      className="text-orange-600 font-bold ml-1 hover:underline"
                    >
                      contato.ezzyapp@gmail.com
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold text-gray-900">
                      2. Assunto do E-mail:
                    </span>{" "}
                    "Solicitação de Exclusão de Conta"
                  </li>
                  <li>
                    <span className="font-semibold text-gray-900">
                      3. No corpo do e-mail:
                    </span>{" "}
                    Informe seu nome completo e o e-mail/telefone cadastrado no
                    app.
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                <ShieldCheck size={20} className="shrink-0 mt-0.5" />
                <p>
                  <strong>Prazo e Segurança:</strong> Após recebermos sua
                  solicitação, processaremos a exclusão completa dos seus dados
                  em até <strong>30 dias</strong>. Você receberá um e-mail de
                  confirmação assim que o processo for concluído. Esta ação é
                  irreversível.
                </p>
              </div>
            </div>
          </section>

          <div className="text-center pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Ainda precisa de ajuda?
            </h3>
            <p className="text-gray-600 mb-8">
              Nossa equipe de suporte está disponível de Segunda a Sexta, das
              09h às 18h.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/5532998622603"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#20bd5a] transition w-full sm:w-auto justify-center shadow-lg shadow-green-100"
              >
                <MessageCircle size={20} />
                Chamar no WhatsApp
              </a>
              <a
                href="mailto:contato.ezzyapp@gmail.com"
                className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-900 transition w-full sm:w-auto justify-center shadow-lg shadow-gray-200"
              >
                <Mail size={20} />
                Enviar E-mail
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-20 border-t border-gray-200 pt-10 pb-10 text-center text-gray-500 text-sm">
        <p>© 2025 Ezzy Gestão. Todos os direitos reservados.</p>
        <div className="flex justify-center gap-6 mt-4 font-medium">
          <Link to="/" className="hover:text-orange-600 transition">
            Home
          </Link>
          <Link to="/termos" className="hover:text-orange-600 transition">
            Termos de Uso
          </Link>
          <Link to="/privacidade" className="hover:text-orange-600 transition">
            Privacidade
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default HelpCenter;

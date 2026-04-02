import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import SubHeader from "../components/SubHeader";
import SubFooter from "../components/SubFooter";
import { useDynamicTitle } from "../hooks/useDynamicTitle";
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

// Componentes compartilhados centralizados em src/components/

const HelpCenter = () => {
  useDynamicTitle("Central de Ajuda | Ezzy App");
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SubHeader />
      <div className="flex-1 py-10 px-6">
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
                <Motion.div
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
                    <Motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={20} className="text-gray-400" />
                    </Motion.div>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <Motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50 mt-4">
                          {item.answer}
                        </div>
                      </Motion.div>
                    )}
                  </AnimatePresence>
                </Motion.div>
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
                todos os dados associados ao <strong>Ezzy App</strong> (incluindo clientes, serviços
                e histórico financeiro), você pode solicitar a exclusão a
                qualquer momento.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-green-600" /> Pelo Aplicativo (Recomendado):
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li>
                      1. Abra o <strong>Ezzy App</strong> no seu celular.
                    </li>
                    <li>
                      2. Vá até a aba <strong>Perfil</strong>.
                    </li>
                    <li>
                      3. Logo abaixo do botão "Sair da Conta", clique em{" "}
                      <span className="text-red-600 font-bold">"Excluir Minha Conta"</span>.
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Mail size={20} className="text-gray-500" /> Por E-mail:
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
                        2. Assunto:
                      </span>{" "}
                      "Solicitação de Exclusão de Conta"
                    </li>
                    <li>
                      Informe seu nome e o e-mail/telefone cadastrado no app.
                    </li>
                  </ul>
                </div>
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
            <div className="flex flex-col items-center justify-center gap-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <a
                  href="https://wa.me/message/TBPV5F5AJM5WJ1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#20bd5a] transition w-full sm:w-auto justify-center shadow-lg shadow-green-100 font-sans"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
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

              {/* Seção visual do QR Code do WhatsApp */}
              <div className="hidden md:flex flex-col items-center gap-3 p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                  <img 
                    src="/ezzy-whatsapp-qrcode.png" 
                    alt="WhatsApp Business QR Code" 
                    className="w-32 h-32"
                  />
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Escaneie para suporte rápido
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
      <SubFooter />
    </div>
  );
};

export default HelpCenter;

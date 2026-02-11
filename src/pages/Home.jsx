import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Download,
  AlertTriangle,
  CheckCircle,
  Users,
  PieChart,
  Search,
  ArrowRight,
  HelpCircle,
  Clock,
  FileWarning,
  Wallet,
  MessageCircle,
  Cloud,
  ChevronDown,
  TrendingUp,
  Star,
  Award,
  ArrowUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const faqData = [
  {
    question: "O aplicativo é gratuito?",
    answer:
      "Sim! Durante a fase Beta, o uso do Ezzy é totalmente gratuito para todos os recursos.",
  },
  {
    question: "Funciona em iPhone (iOS)?",
    answer:
      "No momento, o Ezzy está disponível exclusivamente para Android. A versão para iOS está em desenvolvimento.",
  },
  {
    question: "Preciso de internet para usar?",
    answer:
      "Para garantir que seus dados estejam sempre salvos e sincronizados com sua equipe, o Ezzy precisa de uma conexão com a internet (Wi-Fi ou Dados Móveis).",
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

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const heroImages = [
    "ezzy-inicial.png",
    "ezzy-dashboard.png",
    "ezzy-lista-clientes.png",
    "ezzy-cliente-detalhes.png",
    "ezzy-cadastro.png",
    "ezzy-equipe.png",
    "ezzy-ajuda.png",
    "ezzy-perfil.png",
  ];

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const [isSending, setIsSending] = useState(false);
  const form = useRef();

  const scrollToDownload = () => {
    document
      .getElementById("download-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const serviceID = "service_pal3j1d";
    const templateAdmin = "template_pjbrkjx";
    const templateClient = "template_l5dxgqc";
    const publicKey = "_vSwto5VVZIW0kjcd";

    emailjs
      .sendForm(serviceID, templateAdmin, form.current, publicKey)
      .then(() => {
        console.log("Email para Admin enviado!");

        return emailjs.sendForm(
          serviceID,
          templateClient,
          form.current,
          publicKey,
        );
      })
      .then(() => {
        console.log("Email para Cliente enviado!");
        setFormSubmitted(true);
        setIsSending(false);
      })
      .catch((error) => {
        console.log("Erro ao enviar:", error);
        alert(
          "Ocorreu um erro ao enviar. Tente novamente ou chame no WhatsApp.",
        );
        setIsSending(false);
      });
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="text-3xl font-extrabold tracking-tight text-gray-900 flex items-center gap-1">
            ezzy<span className="text-orange-500">.</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a
              href="#funcionalidades"
              className="hover:text-orange-600 transition"
            >
              Funcionalidades
            </a>
            <a href="#faq" className="hover:text-orange-600 transition">
              Dúvidas Frequentes
            </a>
            <Link to="/ajuda" className="hover:text-orange-600 transition">
              Suporte
            </Link>
            <Motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToDownload}
              className="bg-orange-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-200"
            >
              Baixar Aplicativo
            </Motion.button>
          </div>

          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="md:hidden bg-white border-t p-6 space-y-4 shadow-xl overflow-hidden"
          >
            <a
              href="#funcionalidades"
              className="block text-gray-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Funcionalidades
            </a>
            <a
              href="#funcionalidades"
              className="block text-gray-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Funcionalidades
            </a>
            <a
              href="#faq"
              className="block text-gray-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Dúvidas Frequentes
            </a>
            <Link
              to="/ajuda"
              className="block text-gray-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Suporte
            </Link>
            <button
              onClick={() => {
                scrollToDownload();
                setIsMenuOpen(false);
              }}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold"
            >
              Baixar Aplicativo
            </button>
          </Motion.div>
        )}
      </nav>
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        <Motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-8 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
            Gestão de clientes <br />
            nunca foi tão <span className="text-orange-600">Ezzy</span>.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0">
            Simplifique seus atendimentos e controle sua equipe com o app que
            faz jus ao nome: fácil, rápido e eficiente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToDownload}
              className="bg-orange-600 text-white text-lg px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition shadow-xl shadow-orange-200 flex items-center justify-center gap-2"
            >
              Começar Agora <ArrowRight size={20} />
            </Motion.button>
          </div>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 w-full max-w-sm md:max-w-md mx-auto relative h-[600px] flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <Motion.img
              key={currentImageIndex}
              src={heroImages[currentImageIndex]}
              alt={`Dashboard Ezzy Tela ${currentImageIndex + 1}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-contain absolute inset-0"
            />
          </AnimatePresence>
        </Motion.div>
      </section>

      {/* Seção de Estatísticas (Prova Social) */}
      <div className="bg-orange-600 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 opacity-10 pattern-dots"></div>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-white relative z-10 text-center">
          {[
            { number: "+15", label: "Empresas Cadastradas", icon: Users },
            { number: "98%", label: "Satisfação dos Usuários", icon: Star },
            { number: "+300", label: "Atendimentos Geridos", icon: PieChart },
            { number: "24/7", label: "Disponibilidade", icon: Cloud },
          ].map((stat, i) => (
            <Motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="bg-white/20 p-3 rounded-full mb-3">
                <stat.icon size={24} className="text-white" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-extrabold mb-1">
                {stat.number}
              </h3>
              <p className="text-orange-100 text-sm font-medium uppercase tracking-wide">
                {stat.label}
              </p>
            </Motion.div>
          ))}
        </div>
      </div>

      <Motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="bg-gray-50 py-20 px-6"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Você ainda controla sua empresa no papel?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Pequenos erros na gestão manual se acumulam e fazem você perder
            dinheiro e tempo todos os dias.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: AlertTriangle,
                title: "Histórico Perdido",
                desc: "Informações importantes de clientes ficam perdidas em conversas antigas de WhatsApp.",
              },
              {
                icon: FileWarning,
                title: "Caderninho Inseguro",
                desc: "Se perder o caderno ou molhar a agenda, todos os dados do seu negócio somem.",
              },
              {
                icon: Users,
                title: "Equipe Desalinhada",
                desc: "Você nunca sabe exatamente quais serviços seus funcionários concluíram no dia.",
              },
              {
                icon: Wallet,
                title: "Falta de Métricas",
                desc: "Dificuldade em saber o lucro real do mês ou qual serviço é o carro-chefe da empresa.",
              },
              {
                icon: Clock,
                title: "Perda de Tempo",
                desc: "Gastar horas procurando o telefone de um cliente antigo em pilhas de papel.",
              },
              {
                icon: Search,
                title: "Atendimento Lento",
                desc: "Demora para responder o cliente porque não lembra o que foi negociado anteriormente.",
              },
            ].map((item, i) => (
              <Motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-red-200 transition text-left group"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition">
                    <item.icon size={20} />
                  </div>
                  <h3 className="font-bold text-gray-800">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </Motion.section>

      <Motion.section
        id="funcionalidades"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-20 px-6 max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <span className="text-orange-600 font-bold tracking-wide uppercase text-sm">
            Funcionalidades
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
            Tudo fica mais Ezzy
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: CheckCircle,
              title: "Histórico na Timeline",
              desc: "Esqueça a memória. O Ezzy guarda cada interação, serviço e data automaticamente.",
            },
            {
              icon: Users,
              title: "Hierarquia de Equipe",
              desc: "Defina quem manda e quem executa. Dono, Admin ou Funcionário com permissões certas.",
            },
            {
              icon: PieChart,
              title: "Métricas Claras",
              desc: "Visual, não numérico. Gráficos de pizza e barras para entender seu negócio em segundos.",
            },
            {
              icon: Search,
              title: "Busca Instantânea",
              desc: "Achou, clicou. Encontre clientes pelo nome num piscar de olhos.",
            },
            {
              icon: MessageCircle,
              title: "WhatsApp em 1 Clique",
              desc: "Agilize o contato. Abra a conversa com o cliente direto pelo app sem precisar salvar o número.",
            },
            {
              icon: Cloud,
              title: "Backup Automático",
              desc: "Trocou de celular? Sem problemas. Seus dados estão salvos na nuvem e sincronizados em tempo real.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-4 p-6 rounded-2xl hover:bg-gray-50 transition duration-300"
            >
              <div className="shrink-0 w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                <item.icon size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Motion.section>

      {/* Seção de Depoimentos (Prova Social) */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-orange-600 font-bold tracking-wide uppercase text-sm">
              Depoimentos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
              Quem usa, recomenda
            </h2>
          </Motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ricardo Mendes",
                role: "Barbearia Vintage",
                text: "Antes eu perdia muito tempo procurando ficha de cliente no papel. Com o Ezzy, eu acho tudo em segundos e ainda sei quanto faturei no dia.",
                rating: 5,
              },
              {
                name: "Ana Clara",
                role: "Estética & Bem-Estar",
                text: "A equipe adorou! Agora cada um sabe exatamente sua comissão e eu consigo controlar tudo pelo celular sem ficar no pé de ninguém.",
                rating: 5,
              },
              {
                name: "Felipe Costa",
                role: "Assistência Técnica",
                text: "Simples e direto ao ponto. O que mais gosto é a facilidade de mandar mensagem no WhatsApp do cliente sem ter que salvar o número.",
                rating: 5,
              },
            ].map((testimonial, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition relative"
              >
                <div className="flex gap-1 text-orange-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-lg">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-gray-50 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Perguntas Frequentes
            </h2>
          </Motion.div>

          <div className="space-y-4">
            {faqData.map((item, index) => (
              <Motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.1 },
                  },
                }}
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <h3 className="flex items-center gap-3 font-bold text-lg text-gray-800">
                    <HelpCircle
                      size={20}
                      className="text-orange-500 shrink-0"
                    />
                    {item.question}
                  </h3>
                  <Motion.div
                    animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} className="text-gray-400" />
                  </Motion.div>
                </button>

                <AnimatePresence>
                  {openFaqIndex === index && (
                    <Motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pl-14 text-gray-600 border-t border-gray-50 pt-4">
                        {item.answer}
                      </div>
                    </Motion.div>
                  )}
                </AnimatePresence>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="download-section"
        className="py-20 px-6 max-w-3xl mx-auto text-center"
      >
        <Motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pronto para profissionalizar sua gestão?
            </h2>
            <p className="text-gray-600">
              Preencha seus dados. Enviaremos o link de acesso ao Beta (Android)
              via WhatsApp ou E-mail.
            </p>
          </div>

          {!formSubmitted ? (
            <form
              ref={form}
              onSubmit={handleFormSubmit}
              className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-left"
            >
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Seu Nome Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Ex: Jamil Salomão"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome da Empresa{" "}
                    <span className="text-gray-400 font-normal text-xs">
                      (ou deixe em branco se for autônomo)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Ex: Tech Soluções"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(00) 90000-0000"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="seu@email.com"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition"
                    />
                  </div>
                </div>

                <Motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSending}
                  className={`w-full font-bold py-4 rounded-lg transition flex items-center justify-center gap-2 mt-4 shadow-lg shadow-orange-200 ${
                    isSending
                      ? "bg-orange-400 cursor-not-allowed"
                      : "bg-orange-600 hover:bg-orange-700 text-white"
                  }`}
                >
                  {isSending ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Download size={20} />
                      Solicitar Acesso Beta
                    </>
                  )}
                </Motion.button>
              </div>
              <p className="text-xs text-center text-gray-400 mt-6">
                🔒 Seus dados estão seguros e não enviaremos spam.
              </p>
            </form>
          ) : (
            <Motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-50 p-8 rounded-2xl border border-green-100 inline-block"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">
                Solicitação Recebida!
              </h3>
              <p className="text-green-700 max-w-sm mx-auto">
                Obrigado! Nossa equipe vai analisar seu perfil e enviar o link
                do Ezzy para o seu WhatsApp/Email em breve.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-6 text-sm text-green-700 font-semibold hover:text-green-900 underline"
              >
                Cadastrar outra pessoa
              </button>
            </Motion.div>
          )}
        </Motion.div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm">
            © 2025 Ezzy Gestão. Todos os direitos reservados.
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <Link to="/termos" className="hover:text-white transition">
              Termos de Uso
            </Link>
            <Link to="/privacidade" className="hover:text-white transition">
              Privacidade
            </Link>
            <Link to="/ajuda" className="hover:text-white transition">
              Suporte
            </Link>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <button
          onClick={scrollToTop}
          className={`bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-500 ease-in-out flex items-center justify-center group relative transform ${
            showBackToTop
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-10 pointer-events-none"
          }`}
          title="Voltar ao Topo"
        >
          <ArrowUp size={24} />
          <span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
            Voltar ao Topo
          </span>
        </button>

        <Motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="mailto:contato.ezzyapp@gmail.com"
          className="bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition duration-300 flex items-center justify-center group relative"
          title="Enviar Email"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          <span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
            Enviar Email
          </span>
        </Motion.a>

        <Motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="https://wa.me/5532998622603"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:bg-[#20bd5a] transition duration-300 flex items-center justify-center group relative"
          title="Conversar no WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <span className="absolute right-full mr-3 bg-[#25D366] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
            Suporte WhatsApp
          </span>
        </Motion.a>
      </div>
      <SpeedInsights />
    </div>
  );
};

export default Home;

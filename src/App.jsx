import React, { useState } from 'react';
import { 
  Menu, X, Download, AlertTriangle, 
  CheckCircle, Users, PieChart, Search, 
  ArrowRight, HelpCircle, Clock, FileWarning, Wallet, 
  MessageCircle, Cloud, Mail,
} from 'lucide-react';

const EzzyLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Função para rolar até o formulário/download
  const scrollToDownload = () => {
    document.getElementById('download-section').scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Captura os dados do formulário
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    console.log("Dados capturados:", data); 
    
    setFormSubmitted(true);
    // Aqui viria a integração com EmailJS ou Formspree
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* --- 1. HEADER (TOPO) --- */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
          {/* Logo */}
          <div className="text-3xl font-extrabold tracking-tight text-gray-900 flex items-center gap-1">
            ezzy<span className="text-orange-500">.</span>
          </div>

          {/* Menu Desktop (Atualizado) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#funcionalidades" className="hover:text-orange-600 transition">Funcionalidades</a>
            <a href="#faq" className="hover:text-orange-600 transition">Dúvidas Frequentes</a>
            <button 
              onClick={scrollToDownload}
              className="bg-orange-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-200"
            >
              Baixar Aplicativo
            </button>
          </div>

          {/* Menu Mobile Button */}
          <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-6 space-y-4 shadow-xl">
            <a href="#funcionalidades" className="block text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>Funcionalidades</a>
            <a href="#faq" className="block text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>Dúvidas Frequentes</a>
            <button 
              onClick={() => { scrollToDownload(); setIsMenuOpen(false); }}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold"
            >
              Baixar Aplicativo
            </button>
          </div>
        )}
      </nav>

      {/* --- 2. HERO SECTION (DESTAQUE) --- */}
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        
        {/* Texto Hero */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
            Gestão de clientes <br/>nunca foi tão <span className="text-orange-600">Ezzy</span>.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0">
            Deixe o difícil para trás. Simplifique seus atendimentos, controle sua equipe e fidelize clientes com o app que faz jus ao nome: fácil, rápido e eficiente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={scrollToDownload}
              className="bg-orange-600 text-white text-lg px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition shadow-xl shadow-orange-200 flex items-center justify-center gap-2"
            >
              Começar Agora <ArrowRight size={20}/>
            </button>
          </div>
        </div>

        {/* Placeholder Imagem/Mockup */}
        <div className="flex-1 w-full max-w-sm md:max-w-md mx-auto relative"> 
            <img src="../public/dashboard-left.png" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* --- 3. A DOR (PROBLEMA) - EXPANDIDA --- */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Você ainda controla sua empresa no papel?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Pequenos erros na gestão manual se acumulam e fazem você perder dinheiro e tempo todos os dias.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Item 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-red-200 transition text-left group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition">
                  <AlertTriangle size={20} />
                </div>
                <h3 className="font-bold text-gray-800">Histórico Perdido</h3>
              </div>
              <p className="text-gray-600 text-sm">Informações importantes de clientes ficam perdidas em conversas antigas de WhatsApp.</p>
            </div>

            {/* Item 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-red-200 transition text-left group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition">
                  <FileWarning size={20} />
                </div>
                <h3 className="font-bold text-gray-800">Caderninho Inseguro</h3>
              </div>
              <p className="text-gray-600 text-sm">Se perder o caderno ou molhar a agenda, todos os dados do seu negócio somem.</p>
            </div>

            {/* Item 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-red-200 transition text-left group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition">
                  <Users size={20} />
                </div>
                <h3 className="font-bold text-gray-800">Equipe Desalinhada</h3>
              </div>
              <p className="text-gray-600 text-sm">Você nunca sabe exatamente quais serviços seus funcionários concluíram no dia.</p>
            </div>

            {/* Item 4 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-red-200 transition text-left group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition">
                  <Wallet size={20} />
                </div>
                <h3 className="font-bold text-gray-800">Falta de Métricas</h3>
              </div>
              <p className="text-gray-600 text-sm">Dificuldade em saber o lucro real do mês ou qual serviço é o carro-chefe da empresa.</p>
            </div>

            {/* Item 5 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-red-200 transition text-left group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition">
                  <Clock size={20} />
                </div>
                <h3 className="font-bold text-gray-800">Perda de Tempo</h3>
              </div>
              <p className="text-gray-600 text-sm">Gastar horas procurando o telefone de um cliente antigo em pilhas de papel.</p>
            </div>

            {/* Item 6 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-red-200 transition text-left group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition">
                  <Search size={20} />
                </div>
                <h3 className="font-bold text-gray-800">Atendimento Lento</h3>
              </div>
              <p className="text-gray-600 text-sm">Demora para responder o cliente porque não lembra o que foi negociado anteriormente.</p>
            </div>

          </div>
        </div>
      </section>

      {/* --- 4. A SOLUÇÃO (FUNCIONALIDADES) - AGORA COM 6 ITENS --- */}
      <section id="funcionalidades" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-orange-600 font-bold tracking-wide uppercase text-sm">Funcionalidades</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">Tudo fica mais Ezzy</h2>
        </div>

        {/* Mudei o Grid para suportar 3 colunas em telas grandes (lg:grid-cols-3) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Item 1 */}
          <div className="flex gap-4 p-6 rounded-2xl hover:bg-gray-50 transition duration-300">
            <div className="shrink-0 w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Histórico na Timeline</h3>
              <p className="text-gray-600">Esqueça a memória. O Ezzy guarda cada interação, serviço e data automaticamente.</p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex gap-4 p-6 rounded-2xl hover:bg-gray-50 transition duration-300">
            <div className="shrink-0 w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Hierarquia de Equipe</h3>
              <p className="text-gray-600">Defina quem manda e quem executa. Dono, Admin ou Funcionário com permissões certas.</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex gap-4 p-6 rounded-2xl hover:bg-gray-50 transition duration-300">
            <div className="shrink-0 w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
              <PieChart size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Métricas Claras</h3>
              <p className="text-gray-600">Visual, não numérico. Gráficos de pizza e barras para entender seu negócio em segundos.</p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex gap-4 p-6 rounded-2xl hover:bg-gray-50 transition duration-300">
            <div className="shrink-0 w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
              <Search size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Busca Instantânea</h3>
              <p className="text-gray-600">Achou, clicou. Encontre clientes pelo nome num piscar de olhos.</p>
            </div>
          </div>

          {/* Item 5 - NOVO (WhatsApp) */}
          <div className="flex gap-4 p-6 rounded-2xl hover:bg-gray-50 transition duration-300">
            <div className="shrink-0 w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
              <MessageCircle size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">WhatsApp em 1 Clique</h3>
              <p className="text-gray-600">Agilize o contato. Abra a conversa com o cliente direto pelo app sem precisar salvar o número na agenda.</p>
            </div>
          </div>

          {/* Item 6 - NOVO (Cloud/Backup) */}
          <div className="flex gap-4 p-6 rounded-2xl hover:bg-gray-50 transition duration-300">
            <div className="shrink-0 w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
              <Cloud size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Backup Automático</h3>
              <p className="text-gray-600">Trocou de celular? Sem problemas. Seus dados estão salvos na nuvem e sincronizados em tempo real.</p>
            </div>
          </div>

        </div>
      </section>

      {/* --- 5. FAQ (PERGUNTAS FREQUENTES) - ATUALIZADO --- */}
      <section id="faq" className="bg-gray-50 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Perguntas Frequentes</h2>
          </div>

          <div className="space-y-4">
            {/* Pergunta 1 - Mantida */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="flex items-center gap-3 font-bold text-lg mb-2 text-gray-800">
                <HelpCircle size={20} className="text-orange-500" />
                O aplicativo é gratuito?
              </h3>
              <p className="text-gray-600 pl-8">
                Sim! Durante a fase Beta, o uso do Ezzy é totalmente gratuito para todos os recursos.
              </p>
            </div>

            {/* Pergunta 2 - Mantida */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="flex items-center gap-3 font-bold text-lg mb-2 text-gray-800">
                <HelpCircle size={20} className="text-orange-500" />
                Funciona em iPhone (iOS)?
              </h3>
              <p className="text-gray-600 pl-8">
                No momento, o Ezzy está disponível exclusivamente para Android. A versão para iOS está em desenvolvimento.
              </p>
            </div>

            {/* Pergunta 3 - NOVA (Sobre Internet) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="flex items-center gap-3 font-bold text-lg mb-2 text-gray-800">
                <HelpCircle size={20} className="text-orange-500" />
                Preciso de internet para usar?
              </h3>
              <p className="text-gray-600 pl-8">
                Para garantir que seus dados estejam sempre salvos e sincronizados com sua equipe, o Ezzy precisa de uma conexão com a internet (Wi-Fi ou Dados Móveis).
              </p>
            </div>
            
            {/* Pergunta 4 - NOVA (Sobre Suporte) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="flex items-center gap-3 font-bold text-lg mb-2 text-gray-800">
                <HelpCircle size={20} className="text-orange-500" />
                E se eu tiver dúvidas ou problemas?
              </h3>
              <p className="text-gray-600 pl-8">
                Nós temos um suporte dedicado via e-mail. Como usuário Beta, você terá contato direto com nosso time de desenvolvimento para resolver qualquer questão rapidamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. DOWNLOAD FORM (ATUALIZADO) --- */}
      <section id="download-section" className="py-20 px-6 max-w-3xl mx-auto text-center">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pronto para profissionalizar sua gestão?</h2>
          <p className="text-gray-600">Preencha seus dados. Enviaremos o link de acesso ao Beta (Android) via WhatsApp ou E-mail.</p>
        </div>

        {!formSubmitted ? (
          <form onSubmit={handleFormSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-left">
            <div className="space-y-5">
              
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome Completo</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Ex: Jamil Salomão" 
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition"
                />
              </div>

              {/* Empresa (Opcional/Híbrido) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa <span className="text-gray-400 font-normal text-xs">(ou deixe em branco se for autônomo)</span></label>
                <input 
                  type="text" 
                  name="company"
                  placeholder="Ex: Tech Soluções ou Barbearia do Silva" 
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition"
                />
              </div>

              {/* WhatsApp e Email lado a lado (em telas grandes) */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="(00) 90000-0000" 
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="seu@email.com" 
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-orange-600 text-white font-bold py-4 rounded-lg hover:bg-orange-700 transition flex items-center justify-center gap-2 mt-4 shadow-lg shadow-orange-200"
              >
                <Download size={20} />
                Solicitar Acesso Beta
              </button>
            </div>
            
            <p className="text-xs text-center text-gray-400 mt-6">
              🔒 Seus dados estão seguros e não enviaremos spam.
            </p>
          </form>
        ) : (
          <div className="bg-green-50 p-8 rounded-2xl border border-green-100 inline-block animate-fade-in-up">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">Solicitação Recebida!</h3>
            <p className="text-green-700 max-w-sm mx-auto">
              Obrigado! Nossa equipe vai analisar seu perfil e enviar o link do Ezzy para o seu WhatsApp/Email em breve.
            </p>
            <button 
              onClick={() => setFormSubmitted(false)} 
              className="mt-6 text-sm text-green-700 font-semibold hover:text-green-900 underline"
            >
              Cadastrar outra pessoa
            </button>
          </div>
        )}
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm">
            © 2025 Ezzy Gestão. Todos os direitos reservados.
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-white transition">Termos de Uso</a>
            <a href="#" className="hover:text-white transition">Privacidade</a>
            <a href="mailto:contato.ezzyapp@gmail.com" className="hover:text-white transition">Suporte</a>
          </div>
        </div>
      </footer>

      {/* --- BOTÕES FLUTUANTES (FIXOS) --- */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        
        {/* Botão Email */}
        <a 
          href="mailto:contato.ezzyapp@gmail.com"
          className="bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 hover:-translate-y-1 transition duration-300 flex items-center justify-center group relative"
          title="Enviar Email"
        >
          {/* SVG do Email */}
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>

          {/* Tooltip opcional que aparece no hover (Desktop) */}
          <span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
            Enviar Email
          </span>
        </a>

        {/* Botão WhatsApp */}
        <a 
          href="https://wa.me/5532998622603" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-xl hover:bg-green-600 hover:-translate-y-1 transition duration-300 flex items-center justify-center group relative"
          title="Conversar no WhatsApp"
        >
          {/* SVG do WhatsApp Oficial */}
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>

          <span className="absolute right-full mr-3 bg-green-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
            Suporte WhatsApp
          </span>
        </a>
      </div>

    </div>
  );
};

export default EzzyLandingPage;
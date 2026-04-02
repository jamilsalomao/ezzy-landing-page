import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { ArrowLeft, Search, AlertTriangle } from "lucide-react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import SubHeader from "../components/SubHeader";
import SubFooter from "../components/SubFooter";
import { useDynamicTitle } from "../hooks/useDynamicTitle";

// ── helpers ──────────────────────────────────────────────────────────────────

function formatDate(isoString) {
  if (!isoString) return "—";
  try {
    const date = new Date(isoString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

const STATUS_CONFIG = {
  ativo: {
    label: "Ativo",
    bg: "bg-blue-100",
    text: "text-blue-700",
    dot: "bg-blue-500",
    ring: "ring-blue-200",
  },
  concluido: {
    label: "Concluído",
    bg: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-500",
    ring: "ring-green-200",
  },
  analise: {
    label: "Em Análise",
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    dot: "bg-yellow-500",
    ring: "ring-yellow-200",
  },
};

function getStatusConfig(status) {
  return (
    STATUS_CONFIG[status?.toLowerCase()] || {
      label: status || "Desconhecido",
      bg: "bg-gray-100",
      text: "text-gray-600",
      dot: "bg-gray-400",
      ring: "ring-gray-200",
    }
  );
}

// ── sub-components ────────────────────────────────────────────────────────────

// Removidos Header e Footer (agora global)

function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
      <p className="text-gray-500 text-sm font-medium">
        Buscando informações do serviço…
      </p>
    </div>
  );
}

function SearchForm() {
  const [inputVal, setInputVal] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    let idExtracted = inputVal.trim();
    // Tenta extrair o ID caso o usuário tenha colado a URL inteira
    try {
      if (idExtracted.includes("http")) {
        const url = new URL(idExtracted);
        const params = new URLSearchParams(url.search);
        if (params.has("id")) {
          idExtracted = params.get("id");
        }
      }
    } catch {
      // Ignora erro de parser e usa a string original
    }

    // Navegação via React Router (sem piscar a tela)
    navigate(`?id=${encodeURIComponent(idExtracted)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-3 mx-auto">
      <input
        type="text"
        placeholder="Cole o código ou link de rastreio..."
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition text-sm text-gray-800 placeholder-gray-400 font-medium"
      />
      <button
        type="submit"
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-orange-200 transition cursor-pointer"
      >
        Rastrear Serviço
      </button>
    </form>
  );
}

function SearchState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center px-4 w-full">
      <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-2 overflow-hidden shadow-inner">
        <Motion.div
          animate={{ x: [-6, 6, -6], rotate: [-15, 15, -15], y: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <Search size={32} />
        </Motion.div>
      </div>
      <h2 className="text-gray-900 font-bold text-2xl">Rastrear Serviço</h2>
      <p className="text-gray-500 max-w-sm leading-relaxed mb-6">
        Digite o código de rastreamento ou cole o link recebido para acompanhar o andamento.
      </p>
      <SearchForm />
    </div>
  );
}

function ErrorState({ message, icon, showSearch = false }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center px-4 w-full">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-3xl">
        {icon}
      </div>
      <p className="text-gray-900 font-bold text-xl">Ops!</p>
      <p className="text-gray-500 max-w-xs leading-relaxed mb-4">{message}</p>
      {showSearch && <SearchForm />}
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = getStatusConfig(status);
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ring-2 ${cfg.bg} ${cfg.text} ${cfg.ring}`}
    >
      <span className={`w-2 h-2 rounded-full ${cfg.dot} animate-pulse`} />
      {cfg.label}
    </span>
  );
}

function Timeline({ items }) {
  const reversed = items.slice().reverse();
  return (
    <div className="mt-6">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
        Histórico
      </h3>
      <ol className="relative flex flex-col gap-0">
        {reversed.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === reversed.length - 1;
          return (
            <li key={index} className="flex gap-4">
              {/* Linha vertical + bolinha */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-3.5 h-3.5 rounded-full shrink-0 mt-1 ring-2 ring-white shadow ${
                    isFirst ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
                {!isLast && (
                  <div className="w-0.5 flex-1 bg-gray-200 my-1" />
                )}
              </div>
              {/* Conteúdo */}
              <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
                <p className="text-xs text-gray-400 font-medium mb-0.5">
                  {item.date}
                </p>
                <p className="text-sm text-gray-800 font-medium leading-snug">
                  {item.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  por{" "}
                  <span className="font-semibold text-gray-500">
                    {item.author}
                  </span>
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ServiceCard({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 max-w-lg w-full mx-auto">
      {/* Nome do serviço */}
      <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
        {data.serviceName}
      </h1>

      {/* Status badge */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <StatusBadge status={data.status} />
        {data.updatedAt && (
          <span className="text-xs text-gray-400">
            Última atualização:{" "}
            <span className="font-medium text-gray-600">
              {formatDate(data.updatedAt)}
            </span>
          </span>
        )}
      </div>

      <hr className="border-gray-100 mb-2" />

      {/* Timeline */}
      {data.timeline && data.timeline.length > 0 ? (
        <Timeline items={data.timeline} />
      ) : (
        <p className="text-sm text-gray-400 mt-4">
          Nenhuma atualização registrada ainda.
        </p>
      )}
    </div>
  );
}

// ── main page ─────────────────────────────────────────────────────────────────

const StatusTracking = () => {
  useDynamicTitle("Status do Serviço | Ezzy App");

  const [state, setState] = useState("loading"); // loading | notfound | error | success
  const [serviceData, setServiceData] = useState(null);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const serviceId = params.get("id");

  useEffect(() => {
    async function fetchService() {
      // ID ausente ou vazio
      if (!serviceId || serviceId.trim() === "") {
        setState("idle");
        return;
      }

      try {
        const docRef = doc(db, "public_tracking", serviceId.trim());
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setState("notfound");
        } else {
          setServiceData(docSnap.data());
          setState("success");
        }
      } catch {
        setState("error");
      }
    }

    fetchService();
  }, [serviceId]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <SubHeader />

      <main className="flex-1 flex flex-col items-center justify-start px-4 py-10 w-full max-w-4xl mx-auto">
        <div className="w-full mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-orange-600 font-bold hover:underline"
          >
            <ArrowLeft size={20} /> Voltar para o Início
          </Link>
        </div>
        {state === "loading" && <Spinner />}

        {state === "idle" && <SearchState />}

        {state === "notfound" && (
          <ErrorState
            icon={<AlertTriangle size={32} />}
            message="Serviço não encontrado. Verifique se o link ou código informado está correto."
            showSearch={true}
          />
        )}

        {state === "error" && (
          <ErrorState
            icon="🌐"
            message="Não foi possível carregar o serviço no momento. Verifique sua conexão e tente novamente."
            showSearch={true}
          />
        )}

        {state === "success" && serviceData && (
          <ServiceCard data={serviceData} />
        )}
      </main>

      <SubFooter />
    </div>
  );
};

export default StatusTracking;

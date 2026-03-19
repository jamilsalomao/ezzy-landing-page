import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

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

function Header() {
  return (
    <header className="w-full bg-white shadow-sm py-4 px-6 flex justify-center items-center">
      <span className="text-2xl font-extrabold tracking-tight text-gray-900">
        ezzy<span className="text-orange-500">.</span>
      </span>
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-full py-6 text-center text-sm text-gray-400">
      Acompanhamento fornecido por{" "}
      <span className="font-semibold text-gray-500">EzzyApp</span>
    </footer>
  );
}

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

function ErrorState({ message, icon }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center px-4">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-400 text-3xl">
        {icon}
      </div>
      <p className="text-gray-700 font-semibold text-lg">Ops!</p>
      <p className="text-gray-500 max-w-xs leading-relaxed">{message}</p>
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
  const [state, setState] = useState("loading"); // loading | notfound | error | success
  const [serviceData, setServiceData] = useState(null);

  const params = new URLSearchParams(window.location.search);
  const serviceId = params.get("id");

  useEffect(() => {
    async function fetchService() {
      // ID ausente ou vazio
      if (!serviceId || serviceId.trim() === "") {
        setState("notfound");
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
      } catch (err) {
        console.error("Erro ao buscar serviço:", err);
        setState("error");
      }
    }

    fetchService();
  }, [serviceId]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-start px-4 py-10">
        {state === "loading" && <Spinner />}

        {state === "notfound" && (
          <ErrorState
            icon="⚠️"
            message="Link inválido ou serviço não encontrado. Verifique o link recebido."
          />
        )}

        {state === "error" && (
          <ErrorState
            icon="🌐"
            message="Não foi possível carregar o serviço no momento. Verifique sua conexão e tente novamente."
          />
        )}

        {state === "success" && serviceData && (
          <ServiceCard data={serviceData} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default StatusTracking;

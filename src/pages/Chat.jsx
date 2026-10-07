import { useState } from "react";
import { api } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Chat() {
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    {
      role: "assistant",
      content:
        "Soy AstroIA. Pregúntame por un planeta, una estrella o un fenómeno, o dime qué te gustaría observar esta noche.",
    },
  ]);
  const [busy, setBusy] = useState(false);

  async function send(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const message = input.trim();
    setInput("");
    const next = [...history, { role: "user", content: message }];
    setHistory(next);
    setBusy(true);
    try {
      const d = await api.chat({
        message,
        level: user?.level,
        history: next.slice(-8),
      });
      setHistory([...next, { role: "assistant", content: d.reply + (d.provider === "local" ? "" : "") }]);
    } catch (err) {
      setHistory([...next, { role: "assistant", content: err.message }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="chat-wrap glass">
      <header>
        <p className="eyebrow">Chatbot astronómico</p>
        <h1>Habla con AstroIA</h1>
        <p className="muted">
          Responde con el catálogo del proyecto
          {user ? ` · nivel ${user.level}` : ""}. Si configuras GROQ_API_KEY en el backend, usará un modelo gratis de Groq.
        </p>
      </header>
      <div className="messages">
        {history.map((m, i) => (
          <div key={i} className={`bubble ${m.role}`}>
            {m.content}
          </div>
        ))}
        {busy && <div className="bubble assistant">Mirando al cielo…</div>}
      </div>
      <form onSubmit={send} className="chat-form">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="¿Qué es Betelgeuse?" />
        <button className="btn" disabled={busy}>
          Enviar
        </button>
      </form>
    </div>
  );
}

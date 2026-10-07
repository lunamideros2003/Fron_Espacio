import { useEffect, useRef, useState } from "react";
import { api } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function ChatWidget() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState([
    {
      role: "assistant",
      content: "Soy AstroIA. Pregúntame por un planeta, una estrella o un fenómeno.",
    },
  ]);
  const boxRef = useRef(null);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [history, busy, open]);

  async function send(e) {
    e.preventDefault();
    if (!input.trim() || busy) return;
    const message = input.trim();
    setInput("");
    const next = [...history, { role: "user", content: message }];
    setHistory(next);
    setBusy(true);
    try {
      const d = await api.chat({ message, level: user?.level, history: next.slice(-8) });
      setHistory([...next, { role: "assistant", content: d.reply }]);
    } catch (err) {
      setHistory([...next, { role: "assistant", content: err.message }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`chat-widget ${open ? "open" : ""}`}>
      {open && (
        <div className="chat-panel glass">
          <header className="chat-panel-head">
            <div>
              <p className="eyebrow">Chatbot astronómico</p>
              <h3>Habla con AstroIA</h3>
            </div>
            <button
              type="button"
              className="ghost chat-close"
              aria-label="Cerrar chat"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </header>

          <div className="chat-messages" ref={boxRef}>
            {history.map((m, i) => (
              <div key={i} className={`bubble ${m.role}`}>
                {m.content}
              </div>
            ))}
            {busy && <div className="bubble assistant">Mirando al cielo…</div>}
          </div>

          <form className="chat-form" onSubmit={send}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="¿Qué es Betelgeuse?"
            />
            <button className="btn" disabled={busy} type="submit">
              Enviar
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="chat-fab"
        aria-label={open ? "Cerrar asistente" : "Abrir asistente"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "✕" : "✦"}
      </button>
    </div>
  );
}

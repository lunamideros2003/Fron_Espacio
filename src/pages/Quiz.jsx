import { useEffect, useState } from "react";
import { api } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Quiz() {
  const { user } = useAuth();
  const [level, setLevel] = useState(user?.level || "beginner");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function load() {
    setResult(null);
    setAnswers({});
    api.quiz(level).then((d) => setQuestions(d.questions));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  async function submit(e) {
    e.preventDefault();
    if (!user) {
      setError("Inicia sesión para guardar tu puntuación.");
      return;
    }
    const payload = questions.map((q) => ({ id: q.id, choice: answers[q.id] }));
    if (payload.some((p) => p.choice == null)) {
      setError("Responde todas las preguntas.");
      return;
    }
    setError("");
    const d = await api.submitQuiz({ answers: payload, level });
    setResult(d);
  }

  return (
    <div className="stack">
      <header className="glass head">
        <div>
          <p className="eyebrow">Quiz generado automáticamente</p>
          <h1>Pon a prueba tu cielo</h1>
        </div>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="beginner">Principiante</option>
          <option value="intermediate">Intermedio</option>
          <option value="advanced">Avanzado</option>
        </select>
      </header>
      <form className="stack" onSubmit={submit}>
        {questions.map((q, i) => (
          <fieldset key={q.id} className="glass card">
            <legend>
              {i + 1}. {q.question}
            </legend>
            {q.options.map((opt, idx) => (
              <label key={idx} className="opt">
                <input
                  type="radio"
                  name={q.id}
                  checked={answers[q.id] === idx}
                  onChange={() => setAnswers((a) => ({ ...a, [q.id]: idx }))}
                />
                {opt}
              </label>
            ))}
            {result && (
              <p className={result.review.find((r) => r.id === q.id)?.correct ? "ok" : "bad"}>
                {result.review.find((r) => r.id === q.id)?.explanation}
              </p>
            )}
          </fieldset>
        ))}
        {error && <p className="bad">{error}</p>}
        {!result ? (
          <button className="btn">Enviar respuestas</button>
        ) : (
          <div className="glass card">
            <h2>
              Puntuación: {result.score} / {result.total}
            </h2>
            <button type="button" className="btn" onClick={load}>
              Otro quiz
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

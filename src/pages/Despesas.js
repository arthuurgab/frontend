import { useEffect, useState } from "react";

const Despesas = () => {
  const [despesas, setDespesas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/despesas/");
        if (!response.ok) {
          throw new Error("Erro ao carregar os dados");
        }
        const data = await response.json();
        setDespesas(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <header>
        {error ? (
          <p style={{ color: "red" }}>Erro: {error}</p>
        ) : (
          despesas.map((despesa) => (
            <h1 key={despesa.id}>
              {despesa.nome} - R$ {despesa.valor},00 {despesa.tipo}{" "}
              {despesa.prioridade} {despesa.data}
            </h1>
          ))
        )}
      </header>
    </div>
  );
};

export default Despesas;

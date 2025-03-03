import { useEffect, useState } from "react";

const Despesas = () => {
  const [despesas, setDespesas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/all/");
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
    <table className="container mx-auto bg-slate-500 text-white border border-gray-300">
      <thead className="bg-gray-700 text-white">
        <tr>
          <th className="p-2 border">Nome</th>
          <th className="p-2 border">Valor</th>
          <th className="p-2 border">Paga</th>
          <th className="p-2 border">Data</th>
          <th className="p-2 border">Tipo</th>
          <th className="p-2 border">Prioridade</th>
        </tr>
      </thead>
      <tbody>
        {error ? (
          <tr>
            <td colSpan="6" className="text-center text-red-500 p-4">
              Erro: {error}
            </td>
          </tr>
        ) : (
          despesas.map((despesa) => (
            <tr key={despesa.id} className="border-b border-gray-400">
              <td className="p-2 border">{despesa.nome}</td>
              <td className="p-2 border">{despesa.valor}</td>
              <td className="p-2 border">{despesa.paga ? "Sim" : "Não"}</td>
              <td className="p-2 border">{despesa.data}</td>
              <td className="p-2 border">{despesa.tipo}</td>
              <td className="p-2 border">{despesa.prioridade}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Despesas;

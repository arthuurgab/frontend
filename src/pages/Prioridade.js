import { useEffect, useState } from "react";

const TipoPrioridade = () => {
  const [prioridades, setPrioridades] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPrioridades = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/auxiliares/tipo-prioridade/all/"
        );
        if (!response.ok) {
          throw new Error("Erro ao carregar os dados");
        }
        const data = await response.json();
        setPrioridades(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    loadPrioridades();
  }, []);

  return (
    <div className="w-screen flex justify-center p-6">
      <table className=" bg-slate-500 text-white border border-gray-300">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nome</th>
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
            prioridades.map((prioridades) => (
              <tr key={prioridades.id} className="border-b border-gray-400">
                <td className="p-2 border">{prioridades.id}</td>
                <td className="p-2 border">{prioridades.nome}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TipoPrioridade;

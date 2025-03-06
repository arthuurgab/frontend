import { useEffect, useState } from "react";

const Despesas = () => {
  const [auxiliar, setAuxiliar] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const pago = event.target.checked;
    setInput((values) => ({ ...values, [name]: value, pago }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/despesa/create/");
      const data = await response.json();
      setDespesas(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/despesa/all/");
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
    <div className="w-screen flex justify-center p-6">
      <div className="row p-2">
        <button
          onClick={() => setIsOpen(true)}
          className="mb-4 pg-2 p-2 bg-blue-500 text-white rounded"
        >
          Adicionar
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-200 rounded-lg shadow-lg p-6 max-w-sm w-full transform transition-all scale-95">
            <h2 className="text-xl font-bold mb-4">Título do Modal</h2>
            <div className="text-gray-600">
              <form onSubmit={handleSubmit}>
                <label>
                  {" "}
                  Nome da despesa:
                  <input
                    type="text"
                    name="nome"
                    value={input.nome || ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  />
                </label>
                <label>
                  {" "}
                  Valor da despesa:
                  <input
                    type="number"
                    name="valor"
                    value={input.valor || ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  />
                </label>
                <label>
                  {" "}
                  Pago:
                  <input
                    type="checkbox"
                    name="pago"
                    value={input.pago || ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  />
                </label>
                <label>
                  {" "}
                  Tipo:
                  <select className="border border-gray-300 rounded-lg p-2 w-full">
                    {despesas.map((despesa) => (
                      <option value={despesa.tipo}>{despesa.tipo}</option>
                    ))}
                  </select>
                </label>
                <label>
                  {" "}
                  Tipo:
                  <select className="border border-gray-300 rounded-lg p-2 w-full">
                    {despesas.map((despesa) => (
                      <option value={despesa.prioridade}>
                        {despesa.prioridade}
                      </option>
                    ))}
                  </select>
                </label>
                <input
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition cursor-pointer"
                  type="submit"
                />
              </form>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <table className=" bg-slate-500 text-white border border-gray-300">
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
    </div>
  );
};

export default Despesas;

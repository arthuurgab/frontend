import { useEffect, useState } from "react";

const Modal = ({ isOpen, setIsModalOpen, closeModal }) => {
  const [tipoDespesa, setTipoDespesa] = useState([]);
  const [tipoPrioridade, setTipoPrioridade] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    nome: "",
    valor: "",
    paga: false,
    tipo: "",
    prioridade: "",
    data: "",
  });

  // Carregar os tipos de despesa e prioridade apenas uma vez
  useEffect(() => {
    fetch("http://127.0.0.1:8000/auxiliares/tipo-despesa/all/")
      .then((response) => response.json())
      .then((data) => setTipoDespesa(data))
      .catch((error) =>
        console.error("Erro ao carregar tipos de despesa:", error)
      );

    fetch("http://127.0.0.1:8000/auxiliares/tipo-prioridade/all/")
      .then((response) => response.json())
      .then((data) => setTipoPrioridade(data))
      .catch((error) =>
        console.error("Erro ao carregar tipos de prioridade:", error)
      );
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setInput((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      ...input,
      valor: parseFloat(input.valor), // Converte para número
      paga: Boolean(input.paga), // Garante que seja booleano
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/despesa/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("Despesa criada:", data);
        closeModal();
        window.location.reload();
      } else {
        const errorText = await response.text();
        console.error("Erro ao criar despesa:", errorText);
      }
    } catch (err) {
      console.error("Erro ao enviar os dados:", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-200 rounded-lg shadow-lg p-6 max-w-sm w-full transform transition-all scale-95">
        <h2 className="text-xl font-bold mb-6">Cadastrar Despesa</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Nome da despesa:</label>
            <input
              type="text"
              name="nome"
              value={input.nome}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Valor da despesa:</label>
            <input
              type="number"
              name="valor"
              value={input.valor}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="paga"
              checked={input.paga}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 mx-2"
            />
            <label>Pago</label>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Tipo de Despesa:</label>
            <select
              name="tipo"
              value={input.tipo}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            >
              <option value="">Selecione</option>
              {tipoDespesa.map((td) => (
                <option key={td.id} value={td.id}>
                  {td.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Tipo de Prioridade:</label>
            <select
              name="prioridade"
              value={input.prioridade}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            >
              <option value="">Selecione</option>
              {tipoPrioridade.map((tp) => (
                <option key={tp.id} value={tp.id}>
                  {tp.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Data da despesa:</label>
            <input
              type="date"
              name="data"
              value={input.data}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-lg w-full transition cursor-pointer ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>
        </form>

        <div className="mt-4 flex justify-end">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, setIsOpen, closeModal }) => {
  const [tipoDespesa, setTipoDespesa] = useState([]);
  const [tipoPrioridade, setTipoPrioridade] = useState([]);
  const [input, setInput] = useState({
    nome: "",
    valor: "",
    pago: false,
    tipoDespesaId: "",
    tipoPrioridadeId: "",
  });

  useEffect(() => {
    if (isOpen) {
      // Carregar os tipos de despesa
      fetch("http://127.0.0.1:8000/auxiliares/tipo-despesa/all/")
        .then((response) => response.json())
        .then((data) => setTipoDespesa(data))
        .catch((error) =>
          console.error("Erro ao carregar tipos de despesa:", error)
        );

      // Carregar os tipos de prioridade
      fetch("http://127.0.0.1:8000/auxiliares/tipo-prioridade/all/")
        .then((response) => response.json())
        .then((data) => setTipoPrioridade(data))
        .catch((error) =>
          console.error("Erro ao carregar tipos de prioridade:", error)
        );
    }
  }, [isOpen]); // Recarregar os dados quando o modal for aberto

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setInput((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/despesa/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Despesa criada:", data);
        setIsOpen(false);
      } else {
        console.error("Erro ao criar despesa");
      }
    } catch (err) {
      console.error("Erro ao enviar os dados:", err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-200 rounded-lg shadow-lg p-6 max-w-sm w-full transform transition-all scale-95">
        <h2 className="text-xl font-bold mb-6">Cadastrar Despesa</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">
              Nome da despesa:
              <input
                type="text"
                name="nome"
                value={input.nome || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-2">
              Valor da despesa:
              <input
                type="number"
                name="valor"
                value={input.valor || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </label>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="pago"
              checked={input.pago}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 mx-2"
            />
            <label>Pago</label>
          </div>

          <div className="mb-4">
            <label className="block mb-2">
              Tipo de Despesa:
              <select
                name="tipoDespesaId"
                value={input.tipoDespesaId || ""}
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
            </label>
          </div>

          <div className="mb-4">
            <label className="block mb-2">
              Tipo de Prioridade:
              <select
                name="tipoPrioridadeId"
                value={input.tipoPrioridadeId || ""}
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
            </label>
          </div>

          <div className="mb-6">
            <input
              type="submit"
              value="Cadastrar"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition cursor-pointer w-full"
            />
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

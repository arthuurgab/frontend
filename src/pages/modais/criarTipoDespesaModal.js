import React, { useState } from "react";

const Modal = ({ isOpen, setIsOpen, closeModal }) => {
  const [input, setInput] = useState({ nome: "" });

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auxiliares/tipo-despesa/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("Tipo de despesa criado com sucesso!", data);
        setInput({ nome: "" });
        setIsOpen(false);
        window.location.reload();
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
                value={input.nome}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
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

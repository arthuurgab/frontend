import { useState, useEffect } from "react";
import Modal from "./modais/criarTipoDespesaModal";

const TipoDespesa = () => {
  const [tiposDespesa, setTiposDespesa] = useState([]);
  const [error] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const loadTiposDespesa = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/auxiliares/tipo-despesa/all/"
        );
        if (!response.ok) {
          throw new Error("Erro ao carregar os dados");
        }
        const data = await response.json();
        console.log(data);
        setTiposDespesa(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadTiposDespesa();
  }, []);

  return (
    <div className="w-screen flex justify-center p-6">
      <div className="row p-2">
        <button
          onClick={openModal}
          className="mb-4 pg-2 p-2 bg-blue-500 text-white rounded"
        >
          Adicionar
        </button>
        <Modal isOpen={isModalOpen} closeModal={closeModal} />
      </div>
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
            tiposDespesa.map((tipoDesp) => (
              <tr key={tipoDesp.id} className="border-b border-gray-400">
                <td className="p-2 border">{tipoDesp.id}</td>
                <td className="p-2 border">{tipoDesp.nome}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TipoDespesa;

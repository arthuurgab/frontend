import { useEffect, useState } from "react";
import Modal from "./modais/criarDespesaModal";
import "boxicons/css/boxicons.min.css";

const Filtros = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="mb-6 space-y-6">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-4">
          <i className="bx bx-menu text-4xl cursor-pointer"></i>
          <i className="bx bxs-calendar text-4xl cursor-pointer"></i>
          <div class="relative w-full">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <i class="bx bx-search-alt "></i>
            </div>
            <input
              type="text"
              id="simple-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
              placeholder="Pesquisar Despesa..."
              required
            />
          </div>
        </div>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-[#A05A2C] text-white rounded flex items-center gap-2"
        >
          <i className="bx bx-plus"></i>
          Add Nova Despesa
        </button>
      </div>

      <div className="space-x-2 space-y-2">
        <button>Todos |</button>
        <button className="bg-[#A05A2C] text-white text-sm rounded px-3 py-1">
          Apenas Pagas
        </button>
        <button className="bg-[#A05A2C] text-white text-sm rounded px-3 py-1">
          Apenas Não Pagas
        </button>
        <button className="bg-[#A05A2C] text-white text-sm rounded px-3 py-1">
          Leves
        </button>
        <button className="bg-[#A05A2C] text-white text-sm rounded px-3 py-1">
          Médias
        </button>
        <br />
        <button className="text-white">iodos|</button>
        <button className="bg-[#A05A2C] text-white text-sm rounded px-3 py-1">
          Alta
        </button>
        <button className="bg-[#A05A2C] text-white text-sm rounded px-3 py-1">
          Muito Alta
        </button>
        <button className="bg-[#A05A2C] text-white text-sm rounded px-3 py-1">
          Vencidas
        </button>
        <button className="bg-[#A05A2C] text-white text-sm rounded px-3 py-1">
          Dentro do Prazo
        </button>
      </div>
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

const Despesas = () => {
  const [despesas, setDespesas] = useState([]);
  const [error, setError] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/despesa/${id}/delete/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir a despesa");
      }
      setDespesas(despesas.filter((despesa) => despesa.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container-fluid mx-auto p-6">
      <div Filtros></div>
      <div className="bg-[#EAD7C1] text-white rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-[#4B2E20] text-white">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">Valor</th>
              <th className="p-3">Paga</th>
              <th className="p-3">Data</th>
              <th className="p-3">Tipo</th>
              <th className="p-3">Prioridade</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {error ? (
              <tr>
                <td colSpan="7" className="text-center text-red-500 p-4">
                  Erro: {error}
                </td>
              </tr>
            ) : (
              despesas.map((despesa) => (
                <tr
                  key={despesa.id}
                  className="text-[#A05A2C] font-semibold text-center cursor-pointer hover:bg-[#f2e0cc]"
                >
                  <td className="p-3">{despesa.nome}</td>
                  <td className="p-3">R$ {despesa.valor}</td>
                  <td className="p-3">{despesa.paga ? "Sim" : "Não"}</td>
                  <td className="p-3">{despesa.data}</td>
                  <td className="p-3">{despesa.tipo}</td>
                  <td className="p-3">{despesa.prioridade}</td>
                  <td className="p-3">
                    <button className="bg-[#A05A2C] text-white p-2 rounded mr-2">
                      Editar
                    </button>
                    <button
                      className="bg-[#A05A2C] text-white p-2 rounded"
                      onClick={() => handleDelete(despesa.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Despesas;

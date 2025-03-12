import { useEffect, useState } from "react";

export default function EditModal({ idDespesa, onClose }) {
  const [despesa, setDespesa] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!idDespesa) return;
        const response = await fetch(
          `http://127.0.0.1:8000/despesa/${idDespesa}/`
        );
        if (!response.ok) {
          throw new Error("Erro ao carregar os dados!");
        }
        const data = await response.json();
        setDespesa(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, [idDespesa]); // Atualiza quando o ID muda

  if (!despesa) return null; // Se não houver dados, não exibe nada

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-200 rounded-lg shadow-lg p-6 max-w-sm w-full transform transition-all scale-95">
        <h2 className="text-xl font-bold mb-6">Atualizar Despesa</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2">Nome da despesa:</label>
            <input
              type="text"
              value={despesa.nome}
              className="border border-gray-300 rounded-lg p-2 w-full"
              readOnly
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

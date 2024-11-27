import React, { useEffect, useState } from "react";
import { Agency } from "../lib/types.ts";
import { getAgencies, createAgency, updateAgency, deleteAgency } from "../services/api";

const AgenciesPage: React.FC = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [newAgency, setNewAgency] = useState<Agency>({ nom: "", adresse: "" });
  const [editingAgency, setEditingAgency] = useState<Agency | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Charger la liste des agences
  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        setLoading(true);
        const agencyList = await getAgencies();
        setAgencies(agencyList);
      } catch (err) {
        setError("Erreur lors du chargement des agences.");
      } finally {
        setLoading(false);
      }
    };
    fetchAgencies();
  }, []);

  // Ajouter une agence
  const handleAddAgency = async () => {
    if (!newAgency.nom || !newAgency.adresse) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const addedAgency = await createAgency(newAgency);
      setAgencies([...agencies, addedAgency]);
      setNewAgency({ nom: "", adresse: "" });
    } catch (err) {
      alert("Erreur lors de l'ajout de l'agence.");
    }
  };

  // Modifier une agence
  const handleEditAgency = (agency: Agency) => {
    setEditingAgency(agency);
  };

  const handleUpdateAgency = async () => {
    if (editingAgency) {
      try {
        const updatedAgency = await updateAgency(editingAgency.id!, editingAgency);
        setAgencies(
          agencies.map((agency) =>
            agency.id === updatedAgency.id ? updatedAgency : agency
          )
        );
        setEditingAgency(null);
      } catch (err) {
        alert("Erreur lors de la mise à jour de l'agence.");
      }
    }
  };

  // Supprimer une agence
  const handleDeleteAgency = async (id: number | undefined) => {
    if (!id) return;

    try {
      await deleteAgency(id);
      setAgencies(agencies.filter((agency) => agency.id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression de l'agence.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-indigo-500 mb-8 text-center">
          Gestion des Agences
        </h1>

        {/* Affichage du chargement ou des erreurs */}
        {loading && (
          <p className="text-yellow-400 text-center">
            Chargement des agences...
          </p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Formulaire d'ajout */}
        <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 text-center">
            Ajouter une Agence
          </h2>
          <div className="mb-4 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nom de l'agence"
              value={newAgency.nom}
              onChange={(e) =>
                setNewAgency({ ...newAgency, nom: e.target.value })
              }
              className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Adresse de l'agence"
              value={newAgency.adresse}
              onChange={(e) =>
                setNewAgency({ ...newAgency, adresse: e.target.value })
              }
              className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddAgency}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
            >
              Ajouter
            </button>
          </div>
        </div>

        {/* Liste des agences */}
        <ul className="space-y-4 w-full max-w-lg">
          {agencies.map((agency) => (
            <li
              key={agency.id}
              className="p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="text-lg">
                  {agency.nom} - {agency.adresse}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditAgency(agency)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteAgency(agency.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Formulaire de modification */}
        {editingAgency && (
          <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-green-400 mb-4 text-center">
              Modifier une Agence
            </h2>
            <div className="mb-4 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nom de l'agence"
                value={editingAgency.nom}
                onChange={(e) =>
                  setEditingAgency({ ...editingAgency, nom: e.target.value })
                }
                className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Adresse de l'agence"
                value={editingAgency.adresse}
                onChange={(e) =>
                  setEditingAgency({ ...editingAgency, adresse: e.target.value })
                }
                className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleUpdateAgency}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors mx-auto"
              >
                Mettre à jour
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgenciesPage;

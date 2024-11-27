import React, { useState, useEffect } from "react";
import { Client } from "../lib/types";
import { getClients, createClient, updateClient, deleteClient } from "../services/api";

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [newClient, setNewClient] = useState<Client>({
    nom: "",
    email: "",
    telephone: "",
  });
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les clients depuis l'API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const data = await getClients();
        setClients(data);
      } catch (err) {
        setError("Erreur lors du chargement des clients.");
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  // Ajouter un client
  const handleAddClient = async () => {
    if (!newClient.nom || !newClient.email || !newClient.telephone) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const addedClient = await createClient(newClient);
      setClients([...clients, addedClient]);
      setNewClient({ nom: "", email: "", telephone: "" });
    } catch (err) {
      alert("Erreur lors de l'ajout du client.");
    }
  };

  // Modifier un client (préparer le formulaire)
  const handleEditClient = (client: Client) => {
    setEditingClient(client);
  };

  // Mettre à jour un client
  const handleUpdateClient = async () => {
    if (editingClient) {
      try {
        const updatedClient = await updateClient(editingClient.id!, editingClient);
        setClients(clients.map((client) => (client.id === updatedClient.id ? updatedClient : client)));
        setEditingClient(null);
      } catch (err) {
        alert("Erreur lors de la mise à jour du client.");
      }
    }
  };

  // Supprimer un client
  const handleDeleteClient = async (id: number | undefined) => {
    if (!id) return;

    try {
      await deleteClient(id);
      setClients(clients.filter((client) => client.id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression du client.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="container px-4 py-8 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-indigo-500 mb-8 text-center">Gestion des Clients</h1>

        {/* Affichage du chargement ou des erreurs */}
        {loading && <p className="text-yellow-400 text-center">Chargement des clients...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Formulaire d'ajout */}
        <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 text-center">Ajouter un Client</h2>
          <div className="mb-4 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nom"
              value={newClient.nom}
              onChange={(e) => setNewClient({ ...newClient, nom: e.target.value })}
              className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={newClient.email}
              onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
              className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="Téléphone"
              value={newClient.telephone}
              onChange={(e) => setNewClient({ ...newClient, telephone: e.target.value })}
              className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddClient}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
            >
              Ajouter
            </button>
          </div>
        </div>

        {/* Liste des clients */}
        <ul className="space-y-4">
          {clients.map((client) => (
            <li key={client.id} className="p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-lg">{client.nom} - {client.email} - {client.telephone}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClient(client)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteClient(client.id)}
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
        {editingClient && (
          <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-green-400 mb-4 text-center">Modifier un Client</h2>
            <div className="mb-4 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nom"
                value={editingClient.nom}
                onChange={(e) => setEditingClient({ ...editingClient, nom: e.target.value })}
                className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={editingClient.email}
                onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })}
                className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="tel"
                placeholder="Téléphone"
                value={editingClient.telephone}
                onChange={(e) => setEditingClient({ ...editingClient, telephone: e.target.value })}
                className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleUpdateClient}
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

export default ClientsPage;

import React, { useState, useEffect } from "react";
import { location, Client, Car } from "../lib/types.ts";
import {
  getClients,
  getCars,
  getRentals,
  createRental,
  updateRental,
  deleteRental,
} from "../services/api"; // API calls

const RentalsPage: React.FC = () => {
  const [rentals, setRentals] = useState<location[]>([]);
  const [newRental, setNewRental] = useState<location>({
    dateDebut: "",
    dateFin: "",
    client_id: 0,
    voiture_id: 0,
  });
  const [editingRental, setEditingRental] = useState<location | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const clientsData = await getClients();
        const carsData = await getCars();
        const rentalsData = await getRentals();
        setClients(clientsData);
        setCars(carsData);
        setRentals(rentalsData);
      } catch (err) {
        setError("Erreur lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddRental = async () => {
    if (!newRental.dateDebut || !newRental.dateFin || !newRental.client_id || !newRental.voiture_id) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    try {
      const addedRental = await createRental(newRental);
      setRentals([...rentals, addedRental]);
      alert("Location ajoutée avec succès !");
      setNewRental({ dateDebut: "", dateFin: "", client_id: 0, voiture_id: 0 });
    } catch (err) {
      alert("Erreur lors de l'ajout de la location.");
    }
  };

  const handleEditRental = (rental: location) => {
    setEditingRental(rental);
  };

  const handleUpdateRental = async () => {
    if (editingRental) {
      try {
        const updatedRental = await updateRental(editingRental.id!, editingRental);
        setRentals(rentals.map((rental) => (rental.id === updatedRental.id ? updatedRental : rental)));
        alert("Location mise à jour avec succès !");
        setEditingRental(null);
      } catch (err) {
        alert("Erreur lors de la mise à jour de la location.");
      }
    }
  };

  const handleDeleteRental = async (id: number | undefined) => {
    if (!id) return;

    try {
      await deleteRental(id);
      setRentals(rentals.filter((rental) => rental.id !== id));
      alert("Location supprimée avec succès !");
    } catch (err) {
      alert("Erreur lors de la suppression de la location.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-extrabold text-indigo-500 text-center mb-6">
          Gestion des Locations de Voitures
        </h1>

        {loading && <p className="text-center text-yellow-400">Chargement des données...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Formulaire d'ajout de location */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Ajouter une Location</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="date"
              value={newRental.dateDebut}
              onChange={(e) => setNewRental({ ...newRental, dateDebut: e.target.value })}
              className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={newRental.dateFin}
              onChange={(e) => setNewRental({ ...newRental, dateFin: e.target.value })}
              className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newRental.client_id}
              onChange={(e) => setNewRental({ ...newRental, client_id: parseInt(e.target.value) })}
              className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>Sélectionnez un client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.nom}
                </option>
              ))}
            </select>
            <select
              value={newRental.voiture_id}
              onChange={(e) => setNewRental({ ...newRental, voiture_id: parseInt(e.target.value) })}
              className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>Sélectionnez une voiture</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.marque} {car.modele}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddRental}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              Ajouter Location
            </button>
          </div>
        </div>

        {/* Liste des locations */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Liste des Locations</h2>
          <ul className="space-y-4">
            {rentals.map((rental) => (
              <li
                key={rental.id}
                className="bg-gray-700 p-4 rounded-lg flex justify-between items-center hover:bg-gray-600 transition-colors"
              >
                <div>
                  <p>
                    <span className="font-semibold">Client:</span> {clients.find((c) => c.id === rental.client_id)?.nom}
                  </p>
                  <p>
                    <span className="font-semibold">Voiture:</span> {cars.find((car) => car.id === rental.voiture_id)?.marque}{" "}
                    {cars.find((car) => car.id === rental.voiture_id)?.modele}
                  </p>
                  <p>
                    <span className="font-semibold">Dates:</span> {rental.dateDebut} au {rental.dateFin}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditRental(rental)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteRental(rental.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Formulaire de modification */}
        {editingRental && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-green-400 mb-4">Modifier la Location</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date"
                value={editingRental.dateDebut}
                onChange={(e) =>
                  setEditingRental({ ...editingRental, dateDebut: e.target.value })
                }
                className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={editingRental.dateFin}
                onChange={(e) =>
                  setEditingRental({ ...editingRental, dateFin: e.target.value })
                }
                className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleUpdateRental}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto"
              >
                Sauvegarder
              </button>
              <button
                onClick={() => setEditingRental(null)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors w-full sm:w-auto"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalsPage;

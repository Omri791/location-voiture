import React, { useEffect, useState } from "react";
import { Car } from "../lib/types";
import { getCars, createCar, updateCar, deleteCar } from "../services/api";

const CarsPage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [newCar, setNewCar] = useState<Car>({ marque: "", modele: "", prixParJour: 0 });
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Charger la liste des voitures
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const carList = await getCars();
        setCars(carList);
      } catch (err) {
        console.log('Réponse:',error);
        setError("Erreur lors du chargement des voitures.");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // Ajouter une voiture
  const handleAddCar = async () => {
    if (!newCar.marque || !newCar.modele || !newCar.prixParJour) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const addedCar = await createCar(newCar);
      setCars([...cars, addedCar]);
      setNewCar({ marque: "", modele: "", prixParJour: 0 });
    } catch (err) {
      alert("Erreur lors de l'ajout de la voiture.");
    }
  };

  // Modifier une voiture (préparer le formulaire)
  const handleEditCar = (car: Car) => {
    setEditingCar(car);
  };

  // Mettre à jour une voiture
  const handleUpdateCar = async () => {
    if (editingCar) {
      try {
        const updatedCar = await updateCar(editingCar.id!, editingCar);
        setCars(cars.map((car) => (car.id === updatedCar.id ? updatedCar : car)));
        setEditingCar(null);
      } catch (err) {
        alert("Erreur lors de la mise à jour de la voiture.");
      }
    }
  };

  // Supprimer une voiture
  const handleDeleteCar = async (id: number | undefined) => {
    if (!id) return;

    try {
      await deleteCar(id);
      setCars(cars.filter((car) => car.id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression de la voiture.");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-indigo-500 mb-8 text-center">Gestion des Voitures</h1>

        {/* Affichage du chargement ou des erreurs */}
        {loading && <p className="text-yellow-400 text-center">Chargement des voitures...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Formulaire d'ajout */}
        <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 text-center">Ajouter une Voiture</h2>
          <div className="mb-4 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Marque"
              value={newCar.marque}
              onChange={(e) => setNewCar({ ...newCar, marque: e.target.value })}
              className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Modèle"
              value={newCar.modele}
              onChange={(e) => setNewCar({ ...newCar, modele: e.target.value })}
              className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Prix par jour"
              value={newCar.prixParJour}
              onChange={(e) =>
                setNewCar({ ...newCar, prixParJour: parseFloat(e.target.value) })
              }
              className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddCar}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
            >
              Ajouter
            </button>
          </div>
        </div>

        {/* Liste des voitures */}
        <ul className="space-y-4 w-full max-w-lg">
          {cars.map((car) => (
            <li key={car.id} className="p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-center">
                <span className="text-lg">{car.marque} {car.modele} - {car.prixParJour}€/jour</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditCar(car)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteCar(car.id)}
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
        {editingCar && (
          <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-green-400 mb-4 text-center">Modifier la Voiture</h2>
            <div className="mb-4 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Marque"
                value={editingCar.marque}
                onChange={(e) =>
                  setEditingCar({ ...editingCar, marque: e.target.value })
                }
                className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Modèle"
                value={editingCar.modele}
                onChange={(e) =>
                  setEditingCar({ ...editingCar, modele: e.target.value })
                }
                className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="number"
                placeholder="Prix par jour"
                value={editingCar.prixParJour}
                onChange={(e) =>
                  setEditingCar({
                    ...editingCar,
                    prixParJour: parseFloat(e.target.value),
                  })
                }
                className="border border-gray-600 rounded px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleUpdateCar}
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

export default CarsPage;

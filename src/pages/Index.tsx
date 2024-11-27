import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Users, Building2, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Index: React.FC = () => {
  const modules = [
    {
      title: "Gestion des Voitures",
      icon: Car,
      description: "Gérez votre flotte de véhicules",
      link: "/cars",
    },
    {
      title: "Gestion des Clients",
      icon: Users,
      description: "Gérez vos clients",
      link: "/clients",
    },
    {
      title: "Gestion des Agences",
      icon: Building2,
      description: "Gérez vos agences",
      link: "/agencies",
    },
    {
      title: "Gestion des Locations",
      icon: Calendar,
      description: "Gérez les locations de véhicules",
      link: "/rentals",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Section de l'En-tête */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-500">
          Système de Location de Voitures
        </h1>

        {/* Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link key={module.title} to={module.link} className="group">
                <Card className="transition-all transform hover:scale-105 hover:shadow-2xl border rounded-lg border-indigo-500 bg-gradient-to-r from-blue-600 to-indigo-500">
                  <CardHeader className="p-4">
                    <CardTitle className="flex items-center space-x-3 text-lg font-semibold text-white">
                      <Icon className="w-8 h-8 text-white group-hover:text-yellow-300 transition-colors duration-300 ease-in-out" />
                      <span className="text-white">{module.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-gray-200 text-sm">{module.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Section Statique - À propos */}
      <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg my-12">
        <h2 className="text-3xl font-bold text-center mb-4 text-green-400">À Propos de Notre Service</h2>
        <p className="text-center text-gray-300 text-lg">
          Notre système de location de voitures vous offre la possibilité de gérer
          facilement votre flotte de véhicules, vos clients, et vos agences tout
          en un seul endroit. Nous avons conçu cette plateforme pour faciliter
          votre quotidien et vous aider à optimiser vos opérations.
        </p>
      </div>

      {/* Section Statique - Témoignages */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-pink-500">Ce Que Disent Nos Clients</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-purple-600 to-blue-700 p-6 rounded-lg shadow-md">
            <p className="text-gray-200 text-sm">"Un service rapide et fiable, parfait pour notre entreprise."</p>
            <p className="text-lg font-semibold text-white mt-4">Jean Dupont</p>
            <p className="text-gray-300 text-sm">Responsable Flotte, Entreprise XYZ</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-lg shadow-md">
            <p className="text-gray-200 text-sm">"L'interface est très intuitive et nous permet de tout gérer facilement."</p>
            <p className="text-lg font-semibold text-white mt-4">Marie Martin</p>
            <p className="text-gray-300 text-sm">Directrice, Location Express</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-red-600 p-6 rounded-lg shadow-md">
            <p className="text-gray-200 text-sm">"Une solution complète et efficace pour notre gestion de véhicules."</p>
            <p className="text-lg font-semibold text-white mt-4">Ahmed Ali</p>
            <p className="text-gray-300 text-sm">Gérant, Flotte Pro</p>
          </div>
        </div>
      </div>

      {/* Section Statique - Contact */}
      <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg my-12">
        <h2 className="text-3xl font-bold text-center mb-4 text-yellow-500">Contactez-Nous</h2>
        <p className="text-center text-gray-300 text-lg mb-4">
          Si vous avez des questions ou des préoccupations, n'hésitez pas à nous
          contacter. Notre équipe est là pour vous aider.
        </p>
        <div className="text-center">
          <p className="text-gray-300">Email: support@location-voitures.com</p>
          <p className="text-gray-300">Téléphone: +123 456 789</p>
        </div>
      </div>

      {/* Section Statique - Footer */}
      <footer className="bg-gray-800 py-4 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2024 Location de Voitures. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

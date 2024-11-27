package org.mdw31.tp4SOA.services;

import org.mdw31.tp4SOA.entitys.Voiture;
import org.mdw31.tp4SOA.repositories.VoitureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:8080") // Permet les requêtes CORS globales
@Path("/Voiture")
public class VoitureRS {

    @Autowired
    private VoitureRepository repo;

    // Gérer CORS pour les requêtes préalables (OPTIONS)
    @OPTIONS
    @Path("{any:.*}")
    public Response handlePreflight() {
        return Response.ok()
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, "GET, POST, PUT, DELETE, OPTIONS")
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, "Content-Type, Authorization")
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, "true")
                .build();
    }

    @POST
    @Path("/submit")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response submitVoitureData(Voiture voiture) {
        repo.save(voiture);
        return Response.ok("Voiture reçue et traitée.")
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                .build();
    }

    @DELETE
    @Path("/delete/{voitureId}")
    @Produces(MediaType.TEXT_PLAIN)
    public Response deleteVoitureData(@PathParam("voitureId") Long voitureId) {
        Optional<Voiture> voiture = repo.findById(voitureId);
        if (voiture.isPresent()) {
            repo.deleteById(voitureId);
            return Response.ok("Voiture supprimée avec succès")
                    .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                    .build();
        } else {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Voiture non trouvée")
                    .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                    .build();
        }
    }

    @GET
    @Path("/data")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStoredVoitureData() {
        List<Voiture> voitures = repo.findAll();
        return Response.ok(voitures)
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                .build();
    }

    @PUT
    @Path("/update/{voitureId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response updateVoiture(@PathParam("voitureId") Long voitureId, Voiture voiture) {
        Optional<Voiture> existingVoiture = repo.findById(voitureId);
        if (existingVoiture.isPresent()) {
            Voiture updatedVoiture = existingVoiture.get();
            updatedVoiture.setMarque(voiture.getMarque());
            updatedVoiture.setModele(voiture.getModele());
            updatedVoiture.setPrixParJour(voiture.getPrixParJour());
            repo.save(updatedVoiture);
            return Response.ok("Voiture modifiée avec succès")
                    .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                    .build();
        } else {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Voiture non trouvée")
                    .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:8080")
                    .build();
        }
    }
}
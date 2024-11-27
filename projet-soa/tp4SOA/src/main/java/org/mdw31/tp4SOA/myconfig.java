package org.mdw31.tp4SOA;

import org.glassfish.jersey.server.ResourceConfig;
import org.mdw31.tp4SOA.services.AgenceRS;
import org.mdw31.tp4SOA.services.ClientRS;
import org.mdw31.tp4SOA.services.LocationRS;
import org.mdw31.tp4SOA.services.VoitureRS;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class myconfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Applique CORS à tous les endpoints
                .allowedOrigins("http://localhost:8080") // Permet l'accès depuis le frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Méthodes HTTP autorisées
                .allowedHeaders("*") // Autorise tous les headers
                .allowCredentials(true); // Autorise les cookies et informations d'authentification
    }
    @Bean
    public ResourceConfig resourceConfig() {
        ResourceConfig resourceConfig = new ResourceConfig();
        // Enregistrer plusieurs services
        resourceConfig.register(ClientRS.class);
        resourceConfig.register(VoitureRS.class);
        resourceConfig.register(LocationRS.class);
        resourceConfig.register(AgenceRS.class);
        return resourceConfig;
    }


}

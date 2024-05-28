package com.example.proyectoii_programacioniv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

import java.sql.SQLOutput;

@SpringBootApplication
public class ProyectoIiProgramacionIvApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProyectoIiProgramacionIvApplication.class, args);
    }

    @Bean("securityFilterChain")
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        var chain = http
                .authorizeHttpRequests(customizer -> customizer
                        .requestMatchers("/api/v1/login").permitAll()
                        .requestMatchers("/api/v1/registro").permitAll()
                        .requestMatchers("/api/v1/hacienda/**").permitAll()
                        .requestMatchers("/api/v1/logout").authenticated()
                        .requestMatchers(HttpMethod.POST,"/api/**").hasAnyAuthority("ADM","PRO")
                        .requestMatchers("/api/**").hasAnyAuthority("ADM","PRO")
                        .requestMatchers("/**").permitAll()
                )
                .exceptionHandling(customizer -> customizer
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .csrf().disable()
                .build();
        return chain;
    }
}

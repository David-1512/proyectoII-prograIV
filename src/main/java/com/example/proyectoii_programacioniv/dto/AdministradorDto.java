package com.example.proyectoii_programacioniv.dto;

import lombok.*;

import java.io.Serializable;


@NoArgsConstructor
@Data
@ToString

public class AdministradorDto extends User implements Serializable {

    public AdministradorDto(String id, String nombre, String contrasena) {
        super(id, nombre, contrasena, "ADM", 'A');
    }

    public User cloneSinContrasenia(AdministradorDto administradorDto) {
        this.id = administradorDto.getId();
        this.nombre = administradorDto.getNombre();
        this.password = null;
        this.rol = "ADM";
        this.estado = 'A';

        return this;
    }
}

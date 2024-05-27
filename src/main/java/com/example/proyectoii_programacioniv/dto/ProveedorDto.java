package com.example.proyectoii_programacioniv.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
@Builder
public class ProveedorDto implements Serializable {
    private String id;
    private String nombre;
    private String correo;
    private String telefono;
    private String contrasena;
    private String estado;
    private String ubicacion;
    private String nomComercial;
    private String tipoId;
    private int idActComercial;
}

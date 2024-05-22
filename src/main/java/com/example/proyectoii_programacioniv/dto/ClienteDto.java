package com.example.proyectoii_programacioniv.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
@Builder
public class ClienteDto implements Serializable {
    private String id;
    private String nombre;
    private String correo;
    private String telefono;
    private String tipoId;


}

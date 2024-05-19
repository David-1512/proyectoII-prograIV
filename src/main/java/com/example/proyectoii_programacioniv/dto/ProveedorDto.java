package com.example.proyectoii_programacioniv.dto;

import com.example.proyectoii_programacioniv.entity.ClienteEntity;
import com.example.proyectoii_programacioniv.entity.FacturasEntity;
import com.example.proyectoii_programacioniv.entity.HaciendaEntity;
import com.example.proyectoii_programacioniv.entity.ProductoEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Collection;

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
    private String haciendaNif;
}

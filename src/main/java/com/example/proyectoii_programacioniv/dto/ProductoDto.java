package com.example.proyectoii_programacioniv.dto;

import com.example.proyectoii_programacioniv.entity.LineaServicioEntity;
import com.example.proyectoii_programacioniv.entity.ProveedorEntity;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Collection;


@Data
@ToString
@Builder
public class ProductoDto implements Serializable {
    private String cod;
    private String nombre;
    private Double precio;
    private String idProveedor;
   // private Collection<LineaServicioEntity> lineaServiciosByCod;
   // private ProveedorEntity proveedorByIdProveedor;
}

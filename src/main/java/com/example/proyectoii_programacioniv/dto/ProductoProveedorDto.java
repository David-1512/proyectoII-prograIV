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
public class ProductoProveedorDto implements Serializable {
    private String cod;
    private String descripcion;
    private Double precio;
    private String idProveedor;
    private String idUnidadMedida;
    private String idProducto;



}

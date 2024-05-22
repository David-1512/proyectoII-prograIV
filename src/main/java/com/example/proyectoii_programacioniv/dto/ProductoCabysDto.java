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
public class ProductoCabysDto implements Serializable {
    private String idProducto;
    private String nombreProducto;
    private String impuestoProducto;
}

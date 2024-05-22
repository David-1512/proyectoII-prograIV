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
public class LineaServicioDto implements Serializable {
    private int id;
    private String idLinea;
    private int cantidad;
    private double impuesto;
    private Double subtotal;
    private String codProducto;
    private String numFactura;
}

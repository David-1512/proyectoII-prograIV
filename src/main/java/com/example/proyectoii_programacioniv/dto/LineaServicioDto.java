package com.example.proyectoii_programacioniv.dto;

import com.example.proyectoii_programacioniv.entity.FacturasEntity;
import com.example.proyectoii_programacioniv.entity.ProductoEntity;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
@Builder
public class LineaServicioDto implements Serializable {

    private int cod;
    private int cantidad;
    private Double subtotal;
    private String idLinea;
    private ProductoEntity productoByCodProducto;
    private FacturasEntity facturasByNumFactura;
}

package com.example.proyectoii_programacioniv.dto;

import com.example.proyectoii_programacioniv.entity.ClienteEntity;
import com.example.proyectoii_programacioniv.entity.LineaServicioEntity;
import com.example.proyectoii_programacioniv.entity.ProveedorEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.sql.Date;
import java.util.Collection;

@Data
@ToString
@Builder
public class FacturasDto implements Serializable {
    private String numFactura;
    private int consecutivo;
    private Date fechEmision;
    private Double total;
    private String idCliente;
    private String idProveedor;
    private String medioPago;
}

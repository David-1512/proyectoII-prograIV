package com.example.proyectoii_programacioniv.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
@Builder
public class ClienteProveedorDto implements Serializable {
    private String id;
    private String idProveedor;
    private String idCliente;
}

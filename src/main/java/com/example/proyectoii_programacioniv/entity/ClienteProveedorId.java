package com.example.proyectoii_programacioniv.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClienteProveedorId implements Serializable {
    private String idProveedor;
    private String idCliente;
}
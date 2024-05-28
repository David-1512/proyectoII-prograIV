package com.example.proyectoii_programacioniv.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
@Builder
public class ClienteStubDto implements Serializable {
    private String idCliente;
    private String nombreCliente;
}

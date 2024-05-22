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
public class ProveedorStubDto implements Serializable {
    private String idProveedor;
    private String nombreProveedor;
}

package com.example.proyectoii_programacioniv.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.io.Serializable;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "cliente_stub", schema = "proyecto2_progra4", catalog = "")
public class ClienteStubEntity implements Serializable {
    @Id
    @Column(name = "id_cliente_stub")
    private String idCliente;

    @Column(name = "nombre")
    private String nombreProveedor;
}

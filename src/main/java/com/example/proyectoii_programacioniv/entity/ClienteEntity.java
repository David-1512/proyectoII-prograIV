package com.example.proyectoii_programacioniv.entity;

import com.example.proyectoii_programacioniv.dto.ClienteDto;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Collection;
import java.util.Objects;


@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "cliente", schema = "proyecto2_progra4", catalog = "")
public class ClienteEntity implements Serializable {
    @Id
    @Column(name = "id_cliente")
    private String id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "correo_electronico")
    private String correo;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "tipo_identificacion")
    private String tipoId;

    public ClienteEntity(ClienteEntity clienteEntity) {
        this.id = clienteEntity.getId();
        this.nombre = clienteEntity.getNombre();
        this.correo = clienteEntity.getCorreo();
        this.telefono = clienteEntity.getTelefono();
        this.tipoId = clienteEntity.getTipoId();
    }

    public ClienteEntity(ClienteDto clienteDto) {
        this.id = clienteDto.getId();
        this.nombre = clienteDto.getNombre();
        this.correo = clienteDto.getCorreo();
        this.telefono = clienteDto.getTelefono();
        this.tipoId = clienteDto.getTipoId();
    }

}

package com.example.proyectoii_programacioniv.dto;

import com.example.proyectoii_programacioniv.entity.ClienteEntity;
import lombok.*;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ClienteDto implements Serializable {
    private String id;
    private String nombre;
    private String correo;
    private String telefono;
    private String tipoId;


    public ClienteDto(ClienteEntity clienteEntity) {
        this.id = clienteEntity.getId();
        this.nombre = clienteEntity.getNombre();
        this.correo = clienteEntity.getCorreo();
        this.telefono = clienteEntity.getTelefono();
        this.tipoId = clienteEntity.getTipoId();
    }

    public ClienteDto(ClienteDto clienteDto) {
        this.id = clienteDto.getId();
        this.nombre = clienteDto.getNombre();
        this.correo = clienteDto.getCorreo();
        this.telefono = clienteDto.getTelefono();
        this.tipoId = clienteDto.getTipoId();
    }

}

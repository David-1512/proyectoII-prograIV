package com.example.proyectoii_programacioniv.dto;

import com.example.proyectoii_programacioniv.entity.ProveedorEntity;

import lombok.*;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.io.Serializable;

@Data
@ToString
@NoArgsConstructor
public class ProveedorDto extends User implements Serializable{
    private String correo;
    private String telefono;
    private char estado;
    private String ubicacion;
    private String nomComercial;
    private String tipoId;
    private int idActComercial;

    public ProveedorDto(String id, String nombre, String correo, String telefono, String contrasena, char estado, String ubicacion, String nomComercial, String tipoId) {
        super(id, nombre, contrasena, "PRO", estado);
        this.correo = correo;
        this.telefono = telefono;
        this.ubicacion = ubicacion;
        this.nomComercial = nomComercial;
        this.tipoId = tipoId;
    }

    public ProveedorDto(ProveedorEntity proveedorEntity) {
        this.id = proveedorEntity.getId();
        this.nombre = proveedorEntity.getNombre();
        this.correo = proveedorEntity.getCorreo();
        this.telefono = proveedorEntity.getTelefono();
        this.password = proveedorEntity.getContrasena();
        this.estado = proveedorEntity.getEstado();
        this.ubicacion = proveedorEntity.getUbicacion();
        this.nomComercial = proveedorEntity.getNomComercial();
        this.tipoId = proveedorEntity.getTipoId();
        this.idActComercial = proveedorEntity.getIdActComercial();
        this.rol = "PRO";
    }

    public ProveedorDto cloneSinContrasenia(ProveedorEntity proveedorEntity) {
        this.id = proveedorEntity.getId();
        this.nombre = proveedorEntity.getNombre();
        this.correo = proveedorEntity.getCorreo();
        this.telefono = proveedorEntity.getTelefono();
        this.password = null;
        this.estado = proveedorEntity.getEstado();
        this.ubicacion = proveedorEntity.getUbicacion();
        this.nomComercial = proveedorEntity.getNomComercial();
        this.tipoId = proveedorEntity.getTipoId();
        this.idActComercial = proveedorEntity.getIdActComercial();
        this.rol = "PRO";

        return this;
    }

    public ProveedorDto cloneSinContrasenia(ProveedorDto proveedorDto) {
        this.id = proveedorDto.getId();
        this.nombre = proveedorDto.getNombre();
        this.correo = proveedorDto.getCorreo();
        this.telefono = proveedorDto.getTelefono();
        this.password = null;
        this.estado = proveedorDto.getEstado();
        this.ubicacion = proveedorDto.getUbicacion();
        this.nomComercial = proveedorDto.getNomComercial();
        this.tipoId = proveedorDto.getTipoId();
        this.idActComercial = proveedorDto.getIdActComercial();
        this.rol = "PRO";

        return this;
    }
}

package com.example.proyectoii_programacioniv.entity;

import com.example.proyectoii_programacioniv.dto.ProveedorDto;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.Serializable;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "proveedor", schema = "proyecto2_progra4", catalog = "")
public class ProveedorEntity implements Serializable {
    @Id
    @Column(name = "id_proveedor")
    private String id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "correo_electronico")
    private String correo;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "clave")
    private String contrasena;

    @Column(name = "estado")
    private char estado;

    @Column(name = "ubicacion")
    private String ubicacion;

    @Column(name = "nombre_comercial")
    private String nomComercial;

    @Column(name = "tipo_identificacion")
    private String tipoId;



    public ProveedorEntity(ProveedorDto proveedorDto) {
        this.id = proveedorDto.getId();
        this.nombre = proveedorDto.getNombre();
        this.correo = proveedorDto.getCorreo();
        this.telefono = proveedorDto.getTelefono();
        this.contrasena = proveedorDto.getPassword();
        this.estado = proveedorDto.getEstado();
        this.ubicacion = proveedorDto.getUbicacion();
        this.nomComercial = proveedorDto.getNomComercial();
        this.tipoId = proveedorDto.getTipoId();
    }

    public ProveedorEntity clonePassCifrada(ProveedorDto proveedorDto) {
        var encoder = new BCryptPasswordEncoder();
        this.id = proveedorDto.getId();
        this.nombre = proveedorDto.getNombre();
        this.correo = proveedorDto.getCorreo();
        this.telefono = proveedorDto.getTelefono();
        this.contrasena = "{bcrypt}"+encoder.encode(proveedorDto.getPassword());
        this.estado = proveedorDto.getEstado();
        this.ubicacion = proveedorDto.getUbicacion();
        this.nomComercial = proveedorDto.getNomComercial();
        this.tipoId = proveedorDto.getTipoId();
        return this;
    }
}

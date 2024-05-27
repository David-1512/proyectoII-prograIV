package com.example.proyectoii_programacioniv.entity;

import com.example.proyectoii_programacioniv.dto.UnidadMedidaDto;
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
@Table(name = "unidad_medida", schema = "proyecto2_progra4", catalog = "")
public class UnidadMedidaEntity implements Serializable {
    @Id
    @Column(name = "id_unidad_medida")
    private String id;

    @Column(name = "descripcion")
    private String descripcion;

    public UnidadMedidaEntity(UnidadMedidaEntity unidadMedidaEntity) {
        this.id = unidadMedidaEntity.getId();
        this.descripcion = unidadMedidaEntity.getDescripcion();
    }

    public UnidadMedidaEntity(UnidadMedidaDto unidadMedidaDto) {
        this.id = unidadMedidaDto.getId();
        this.descripcion = unidadMedidaDto.getDescripcion();
    }
}

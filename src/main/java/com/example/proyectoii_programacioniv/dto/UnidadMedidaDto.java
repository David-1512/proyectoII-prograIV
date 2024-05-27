package com.example.proyectoii_programacioniv.dto;

import com.example.proyectoii_programacioniv.entity.UnidadMedidaEntity;
import lombok.*;

import java.io.Serializable;

@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UnidadMedidaDto  implements Serializable {
    private String id;
    private String descripcion;

    public UnidadMedidaDto(UnidadMedidaEntity unidadMedidaEntity){
        this.id = unidadMedidaEntity.getId();
        this.descripcion = unidadMedidaEntity.getDescripcion();
    }

    public UnidadMedidaDto(UnidadMedidaDto unidadMedidaDto){
        this.id = unidadMedidaDto.getId();
        this.descripcion = unidadMedidaDto.getDescripcion();
    }
}

package com.example.proyectoii_programacioniv.dto;

import com.example.proyectoii_programacioniv.entity.ActividadComercialEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
@NoArgsConstructor
public class ActividadComercialDto implements Serializable {
    private String idActComercial;
    private String nombre;

    public ActividadComercialDto(ActividadComercialEntity act) {
        this.idActComercial = act.getIdActComercial();
        this.nombre = act.getNombre();
    }
}

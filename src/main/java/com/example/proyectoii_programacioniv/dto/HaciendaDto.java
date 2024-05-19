package com.example.proyectoii_programacioniv.dto;

import com.example.proyectoii_programacioniv.entity.ProveedorEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.util.Collection;

@Data
@ToString
@Builder
public class HaciendaDto implements Serializable {

    private String nif;
    private String actEconomica;
    //private Collection<ProveedorEntity> proveedorsByNif;
}

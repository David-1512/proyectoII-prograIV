package com.example.proyectoii_programacioniv.dto;

import com.example.proyectoii_programacioniv.entity.ProductoCabysEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.*;

import java.io.Serializable;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductoCabysDto implements Serializable {
    private String idProducto;
    private String nombreProducto;
    private String impuestoProducto;

    public ProductoCabysDto(ProductoCabysDto productoCabysDto){
        this.idProducto = productoCabysDto.getIdProducto();
        this.nombreProducto = productoCabysDto.getNombreProducto();
        this.impuestoProducto = productoCabysDto.getImpuestoProducto();
    }

    public ProductoCabysDto(ProductoCabysEntity productoCabysEntity){
        this.idProducto = productoCabysEntity.getIdProducto();
        this.nombreProducto = productoCabysEntity.getNombreProducto();
        this.impuestoProducto = productoCabysEntity.getImpuestoProducto();
    }
}

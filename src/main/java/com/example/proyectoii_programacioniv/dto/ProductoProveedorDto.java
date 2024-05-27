package com.example.proyectoii_programacioniv.dto;

import com.example.proyectoii_programacioniv.entity.ProductoCabysEntity;
import com.example.proyectoii_programacioniv.entity.ProductoProveedorEntity;
import com.example.proyectoii_programacioniv.entity.UnidadMedidaEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.io.Serializable;


@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductoProveedorDto implements Serializable {
    private Integer cod;
    private String descripcion;
    private Double precio;
    private String idProveedor;
    private ProductoCabysDto productoCabys;
    private UnidadMedidaDto unidadMedida;

    public ProductoProveedorDto(ProductoProveedorEntity productoProveedorEntity){
        this.cod = productoProveedorEntity.getCod();
        this.descripcion = productoProveedorEntity.getDescripcion();
        this.precio = productoProveedorEntity.getPrecio();
        this.idProveedor = productoProveedorEntity.getIdProveedor();
        this.productoCabys = new ProductoCabysDto(productoProveedorEntity.getProductoCabys());
        this.unidadMedida = new UnidadMedidaDto(productoProveedorEntity.getUnidadMedida());
    }

    public ProductoProveedorDto(ProductoProveedorDto productoProveedorDto){
        this.cod = productoProveedorDto.getCod();
        this.descripcion = productoProveedorDto.getDescripcion();
        this.precio = productoProveedorDto.getPrecio();
        this.idProveedor = productoProveedorDto.getIdProveedor();
        this.productoCabys = productoProveedorDto.getProductoCabys();
        this.unidadMedida = productoProveedorDto.getUnidadMedida();
    }


}


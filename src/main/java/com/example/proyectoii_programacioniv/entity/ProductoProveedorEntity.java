package com.example.proyectoii_programacioniv.entity;

import com.example.proyectoii_programacioniv.dto.ProductoCabysDto;
import com.example.proyectoii_programacioniv.dto.ProductoProveedorDto;
import com.example.proyectoii_programacioniv.dto.UnidadMedidaDto;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "producto_proveedor", schema = "proyecto2_progra4", catalog = "")
public class ProductoProveedorEntity implements Serializable {
    @Id
    @Column(name = "id_producto_proveedor")
    private Integer cod;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "precio_unitario")
    private Double precio;

    @Column(name = "id_proveedor")
    private String idProveedor;


    @ManyToOne
    @JoinColumn(name = "id_producto_cabys", referencedColumnName = "id_producto_cabys")
    private ProductoCabysEntity productoCabys;

    @ManyToOne
    @JoinColumn(name = "id_unidad_medida", referencedColumnName = "id_unidad_medida")
    private UnidadMedidaEntity unidadMedida;


    public ProductoProveedorEntity(ProductoProveedorEntity productoProveedorEntity){
        this.cod = productoProveedorEntity.getCod();
        this.descripcion = productoProveedorEntity.getDescripcion();
        this.precio = productoProveedorEntity.getPrecio();
        this.idProveedor = productoProveedorEntity.getIdProveedor();
        this.productoCabys = productoProveedorEntity.getProductoCabys();
        this.unidadMedida = productoProveedorEntity.getUnidadMedida();
    }

    public ProductoProveedorEntity(ProductoProveedorDto productoProveedorDto){
        this.cod = productoProveedorDto.getCod();
        this.descripcion = productoProveedorDto.getDescripcion();
        this.precio = productoProveedorDto.getPrecio();
        this.idProveedor = productoProveedorDto.getIdProveedor();
        this.productoCabys = new ProductoCabysEntity(productoProveedorDto.getProductoCabys());
        this.unidadMedida = new UnidadMedidaEntity(productoProveedorDto.getUnidadMedida());
    }
}

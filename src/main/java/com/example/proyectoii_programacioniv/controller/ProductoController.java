package com.example.proyectoii_programacioniv.controller;

import com.example.proyectoii_programacioniv.dto.ProductoProveedorDto;
import com.example.proyectoii_programacioniv.dto.ProveedorDto;
import com.example.proyectoii_programacioniv.entity.ProductoProveedorEntity;
import com.example.proyectoii_programacioniv.payload.MensajeResponse;
import com.example.proyectoii_programacioniv.service.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ProductoController {
    @Autowired
    private IProductoService productoService;
    @GetMapping("producto/{id}")
    public ResponseEntity<?> showById(@PathVariable String id){
        ProductoProveedorEntity producto =  productoService.findById(id);
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Consulta de producto exitosa")
                .object(ProductoProveedorDto.builder()
                        .cod(producto.getCod())
                        .descripcion(producto.getDescripcion())
                        .precio(producto.getPrecio())
                        .idProveedor(producto.getIdProveedor())
                        .idProducto(producto.getIdProducto())
                        .idUnidadMedida(producto.getIdUnidadMedida())
                        .build())
                .build(), HttpStatus.OK);
    }

    @GetMapping("/productos/{id}")
    public ResponseEntity<?> showAllByIdProveedor(@PathVariable String id){
        List<ProductoProveedorEntity> productosPorProveedor = productoService.findAllByIdProveedor(id);
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Consulta de clientes exitosa")
                .object(productosPorProveedor)
                .build(),HttpStatus.OK);
    }

    @GetMapping("/productos/allProducts/{id}")
    public List<ProductoProveedorDto> allProducts(@PathVariable String id) {
        try{
            return productoService.productosProveedor(id);
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}

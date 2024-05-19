package com.example.proyectoii_programacioniv.controller;

import com.example.proyectoii_programacioniv.dto.ClienteDto;
import com.example.proyectoii_programacioniv.dto.ProductoDto;
import com.example.proyectoii_programacioniv.entity.ClienteEntity;
import com.example.proyectoii_programacioniv.entity.ProductoEntity;
import com.example.proyectoii_programacioniv.payload.MensajeResponse;
import com.example.proyectoii_programacioniv.service.IClienteService;
import com.example.proyectoii_programacioniv.service.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class ProductoController {
    @Autowired
    private IProductoService productoService;
    @GetMapping("producto/{id}")
    public ResponseEntity<?> showById(@PathVariable String id){
        ProductoEntity producto =  productoService.findById(id);
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Consulta de producto exitosa")
                .object(ProductoDto.builder()
                        .cod(producto.getCod())
                        .nombre(producto.getNombre())
                        .precio(producto.getPrecio())
                        .idProveedor(producto.getIdProveedor())
                       // .lineaServiciosByCod(producto.getLineaServiciosByCod())
                        //.proveedorByIdProveedor(producto.getProveedorByIdProveedor())
                        .build())
                .build(), HttpStatus.OK);
    }
}

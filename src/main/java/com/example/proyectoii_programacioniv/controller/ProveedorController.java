package com.example.proyectoii_programacioniv.controller;

import com.example.proyectoii_programacioniv.dto.ProveedorDto;
import com.example.proyectoii_programacioniv.entity.ProveedorEntity;
import com.example.proyectoii_programacioniv.payload.MensajeResponse;
import com.example.proyectoii_programacioniv.service.IProveedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class ProveedorController {

    @Autowired
    private IProveedorService proveedorService;
    @GetMapping("proveedor/{id}")
    public ResponseEntity<?> showById(@PathVariable String id){
       ProveedorEntity proveedor =  proveedorService.findById(id);
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Consulta de proveedor exitosa")
                .object(ProveedorDto.builder()
                        .id(proveedor.getId())
                        .nombre(proveedor.getNombre())
                        .correo(proveedor.getCorreo())
                        .telefono(proveedor.getTelefono())
                        .contrasena(proveedor.getContrasena())
                        .estado(proveedor.getEstado())
                                .haciendaNif(proveedor.getHaciendaNif())
                        //.haciendaByNif(proveedor.getHaciendaByNif())
                        .build())
                .build(), HttpStatus.OK);
    }
}

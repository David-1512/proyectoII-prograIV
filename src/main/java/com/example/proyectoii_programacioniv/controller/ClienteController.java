package com.example.proyectoii_programacioniv.controller;

import com.example.proyectoii_programacioniv.dto.ClienteDto;
import com.example.proyectoii_programacioniv.entity.ClienteEntity;
import com.example.proyectoii_programacioniv.entity.FacturasEntity;
import com.example.proyectoii_programacioniv.payload.MensajeResponse;
import com.example.proyectoii_programacioniv.service.IClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/v1")
public class ClienteController {

    @Autowired
    private IClienteService clienteService;
    @GetMapping("/cliente/{id}")
    public ResponseEntity<?> showById(@PathVariable String id){
        ClienteEntity cliente =  clienteService.findById(id);
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Consulta de cliente exitosa")
                .object( ClienteDto.builder()
                        .id(cliente.getId())
                        .nombre(cliente.getNombre())
                        .correo(cliente.getCorreo())
                        .telefono(cliente.getTelefono())
                        .tipoId(cliente.getTipoId())
                        .build())
                .build(),HttpStatus.OK);
    }
    @GetMapping("/clientes/{id}")
    public ResponseEntity<?> showAllByIdProveedor(@PathVariable String id){
        List<ClienteEntity> clientesPorProveedor = clienteService.findAllByIdProveedor(id);
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Consulta de clientes exitosa")
                .object(clientesPorProveedor)
                .build(),HttpStatus.OK);
    }
}

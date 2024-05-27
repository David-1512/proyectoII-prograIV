package com.example.proyectoii_programacioniv.controller;

import com.example.proyectoii_programacioniv.dto.ClienteDto;
import com.example.proyectoii_programacioniv.dto.ClienteStubDto;
import com.example.proyectoii_programacioniv.dto.ProveedorStubDto;
import com.example.proyectoii_programacioniv.entity.ClienteEntity;
import com.example.proyectoii_programacioniv.entity.ClienteStubEntity;
import com.example.proyectoii_programacioniv.entity.ProveedorStubEntity;
import com.example.proyectoii_programacioniv.payload.MensajeResponse;
import com.example.proyectoii_programacioniv.service.IHaciendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class HaciendaController {
    @Autowired
    private IHaciendaService haciendaService;

    @PostMapping("hacienda/cliente")
    public ResponseEntity<?> createClient(@RequestBody ClienteStubDto clienteStubDto){
        ClienteStubEntity clienteStubSave = null;
        try {
            clienteStubSave = haciendaService.saveClient(clienteStubDto);
            clienteStubDto = ClienteStubDto.builder()
                    .idCliente(clienteStubSave.getIdCliente())
                    .nombreCliente(clienteStubSave.getNombreCliente())
                    .build();
            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje("Factura Guardada correctamente")
                    .object(clienteStubDto)
                    .build(), HttpStatus.CREATED);
        }
        catch(DataAccessException exDT){
            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje(exDT.getMessage())
                    .object(null)
                    .build(), HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @PostMapping("hacienda/proveedor")
    public ResponseEntity<?> createProveedor(@RequestBody ProveedorStubDto proveedorStubDto){
        ProveedorStubEntity proveedorStubSave = null;
        try {
              proveedorStubSave = haciendaService.saveSupplier(proveedorStubDto);
              proveedorStubDto = ProveedorStubDto.builder()
                      .idProveedor(proveedorStubSave.getIdProveedor())
                      .nombreProveedor(proveedorStubSave.getNombreProveedor())
                    .build();
            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje("Factura Guardada correctamente")
                    .object(proveedorStubDto)
                    .build(), HttpStatus.CREATED);
        }
        catch(DataAccessException exDT){
            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje(exDT.getMessage())
                    .object(null)
                    .build(), HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @GetMapping("hacienda/proveedor/{id}")
    public ResponseEntity<?> showexistIdProveedor(@PathVariable String id){
        if(haciendaService.existsProveedorById(id)){
            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje("Consulta de proveedor exitosa")
                    .object(true)
                    .build(),HttpStatus.OK);
        }
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Consulta de proveedor exitosa")
                .object(false)
                .build(),HttpStatus.OK);
    }

    @GetMapping("hacienda/cliente/{id}")
    public ResponseEntity<?> showexistIdCliente(@PathVariable String id){
        if(haciendaService.existsClientById(id)){
            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje("Consulta de cliente exitosa")
                    .object(true)
                    .build(),HttpStatus.OK);
        }
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Consulta de cliente exitosa")
                .object(false)
                .build(),HttpStatus.OK);
    }
}

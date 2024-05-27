package com.example.proyectoii_programacioniv.controller;

import com.example.proyectoii_programacioniv.dto.ProveedorDto;
import com.example.proyectoii_programacioniv.entity.ProveedorEntity;
import com.example.proyectoii_programacioniv.payload.MensajeResponse;
import com.example.proyectoii_programacioniv.service.IProveedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
                .object(new ProveedorDto().cloneSinContrasenia(proveedor))
                        , HttpStatus.OK);
    }

    @PutMapping("/updateProveedor/{id}")
    public ProveedorDto updateProveedor(@PathVariable String id, @RequestBody ProveedorDto proveedorDto){
        try{
            ProveedorEntity proveedor = proveedorService.findById(id);
            proveedor.setCorreo(proveedorDto.getCorreo());
            proveedor.setTelefono(proveedorDto.getTelefono());
            proveedor.setEstado('A');
            proveedor.setUbicacion(proveedorDto.getUbicacion());
            proveedor.setNomComercial(proveedorDto.getNomComercial());
            proveedor.setTipoId(proveedorDto.getTipoId());
            proveedor.setIdActComercial(proveedorDto.getIdActComercial());
            proveedorService.save(proveedor);
            return new ProveedorDto().cloneSinContrasenia(proveedor);
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Solicitudes no encontradas", e);
        }

    }
}

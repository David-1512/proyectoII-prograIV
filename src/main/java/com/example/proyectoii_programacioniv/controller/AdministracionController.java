package com.example.proyectoii_programacioniv.controller;

import com.example.proyectoii_programacioniv.dto.ProveedorDto;
import com.example.proyectoii_programacioniv.entity.ProveedorEntity;
import com.example.proyectoii_programacioniv.payload.MensajeResponse;
import com.example.proyectoii_programacioniv.service.IClienteService;
import com.example.proyectoii_programacioniv.service.IProveedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static java.util.Arrays.*;

@RestController
@RequestMapping("/api/v1")
public class AdministracionController {

    @Autowired
    private IProveedorService proveedorService;
    @GetMapping("/proveedores")
    public List<ProveedorDto> read() {
        try {
            List<ProveedorEntity> proveedores = proveedorService.findByEstadoIn(new ArrayList<Character>(asList('A', 'I', 'D')));
            List<ProveedorDto> proveedoresDto = new ArrayList<>();

            for(ProveedorEntity proveedor : (List<ProveedorEntity>) proveedores){
                proveedoresDto.add(new ProveedorDto().cloneSinContrasenia(proveedor));
            }
            return proveedoresDto;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Solicitudes no encontradas", e);
        }
    }
    @GetMapping("/solicitudes")
    public List<ProveedorDto> readSolicitudes() {
        try {
            List<ProveedorEntity> proveedores = proveedorService.findByEstado('E');
            List<ProveedorDto> proveedoresDto = new ArrayList<>();

            for (ProveedorEntity proveedor : proveedores) {
                proveedoresDto.add(new ProveedorDto().cloneSinContrasenia(proveedor));
            }
            return proveedoresDto;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Solicitudes no encontradas", e);
        }
    }


    @GetMapping("/{id}")
    public ProveedorDto read(@PathVariable String id) {
        try{
            return new ProveedorDto().cloneSinContrasenia(proveedorService.findById(id));
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/estado/{id}")
    public ProveedorDto invertirEstado(@PathVariable String id) {
        try{
            ProveedorEntity proveedor = proveedorService.findById(id);
            return proveedorService.invertirEstado(proveedor);
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/search/{nombre}")
    public List<ProveedorDto> search(@PathVariable String nombre) {
        System.out.println(nombre);
        try{
            return proveedorService.buscar(nombre);
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/searchSolicitudes/{nombre}")
    public List<ProveedorDto> searchSolicitudes(@PathVariable String nombre) {
        System.out.println(nombre);
        try{
            return proveedorService.buscarSolicitudes(nombre);
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/aceptarSolicitud/{id}")
    public void aceptarSolicitud(@PathVariable String id) {
        try{
            proveedorService.actualizarActivo(id);
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/rechazarSolicitud/{id}")
    public void rechazarSolicitud(@PathVariable String id) {
        try{
            ProveedorEntity proveedor = proveedorService.findById(id);
            proveedorService.delete(proveedor);
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

}

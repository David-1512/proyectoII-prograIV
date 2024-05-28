package com.example.proyectoii_programacioniv.controller;

import com.example.proyectoii_programacioniv.dto.ActividadComercialDto;
import com.example.proyectoii_programacioniv.dto.ProveedorDto;
import com.example.proyectoii_programacioniv.service.IActividadService;
import com.example.proyectoii_programacioniv.service.IProveedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ActividadesController {

    @Autowired
    private IActividadService actividadService;


    @GetMapping("/actividades/{nombre}")
    public List<ActividadComercialDto> searchActividades(@PathVariable String nombre) {

        try{
            System.out.println(actividadService.buscar(nombre));
            return actividadService.buscar(nombre);
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/actividad/{id}")
    public ActividadComercialDto searchActividad(@PathVariable String id) {

        try{
            return actividadService.buscarPorId(id);
        }
        catch (Exception e){
            e.getStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }




}
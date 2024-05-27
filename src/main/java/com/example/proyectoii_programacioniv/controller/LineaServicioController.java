package com.example.proyectoii_programacioniv.controller;

import com.example.proyectoii_programacioniv.dto.LineaServicioDto;
import com.example.proyectoii_programacioniv.entity.FacturasEntity;
import com.example.proyectoii_programacioniv.entity.LineaServicioEntity;
import com.example.proyectoii_programacioniv.payload.MensajeResponse;
import com.example.proyectoii_programacioniv.service.ILineaServicioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class LineaServicioController {

    @Autowired
    private ILineaServicioService lineaServicioService;

    @PostMapping("/lineasServicio")
    public ResponseEntity<?> create(@RequestBody List<LineaServicioDto> lineasServicioDto) {
        try {
            lineaServicioService.saveAll(lineasServicioDto);
            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje("Lineas de Servicio Gurdadas Exitosamente")
                    .object(null)
                    .build(), HttpStatus.CREATED);
        } catch (DataAccessException exDT) {
            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje(exDT.getMessage())
                    .object(null)
                    .build(), HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @GetMapping("/lineasServicio/{id}")
    public ResponseEntity<?> showAllByIdFactura(@PathVariable String id) {
        List<LineaServicioEntity> lineasServicioPorFactura = lineaServicioService.findAllByIdFactura(id);
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Consulta de Facturas exitosa")
                .object(lineasServicioPorFactura)
                .build(), HttpStatus.OK);
    }

    @DeleteMapping("/lineasServicio/{id}")
    public ResponseEntity<?> deleteAllByIdFactura(@PathVariable String id) {
        try {
            List<LineaServicioEntity> lineasServicioDelete = lineaServicioService.findAllByIdFactura(id);
            lineaServicioService.deleteById(id);
            return new ResponseEntity<>(lineasServicioDelete, HttpStatus.NO_CONTENT);
        }catch(DataAccessException exDT){
                return new ResponseEntity<>(MensajeResponse.builder()
                        .mensaje(exDT.getMessage())
                        .object(null)
                        .build(), HttpStatus.METHOD_NOT_ALLOWED);
        }
    }
}
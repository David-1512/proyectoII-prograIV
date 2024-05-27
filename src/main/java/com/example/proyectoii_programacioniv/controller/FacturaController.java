package com.example.proyectoii_programacioniv.controller;

import com.example.proyectoii_programacioniv.dto.FacturasDto;
import com.example.proyectoii_programacioniv.entity.FacturasEntity;
import com.example.proyectoii_programacioniv.payload.MensajeResponse;
import com.example.proyectoii_programacioniv.service.IFacturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class FacturaController {
    @Autowired
    private IFacturaService facturaService;

    @PostMapping("factura")
    public ResponseEntity<?> create(@RequestBody FacturasDto facturaDto){
        FacturasEntity facturaSave = null;
        try {
            facturaSave = facturaService.save(facturaDto);
            facturaDto = FacturasDto.builder()
                    .numFactura(facturaSave.getNumFactura())
                    .consecutivo(facturaSave.getConsecutivo())
                    .fechEmision(facturaSave.getFechEmision())
                    .total(facturaSave.getTotal())
                    .idProveedor(facturaSave.getIdProveedor())
                    .idCliente(facturaSave.getIdCliente())
                    .medioPago(facturaSave.getMedioPago())
                    .build();
            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje("Factura Guardada correctamente")
                    .object(facturaDto)
                    .build(), HttpStatus.CREATED);
        }
        catch(DataAccessException exDT){
            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje(exDT.getMessage())
                    .object(null)
                    .build(), HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @DeleteMapping("/factura/{id}")
    public ResponseEntity<?> delete(@PathVariable String id){
        try{
            FacturasEntity facturaDelete = facturaService.findById(id);
            facturaService.deleteById(id);
            return new ResponseEntity<>(facturaDelete,HttpStatus.NO_CONTENT);
        }
        catch(DataAccessException exDT){
            return new ResponseEntity<>(MensajeResponse.builder()
                    .mensaje(exDT.getMessage())
                    .object(null)
                    .build(),HttpStatus.METHOD_NOT_ALLOWED);
        }
    }


    @GetMapping("/facturas/{id}")
    public ResponseEntity<?> showAllByIdProveedor(@PathVariable String id){
        List<FacturasEntity> facturasPorProveedor = facturaService.findAllByIdProveedor(id);
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Consulta de Facturas exitosa")
                .object(facturasPorProveedor)
                .build(),HttpStatus.OK);
    }



}

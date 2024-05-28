package com.example.proyectoii_programacioniv.controller;

import com.example.proyectoii_programacioniv.dto.ClienteDto;
import com.example.proyectoii_programacioniv.entity.ClienteEntity;
import com.example.proyectoii_programacioniv.entity.FacturasEntity;
import com.example.proyectoii_programacioniv.entity.ProveedorEntity;
import com.example.proyectoii_programacioniv.payload.MensajeResponse;
import com.example.proyectoii_programacioniv.service.IClienteService;
import com.example.proyectoii_programacioniv.service.IProveedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@RequestMapping("/api/v1")
public class ClienteController {

    @Autowired
    private IClienteService clienteService;

    @Autowired
    private IProveedorService proveedorService;

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


    @GetMapping ("clientesProveedor/{id}")
    public List<ClienteDto> clientesDeProveedor(@PathVariable String id){
        try{
            return clienteService.clientesDeProveedor(id);
        } catch (Exception e) {
            System.out.println(e.getStackTrace());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/clientesSearch/{id}/{nombreBusqueda}")
    public List<ClienteDto> clientesDeProveedor(@PathVariable String id, @PathVariable String nombreBusqueda){
        try{
            System.out.println("Buscando clientes con nombre que contenga: "+nombreBusqueda);
            List<ClienteDto> clientesProv = clienteService.clientesDeProveedor(id);
            List<ClienteDto> clientesBusqueda = new java.util.ArrayList<>();
            for (ClienteDto cliente : clientesProv) {
                if (cliente.getNombre().contains(nombreBusqueda)||cliente.getId().contains(nombreBusqueda)){
                    clientesBusqueda.add(cliente);
                }
            }
            return clientesBusqueda;
        } catch (Exception e) {
            System.out.println(e.getStackTrace());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/registrarClienteProv/{id}")
    public ResponseEntity<?> registrarClienteProveedor(@PathVariable String id, @RequestBody ClienteDto clienteDto){
        try{
            ProveedorEntity proveedor =  proveedorService.findById(id);
            if(proveedor != null){
                System.out.println("Registrando cliente: "+clienteDto.getNombre()+" para el proveedor: "+id);
                ClienteEntity cliente = clienteService.findById(clienteDto.getId());
                if(cliente != null){
                    cliente.setCorreo(clienteDto.getCorreo());
                    cliente.setNombre(clienteDto.getNombre());
                    cliente.setTelefono(clienteDto.getTelefono());
                    cliente.setTipoId(clienteDto.getTipoId());
                    clienteService.save(cliente);
                }
                else{
                    clienteService.save(new ClienteEntity(clienteDto));
                }
            }else{
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.out.println(e.getStackTrace());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Registro de cliente exitoso")
                .object(clienteDto)
                .build(),HttpStatus.OK);
    }

    @PostMapping("/registrarRelacion/{idP}/{idC}")
    public ResponseEntity<?> registrarClienteProveedor(@PathVariable String idP, @PathVariable String idC){
        try{
            ProveedorEntity proveedor =  proveedorService.findById(idP);
            if(proveedor != null){
                ClienteEntity cliente = clienteService.findById(idC);
                if(cliente != null){
                    clienteService.saveClienteProveedor(cliente,proveedor);
                }else{
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND);
                }
            }else{
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.out.println(e.getStackTrace());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Registro de cliente exitoso")
                .object(idC)
                .build(),HttpStatus.OK);
    }

    @DeleteMapping("/eliminarClienteProv/{id}/{idCliente}")
    public ResponseEntity<?> eliminarClienteProveedor(@PathVariable String id, @PathVariable String idCliente){
        try{
            ProveedorEntity proveedor =  proveedorService.findById(id);
            if(proveedor != null){
                ClienteEntity cliente = clienteService.findById(idCliente);
                if(cliente != null){
                    clienteService.eliminarClienteProveedor(cliente,proveedor);
                }else{
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND);
                }
            }else{
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.out.println(e.getStackTrace());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Eliminación de cliente exitosa")
                .object(idCliente)
                .build(),HttpStatus.OK);
    }

}

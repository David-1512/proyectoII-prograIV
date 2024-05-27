package com.example.proyectoii_programacioniv.controller;

import com.example.proyectoii_programacioniv.dto.ProductoCabysDto;
import com.example.proyectoii_programacioniv.dto.UnidadMedidaDto;
import com.example.proyectoii_programacioniv.service.IProductoCabysService;
import com.example.proyectoii_programacioniv.dto.ProductoProveedorDto;
import com.example.proyectoii_programacioniv.entity.ProductoProveedorEntity;
import com.example.proyectoii_programacioniv.payload.MensajeResponse;
import com.example.proyectoii_programacioniv.service.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ProductoController {
    @Autowired
    private IProductoService productoService;


    @Autowired
    private IProductoCabysService productoCabysService;
    @GetMapping("producto/{id}")
    public ResponseEntity<?> showById(@PathVariable String id){
        ProductoProveedorEntity producto =  productoService.findById(id);
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Consulta de producto exitosa")
                .object(new ProductoProveedorDto(producto))//REVISAR ESTOO
                .build(), HttpStatus.OK);
    }

    @GetMapping("/productos/{id}")
    public ResponseEntity<?> showAllByIdProveedor(@PathVariable String id){
        List<ProductoProveedorEntity> productosPorProveedor = productoService.findAllByIdProveedor(id);
        return new ResponseEntity<>(MensajeResponse.builder()
                .mensaje("Consulta de clientes exitosa")
                .object(productosPorProveedor)
                .build(),HttpStatus.OK);
    }

    @GetMapping("/productosProveedor/{id}")
    public List<ProductoProveedorDto> procutosDeProveedor(@PathVariable String id){
        try{
            return productoService.productoProveedor(id);
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/productosSearch/{id}/{nombreBusqueda}")
    public List<ProductoProveedorDto> productosDeProveedor(@PathVariable String id, @PathVariable String nombreBusqueda){
        try{
            return productoService.buscarProductosProveedor(id, nombreBusqueda);
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/eliminarProductoProv/{cod}")
    public void delete(@PathVariable int cod) {
        try {
            productoService.delete(cod);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/productosCabys/{nombre}")
    public List<ProductoCabysDto> productosCabys(@PathVariable String nombre){
        try{
            System.out.println(productoCabysService.buscarProductosCabys(nombre));
            return productoCabysService.buscarProductosCabys(nombre);
        }
        catch (Exception e){

            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/unidadesMedida")
    public List<UnidadMedidaDto> unidadesMedida(){
        try{
            System.out.println(productoService.unidadesMedida());
            return productoService.unidadesMedida();
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/registrarProductoProv")
    public void create(@RequestBody ProductoProveedorDto producto) {
        try {
            System.out.println(producto);
            productoService.save(new ProductoProveedorEntity(producto));
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }
    }



}

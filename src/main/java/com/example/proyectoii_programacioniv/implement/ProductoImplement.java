package com.example.proyectoii_programacioniv.implement;

import com.example.proyectoii_programacioniv.dao.ProductoCabysDao;
import com.example.proyectoii_programacioniv.dao.ProductoProveedorDao;
import com.example.proyectoii_programacioniv.dao.UnidadMedidaDao;
import com.example.proyectoii_programacioniv.dto.ProductoProveedorDto;
import com.example.proyectoii_programacioniv.dto.UnidadMedidaDto;
import com.example.proyectoii_programacioniv.entity.ProductoProveedorEntity;
import com.example.proyectoii_programacioniv.entity.UnidadMedidaEntity;
import com.example.proyectoii_programacioniv.service.IProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.parser.Entity;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductoImplement implements IProductoService {


    @Autowired
    private ProductoProveedorDao productoDao;

    @Autowired
    private UnidadMedidaDao unidadMedidaDao;

    @Transactional(readOnly = true)
    @Override
    public ProductoProveedorEntity findById(String id) {
        return productoDao.findById(Integer.valueOf(id)).orElse(null); //REVISAR ESTOOOOOOOOO
    }

    @Transactional(readOnly = true)
    @Override
    public List<ProductoProveedorEntity> findAllByIdProveedor(String id) {
        List<ProductoProveedorEntity> productosPorProveedor = new ArrayList<>();
        for (ProductoProveedorEntity producto : productoDao.findAll()) {
            if (producto.getIdProveedor().equals(id)) {
                productosPorProveedor.add(producto);
            }
        }
        return productosPorProveedor;
    }

    @Transactional(readOnly = true)
    @Override
    public List<ProductoProveedorDto> productoProveedor(String id) {
        List<ProductoProveedorEntity> productosPorProveedor = productoDao.findAllByIdProveedor(id);

        List<ProductoProveedorDto> productosPorProveedorDto = new ArrayList<>();
        for (ProductoProveedorEntity producto : productosPorProveedor) {
            productosPorProveedorDto.add(new ProductoProveedorDto(producto));
        }

        return productosPorProveedorDto;
    }

    @Override
    public List<ProductoProveedorDto> buscarProductosProveedor(String id, String nombreBusqueda) {
        List<ProductoProveedorEntity> productosPorProveedor = productoDao.findAllByIdProveedorAndProductoCabys_IdProductoContaining(id, nombreBusqueda);

        List<ProductoProveedorEntity> productosPorProveedor2 =  productoDao.findAllByIdProveedorAndProductoCabys_NombreProductoContaining(id, nombreBusqueda);
        productosPorProveedor.addAll(productosPorProveedor2);

        List<ProductoProveedorDto> productosPorProveedorDto = new ArrayList<>();

        for (ProductoProveedorEntity producto : productosPorProveedor) {
            productosPorProveedorDto.add(new ProductoProveedorDto(producto));
        }
        return productosPorProveedorDto;
    }

    @Override
    public void delete(int cod) {
        productoDao.deleteById(cod);
    }

    @Override
    public List<UnidadMedidaDto> unidadesMedida() {
        List<UnidadMedidaEntity> unidades = (List<UnidadMedidaEntity>) unidadMedidaDao.findAll();

        List<UnidadMedidaDto> unidadesDto = new ArrayList<>();
        for (UnidadMedidaEntity unidad : unidades) {
            unidadesDto.add(new UnidadMedidaDto(unidad));
        }
        return unidadesDto;
    }

    @Override
    public void save(ProductoProveedorEntity productoProveedorEntity) {
        productoDao.save(productoProveedorEntity);
    }


}

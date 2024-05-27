package com.example.proyectoii_programacioniv.implement;

import com.example.proyectoii_programacioniv.dao.ProveedorDao;
import com.example.proyectoii_programacioniv.dto.ProveedorDto;
import com.example.proyectoii_programacioniv.dto.User;
import com.example.proyectoii_programacioniv.entity.ProveedorEntity;
import com.example.proyectoii_programacioniv.service.IProveedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProveedorImplement implements IProveedorService {
    @Autowired
    private ProveedorDao proveedorDao;

    @Transactional(readOnly = true)
    @Override
    public ProveedorEntity findById(String id) {
        return proveedorDao.findById(id).orElse(null);
    }


    @Transactional (readOnly = true)
    @Override
    public List<ProveedorEntity> findByEstado(char estado) {
        return proveedorDao.findByEstado(estado);
    }

    @Transactional (readOnly = true)
    @Override
    public  List<ProveedorEntity> findByEstadoIn(List<Character> estados) {
        return proveedorDao.findByEstadoIn(estados);
    }

    @Override
    public void save(ProveedorDto proveedorDto) {
        ProveedorEntity proveedorEntity = new ProveedorEntity().clonePassCifrada(proveedorDto);
        proveedorDao.save(proveedorEntity);
    }

    @Override
    public User getProveedorSinContrasenia(String id) {
        ProveedorEntity proveedorEntity = proveedorDao.findById(id).orElse(null);
        if (proveedorEntity != null) {
            return new ProveedorDto().cloneSinContrasenia(proveedorEntity);
        }
        return null;
    }

    @Override
    public ProveedorDto invertirEstado(ProveedorEntity proveedor) {
        proveedor.setEstado(proveedor.getEstado() == 'A' ? 'I' : 'A');
        proveedorDao.save(proveedor);
        return new ProveedorDto().cloneSinContrasenia(proveedor);
    }

    @Override
    public List<ProveedorDto> buscar(String nombre) {
        try{
            List<ProveedorEntity> proveedores = proveedorDao.findByIdContainingAndEstadoIn(nombre, new ArrayList<Character>(List.of('A', 'I', 'D')));
            List<ProveedorEntity> proveedores2 = proveedorDao.findByNombreContainingAndEstadoIn(nombre, new ArrayList<Character>(List.of('A', 'I', 'D')));
            proveedores.addAll(proveedores2);

            List<ProveedorDto> proveedoresDto = new ArrayList<>();
            for (ProveedorEntity proveedor : proveedores) {
                proveedoresDto.add(new ProveedorDto().cloneSinContrasenia(proveedor));
            }
            return proveedoresDto;
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public List<ProveedorDto> buscarSolicitudes(String nombre) {
        try{
            List<ProveedorEntity> proveedores = proveedorDao.findByIdContainingAndEstado(nombre, 'E');
            List<ProveedorEntity> proveedores2 = proveedorDao.findByNombreContainingAndEstado(nombre, 'E');
            proveedores.addAll(proveedores2);

            List<ProveedorDto> proveedoresDto = new ArrayList<>();
            for (ProveedorEntity proveedor : proveedores) {
                proveedoresDto.add(new ProveedorDto().cloneSinContrasenia(proveedor));
            }
            return proveedoresDto;
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public void actualizarActivo(String id) {
        ProveedorEntity proveedor = proveedorDao.findById(id).orElse(null);
        if (proveedor != null) {
            proveedor.setEstado('D');
            proveedorDao.save(proveedor);
        }
    }

    @Override
    public void delete(ProveedorEntity proveedor) {
        proveedorDao.delete(proveedor);
    }
}

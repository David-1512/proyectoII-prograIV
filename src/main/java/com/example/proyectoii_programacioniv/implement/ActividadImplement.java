package com.example.proyectoii_programacioniv.implement;

import com.example.proyectoii_programacioniv.dao.ActividadComercialDao;
import com.example.proyectoii_programacioniv.dto.ActividadComercialDto;
import com.example.proyectoii_programacioniv.entity.ActividadComercialEntity;
import com.example.proyectoii_programacioniv.service.IActividadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ActividadImplement implements IActividadService {

    @Autowired
    private ActividadComercialDao actividadDao;
    @Override
    public List<ActividadComercialDto> buscar(String nombre) {

        List<ActividadComercialEntity> list = actividadDao.findByIdActComercialContaining(nombre);
        List<ActividadComercialEntity> list2 = actividadDao.findByNombreContaining(nombre);

        list.addAll(list2);
        List<ActividadComercialDto> list3= new ArrayList<>();

        for(ActividadComercialEntity act: list){
            list3.add(new ActividadComercialDto(act));
        }

        return list3;
    }

    @Override
    public ActividadComercialDto buscarPorId(String id) {
        return new ActividadComercialDto(actividadDao.findById(id).get());
    }
}

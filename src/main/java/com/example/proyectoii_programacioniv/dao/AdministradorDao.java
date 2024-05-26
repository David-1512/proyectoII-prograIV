package com.example.proyectoii_programacioniv.dao;

import com.example.proyectoii_programacioniv.dto.AdministradorDto;
import com.example.proyectoii_programacioniv.dto.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component("administradorDao")
public class AdministradorDao {
    List<AdministradorDto> listAdministrador;

    public AdministradorDao() {
        this.listAdministrador = new ArrayList<>();
        var encoder = new BCryptPasswordEncoder();
        listAdministrador.add(new AdministradorDto("1111","Tatiana","{bcrypt}"+encoder.encode("1")));
        listAdministrador.add(new AdministradorDto("2222","Juan","{bcrypt}"+encoder.encode("1")));
    }

    public List<AdministradorDto> getlistAdministrador() {
        return listAdministrador;
    }

    public void setlistAdministrador(List<AdministradorDto> listAdministrador) {
        this.listAdministrador = listAdministrador;
    }

    public AdministradorDto findById(String username) {
        for (AdministradorDto administradorDto : listAdministrador) {
            if (administradorDto.getId().equals(username)) {
                return administradorDto;
            }
        }
        return null;
    }
}

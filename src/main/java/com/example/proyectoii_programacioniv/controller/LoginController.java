package com.example.proyectoii_programacioniv.controller;

import com.example.proyectoii_programacioniv.dto.AdministradorDto;
import com.example.proyectoii_programacioniv.dto.ProveedorDto;
import com.example.proyectoii_programacioniv.dto.User;
import com.example.proyectoii_programacioniv.entity.ProveedorEntity;
import com.example.proyectoii_programacioniv.security.UserDetailsImp;
import com.example.proyectoii_programacioniv.service.IProveedorService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1")
public class LoginController {

    @Autowired
    IProveedorService proveedorService;

    @PostMapping("/login")
    public User login(@RequestBody User form, HttpServletRequest request) {
        for(int i = 0; i < 50; i++){
            System.out.println(i);
        }
        System.out.println(form.getId());
        System.out.println(form.getPassword());

        try {
            request.login(form.getId(), form.getPassword());
        } catch (ServletException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        Authentication auth = (Authentication) request.getUserPrincipal();
        User user = ((UserDetailsImp) auth.getPrincipal()).getUser();
        if(user.getRol().equals("PRO")){
            return new ProveedorDto().cloneSinContrasenia((ProveedorDto)user);
        }
        return new AdministradorDto().cloneSinContrasenia((AdministradorDto)user);
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request) {
        try {
            request.logout();
        } catch (ServletException e) {
        }
    }

    @GetMapping("/current-user")
    public User getCurrentUser(@AuthenticationPrincipal UserDetailsImp user) {
        if(user.getUser().getRol().equals("PRO")){
            return new ProveedorDto().cloneSinContrasenia((ProveedorDto)user.getUser());
        }
        return new AdministradorDto().cloneSinContrasenia((AdministradorDto)user.getUser());
    }

    @PostMapping("/registro")
    public User registro(@RequestBody ProveedorDto form, HttpServletRequest request) {
        for(int i = 0; i < 50; i++){
            System.out.println(i);
        }
        System.out.println(form.getId());
        System.out.println(form.getPassword());
        System.out.println(form.getNombre());
        System.out.println(form.getTipoId());

        try {
            form.setEstado('E');
            proveedorService.save(form);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        return proveedorService.getProveedorSinContrasenia(form.getId());

    }




}

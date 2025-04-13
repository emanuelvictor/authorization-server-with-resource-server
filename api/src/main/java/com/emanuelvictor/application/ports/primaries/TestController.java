package com.emanuelvictor.application.ports.primaries;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/publico")
    public String publico() {
        return "Este endpoint é público!";
    }

    @PreAuthorize("hasAnyAuthority('root')")
    @GetMapping("/api/seguro")
    public String protegido() {
        return "Você acessou um endpoint protegido com sucesso!";
    }
}

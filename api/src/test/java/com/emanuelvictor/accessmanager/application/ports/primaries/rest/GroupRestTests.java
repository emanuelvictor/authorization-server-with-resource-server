package com.emanuelvictor.accessmanager.application.ports.primaries.rest;

import com.emanuelvictor.SpringBootTests;
import com.emanuelvictor.accessmanager.domain.entities.Group;
import com.emanuelvictor.accessmanager.domain.entity.GroupBuilder;
import com.emanuelvictor.accessmanager.application.ports.secundaries.jpa.GroupRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.nio.charset.StandardCharsets;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

public class GroupRestTests extends SpringBootTests {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private GroupRepository accessGroupRepository;

//    private CsrfTokenRepository csrfTokenRepository;
//    private CsrfToken csrfToken;

//    @BeforeEach
//    public void setup() {
//        csrfTokenRepository = new HttpSessionCsrfTokenRepository();
//        MockHttpServletRequest request = new MockHttpServletRequest();
//        csrfToken = csrfTokenRepository.generateToken(request);
//    }

    @Test
    public void mustReturnAccessGroupPermissionsByGroupId() throws Exception {
        final var id = 1L;

        final var result = mockMvc.perform(MockMvcRequestBuilders
                .get("/api/access-manager/access-group-permissions")
                .param("groupId", String.valueOf(id))
                .with(oauth2Login()
                        .authorities((GrantedAuthority) () -> "root")
                )
                .with(csrf()) // Adiciona CSRF token automaticamente
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding(StandardCharsets.UTF_8)
        );

        result.andExpect(status().isOk());
    }

    @Test
    public void cannotAccessResourceWithoutRequiredPermissions() throws Exception {
        final var id = 1L;

        final var result = mockMvc.perform(MockMvcRequestBuilders
                .get("/api/access-manager/access-group-permissions")
                .param("groupId", String.valueOf(id))
                .with(csrf()) // Adiciona CSRF token automaticamente
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding(StandardCharsets.UTF_8)
        );

        result.andExpect(status().isUnauthorized());
    }

    @Test
    public void mustCreateAccessGroup() throws Exception {
        assertThat(accessGroupRepository.count()).isEqualTo(0);

        final var result = mockMvc.perform(MockMvcRequestBuilders
                .post("/api/access-manager/access-groups")
                .content(objectMapper.writeValueAsString(new GroupBuilder().build()))
                .with(oauth2Login()
                        .authorities((GrantedAuthority) () -> "root")
                )
                .with(csrf()) // Adiciona CSRF token automaticamente
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding(StandardCharsets.UTF_8)
        );

        result.andExpect(status().isCreated());
        assertThat(accessGroupRepository.count()).isEqualTo(1);
    }

    @Test
    public void mustUpdateAccessGroup() throws Exception {
        final Group group = accessGroupRepository.save(new GroupBuilder().build());
        final String newName = "New name";
        group.setName(newName);

        final var result = mockMvc.perform(MockMvcRequestBuilders
                .put("/api/access-manager/access-groups/" + group.getId())
                .content(objectMapper.writeValueAsBytes(group))
                .with(oauth2Login()
                        .authorities((GrantedAuthority) () -> "root")
                )
                .with(csrf()) // Adiciona CSRF token automaticamente
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding(StandardCharsets.UTF_8)
        );

        result.andExpect(status().isOk());

        final var savedAccessGroup = accessGroupRepository.findById(group.getId()).orElseThrow();
        assertThat(savedAccessGroup.getName()).isEqualTo(newName);
    }

    @Test
    public void mustDeleteAnAccessGroup() throws Exception {
        final Group group = accessGroupRepository.save(new GroupBuilder().build());

        final var result = mockMvc.perform(MockMvcRequestBuilders
                .delete("/api/access-manager/access-groups/" + group.getId())
                .with(oauth2Login()
                        .authorities((GrantedAuthority) () -> "root")
                )
                .with(csrf()) // Adiciona CSRF token automaticamente
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding(StandardCharsets.UTF_8)
        );

        result.andExpect(status().isNoContent());
    }
//
//    // Método alternativo que usa o token manualmente ao invés do post processor
//    private MockHttpServletRequestBuilder withCsrfToken(MockHttpServletRequestBuilder requestBuilder) {
//        return requestBuilder
//                .param(csrfToken.getParameterName(), csrfToken.getToken())
//                .header(csrfToken.getHeaderName(), csrfToken.getToken());
//    }
}
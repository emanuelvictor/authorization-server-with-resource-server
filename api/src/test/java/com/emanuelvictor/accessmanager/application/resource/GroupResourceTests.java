package com.emanuelvictor.accessmanager.application.resource;

import com.emanuelvictor.SpringBootTests;
import com.emanuelvictor.accessmanager.domain.entities.Group;
import com.emanuelvictor.accessmanager.domain.entity.GroupBuilder;
import com.emanuelvictor.accessmanager.domain.repositories.GroupRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.nio.charset.StandardCharsets;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;

public class GroupResourceTests extends SpringBootTests {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private GroupRepository accessGroupRepository;

    @Test
    public void mustReturnAccessGroupPermissionsByGroupId() throws Exception {
        final var id = 1L;
//        final var pageOfAccessGroupPermissions = groupPermissionRepository.findByGroupId(id, null);
//        final var jsonExpected = objectMapper.writeValueAsString(pageOfAccessGroupPermissions);

        final var result = mockMvc.perform(MockMvcRequestBuilders
                .get("/api/access-manager/access-group-permissions")
                .param("groupId", String.valueOf(id))
                .with(oauth2Login()
                        .authorities((GrantedAuthority) () -> "root")
                )
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding(StandardCharsets.UTF_8)
        );

        result.andExpect(status().isOk());
//                .andExpect(content().string(jsonExpected));
    }

    /**
     * @throws Exception exception
     */
    @Test
    public void cannotAccessResourceWithoutRequiredPermissions() throws Exception {
        final var id = 1L;

        final var result = mockMvc.perform(MockMvcRequestBuilders
                .get("/api/access-manager/access-group-permissions")
                .param("groupId", String.valueOf(id))
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding(StandardCharsets.UTF_8)
        );

        result.andExpect(status().isUnauthorized());
    }

    /**
     * @throws Exception exception
     */
    @Test
    public void mustCreateAccessGroup() throws Exception {
        assertThat(accessGroupRepository.count()).isEqualTo(0);

        final var result = mockMvc.perform(MockMvcRequestBuilders
                .post("/api/access-manager/access-groups")
                .content(objectMapper.writeValueAsString(new GroupBuilder().build()))
                .with(oauth2Login()
                        .authorities((GrantedAuthority) () -> "root")
                )
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding(StandardCharsets.UTF_8)
        );

        result.andExpect(status().isCreated());
        assertThat(accessGroupRepository.count()).isEqualTo(1);
    }

    /**
     * @throws Exception exception
     */
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
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding(StandardCharsets.UTF_8)
        );

        result.andExpect(status().isOk());

        final var savedAccessGroup = accessGroupRepository.findById(group.getId()).orElseThrow();
        assertThat(savedAccessGroup.getName()).isEqualTo(newName);
    }

    /**
     * @throws Exception exception
     */
    @Test
    public void mustDeleteAnAccessGroup() throws Exception {
        final Group group = accessGroupRepository.save(new GroupBuilder().build());

        final var result = mockMvc.perform(MockMvcRequestBuilders
                .delete("/api/access-manager/access-groups/" + group.getId())
                .with(oauth2Login()
                        .authorities((GrantedAuthority) () -> "root")
                )
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding(StandardCharsets.UTF_8)
        );

        result.andExpect(status().isNoContent());
    }
}
package com.emanuelvictor.accessmanager.application.resource;

import com.emanuelvictor.accessmanager.domain.entities.Group;
import com.emanuelvictor.accessmanager.domain.repositories.GroupPermissionRepository;
import com.emanuelvictor.accessmanager.domain.repositories.GroupRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

/**
 *
 */
@RestController
@RequiredArgsConstructor
@RequestMapping({"api/access-manager/groups", "api/access-manager/access-groups"})
public class GroupResource {

    private final GroupRepository groupRepository;
    private final GroupPermissionRepository accessGroupPermissionRepository;

    /**
     * @param defaultFilter String
     * @param pageable      Pageable
     * @return Page<group>
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('root.access-manager.groups.read','root.access-manager.groups','root.access-manager','root')")
    public Page<Group> listByFilters(final String defaultFilter, final Pageable pageable) {
        return groupRepository.listByFilters(defaultFilter, pageable);
    }

    /**
     * @param id long
     * @return Optional<Group>
     */
    @GetMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('root.access-manager.groups.read','root.access-manager.groups','root.access-manager','root')")
    public Optional<Group> findById(@PathVariable final long id) {
        return groupRepository.findById(id);
    }

    /**
     * @param accessGroup Group
     * @return group
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyAuthority('root.access-manager.groups.create','root.access-manager.groups','root.access-manager','root')")
    public Group create(@RequestBody final Group accessGroup) {
        return groupRepository.save(accessGroup);
    }

    /**
     * @param acessGroup group
     * @return group
     */
    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('root.access-manager.groups.update','root.access-manager.groups','root.access-manager','root')")
    public Group update(@PathVariable final long id, @RequestBody final Group acessGroup) {
        acessGroup.setId(id);
        return groupRepository.save(acessGroup);
    }

    /**
     * @param id long
     * @return Boolean
     */
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAnyAuthority('root.access-manager.groups.delete','root.access-manager.groups','root.access-manager','root')")
    public Boolean delete(@PathVariable final long id) {
        accessGroupPermissionRepository.deleteAllByGroupId(id);
        groupRepository.deleteById(id);
        return true;
    }
}
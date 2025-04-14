package com.emanuelvictor.accessmanager.application.resource;

import com.emanuelvictor.accessmanager.domain.entities.GroupPermission;
import com.emanuelvictor.accessmanager.domain.repositories.GroupPermissionRepository;
import com.emanuelvictor.accessmanager.domain.services.LinkPermissionToGroupService;
import com.emanuelvictor.accessmanager.domain.services.UnlinkPermissionToGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("api/access-manager/access-group-permissions")
public class AccessGroupPermissionResource {

    private final GroupPermissionRepository accessGroupPermissionRepository;
    private final LinkPermissionToGroupService linkPermissionToGroupService;
    private final UnlinkPermissionToGroupService unlinkPermissionToGroupService;

    /**
     * @param groupId long
     * @return Page<GroupPermission>
     */
    @GetMapping
    @PreAuthorize("hasAnyAuthority('root.access-manager.groups.get','root.access-manager.groups','root.access-manager','root')")
    public Page<GroupPermission> findAccessGroupPermissionsByGroupId(@RequestParam final long groupId,
                                                                     @RequestParam(required = false) final String authority,
                                                                     final Pageable pageable) {
        return accessGroupPermissionRepository.listByFilters(groupId, authority, pageable);
    }

    /**
     * @param groupId long
     * @return Page<GroupPermission>
     */
    @GetMapping("{groupId}/{authority}")
    @PreAuthorize("hasAnyAuthority('root.access-manager.groups.get','root.access-manager.groups','root.access-manager','root')")
    public int verifyIfThePermissionHasSomeChildLinkedToGroup(@PathVariable("groupId") long groupId,
                                                              @PathVariable("authority") String authority) {
        return accessGroupPermissionRepository.verifyIfThePermissionHasSomeChildLinkedToGroup(groupId, authority);
    }

    /**
     * @param accessGroupPermission {@link GroupPermission}
     * @return ResponseEntity<Object>
     */
    @Transactional
    @PostMapping
    @PreAuthorize("hasAnyAuthority('root.access-manager.access-group-permissions.create','root.access-manager.access-group-permissions','root.access-manager','root')")
    public ResponseEntity<Object> create(@RequestBody final GroupPermission accessGroupPermission) {
        linkPermissionToGroupService.linkPermissionToGroup(accessGroupPermission.getGroupId(), accessGroupPermission.getAuthority());
        return ResponseEntity.ok().build();
    }

    /**
     * @param groupId   Long
     * @param authority String
     * @return ResponseEntity<Object>
     */
    @Transactional
    @DeleteMapping("{groupId}/{authority}")
    @PreAuthorize("hasAnyAuthority('root.access-manager.access-group-permissions.delete','root.access-manager.access-group-permissions','root.access-manager','root')")
    public ResponseEntity<Object> remove(@PathVariable final long groupId, @PathVariable final String authority) {
        unlinkPermissionToGroupService.unlinkPermissionToGroup(groupId, authority);
        return ResponseEntity.ok().build();
    }
}

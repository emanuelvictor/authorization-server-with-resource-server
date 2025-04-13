package com.emanuelvictor.domain.repositories;

import com.emanuelvictor.domain.entities.GroupPermission;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 1.0.0, 10/09/2019
 */
@Repository
public interface GroupPermissionRepository extends JpaRepository<GroupPermission, Long> {

    /**
     * TODO make tests
     *
     * @param groupId  {@link Long}
     * @param pageable {@link Pageable}
     * @return {@link Page}
     */
    @Query("from GroupPermission groupPermission where groupPermission.group.id = :groupId")
    Page<GroupPermission> findByGroupId(final long groupId, final Pageable pageable);

    /**
     * @param groupId  {@link Long}
     * @param pageable {@link Pageable}
     * @return {@link Page}
     */
    @Query("from GroupPermission groupPermission where (" +
            "   (" +
            "       (:groupId IS NOT NULL and groupPermission.group.id = :groupId) OR :groupId IS NULL" +
            "   )" +
            "   AND" +
            "   (" +
            "       (:authority IS NOT NULL and groupPermission.permission.authority = :authority) OR :authority IS NULL" +
            "   )" +
            ")")
    Page<GroupPermission> listByFilters(final long groupId, final String authority, final Pageable pageable); // TODO we need incrementing tests with new authority parameter

    /**
     * FIxme MAKE TESTS
     *
     * @param upperPermissionId {@link Long}
     * @param groupId           {@link Long}
     * @param pageable          {@link Pageable}
     * @return {@link Page}
     */
    @Query("from GroupPermission groupPermission where groupPermission.group.id = :groupId AND groupPermission.permission.upperPermission.id = :upperPermissionId")
    Page<GroupPermission> findByUpperPermissionIdAndGroupId(final long upperPermissionId, final long groupId, final Pageable pageable);

    /**
     * FIxme MAKE TESTS
     *
     * @param groupId      {@link Long}
     * @param permissionId {@link Long}
     */
    @Modifying
    @Transactional
    @Query("delete from GroupPermission groupPermission where groupPermission.group.id = :groupId AND groupPermission.permission.id = :permissionId")
    void deleteByGroupIdAndPermissionId(Long groupId, Long permissionId);

    /**
     * FIxme MAKE TESTS
     *
     * @param groupId   {@link Long}
     * @param authority {@link String}
     */
    @Modifying
    @Transactional
    @Query("delete from GroupPermission groupPermission where groupPermission.group.id = :groupId AND groupPermission.permission.authority = :authority")
    void deleteByGroupIdAndPermissionAuthority(Long groupId, String authority);

    /**
     * TODO make tests
     *
     * @param groupId      {@link Long}
     * @param permissionId {@link Long}
     */
    @Query("from GroupPermission groupPermission where groupPermission.group.id = :groupId AND groupPermission.permission.id = :permissionId")
    GroupPermission findByGroupIdAndPermissionId(Long groupId, Long permissionId);

    /**
     * @param groupId   {@link Long}
     * @param authority {@link String}
     * @return {@link  Optional<GroupPermission>}
     */
    @Query("from GroupPermission groupPermission where groupPermission.group.id = :groupId AND groupPermission.permission.authority = :authority")
    Optional<GroupPermission> findByGroupIdAndPermissionAuthority(long groupId, String authority);

    /**
     * Não verifica do leaf com o root quando os dois são o mesmo.
     * Ou seja, e somente par aprocurar os filhos realmente.
     * </p>
     *
     * @param groupId   {@link Long}
     * @param authority {@link String}
     * @return {@link  Optional<GroupPermission>}
     */
    @Query(value =
            "WITH RECURSIVE permission_hierarquia AS (" +
                    "    SELECT p.id," +
                    "           p.authority," +
                    "           p.upper_permission_id" +
                    "    FROM permission p" +
                    "        INNER JOIN permission upper_permission on upper_permission.id = p.upper_permission_id" +
                    "    WHERE upper_permission.authority = ?2" +
                    "    UNION ALL" +
                    "    SELECT p.id," +
                    "           p.authority," +
                    "           p.upper_permission_id" +
                    "    FROM permission p" +
                    "             INNER JOIN permission_hierarquia ph ON ph.id = p.upper_permission_id)" +
                    " SELECT count(ph.id)" +
                    " FROM permission_hierarquia ph" +
                    "         INNER JOIN group_permission gp ON ph.id = gp.permission_id" +
                    "         INNER JOIN \"group\" g ON g.id = gp.group_id" +
                    " WHERE gp.group_id = ?1", nativeQuery = true)
    int verifyIfThePermissionHasSomeChildLinkedToGroup(@Param("groupId") long groupId, @Param("authority") String authority);

    /**
     * FIxme MAKE TESTS
     *
     * @param groupId {@link Long}
     */
    @Modifying
    @Transactional
    @Query("delete from GroupPermission groupPermission where groupPermission.group.id = :groupId")
    void deleteAllByGroupId(long groupId);
}

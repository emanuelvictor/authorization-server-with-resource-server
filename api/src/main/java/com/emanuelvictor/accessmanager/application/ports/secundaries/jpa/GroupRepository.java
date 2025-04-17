package com.emanuelvictor.accessmanager.application.ports.secundaries.jpa;

import com.emanuelvictor.accessmanager.domain.entities.Group;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 1.0.0, 10/09/2019
 */
@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

    /**
     * @param filter   String
     * @param pageable Pageable
     * @return Page<AccessGroup>
     */
    @Query("FROM Group groupp WHERE" +
            "   (" +
            "       FILTER(:filter, groupp.name) = TRUE" +
            "   )"
    )
    Page<Group> listByFilters(@Param("filter") final String filter, final Pageable pageable);

}

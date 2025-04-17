package com.emanuelvictor.accessmanager.application.ports.secundaries.jpa;

import com.emanuelvictor.accessmanager.domain.entities.Tenant;
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
public interface TenantRepository extends JpaRepository<Tenant, Long> {

    /**
     * @param filter   String
     * @param pageable Pageable
     * @return Page<AccessGroup>
     */
    @Query("FROM Tenant tenant WHERE" +
            "   (" +
            "       FILTER(:filter, tenant.identification) = TRUE" +
            "   )"
    )
    Page<Tenant> listByFilters(@Param("filter") final String filter, final Pageable pageable);

}

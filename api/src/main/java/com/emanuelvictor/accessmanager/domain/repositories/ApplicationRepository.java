package com.emanuelvictor.accessmanager.domain.repositories;

import com.emanuelvictor.accessmanager.domain.entities.Application;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * TODO must create tests
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 2.0.0, 01/01/2020
 */
@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    /**
     * @param defaultFilter String
     * @param pageable      Pageable
     * @return Page<Application>
     */
    @Query("FROM Application a WHERE " +
            "(" +
            "   filter(:defaultFilter, a.clientId, a.group.name) = true" +
            ")")
    Page<Application> listByFilters(final @Param("defaultFilter") String defaultFilter, final Pageable pageable);

    /**
     * @param clientId String
     * @return Optional<Application>
     */
    Optional<Application> findByClientId(final String clientId);

    /**
     * @param clientId String
     * @param id       Long
     * @return Optional<Application>
     */
    Optional<Application> findByClientIdAndIdNot(final String clientId, final Long id);

}

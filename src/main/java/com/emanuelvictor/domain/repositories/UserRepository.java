package com.emanuelvictor.domain.repositories;

import com.emanuelvictor.domain.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * FIXME must create tests
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 2.0.0, 01/01/2020
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * @param username String
     * @return Optional<User>
     */
    Optional<User> findByUsername(final String username);

    /**
     * @param username String
     * @param id       Long
     * @return Optional<User>
     */
    Optional<User> findByUsernameAndIdNot(final String username, final Long id);

    /**
     * @param filter
     * @return
     */
    @Query("FROM User u WHERE filter(:filter, u.username) = true")
    Page<User> listByFilters(final String filter, final Pageable pageable);

    /**
     * @param defaultFilter String
     * @param enableFilter  Boolean
     * @param pageable      Pageable
     * @return Page<User>
     */
    @Query("FROM User u WHERE " +
            "(" +
            "   filter(:defaultFilter, u.username, u.group.name) = true" +
            "   AND " +
            "   (" +
            "       :enableFilter IS NOT NULL AND " +
            "       (" +
            "           u.enabled = :enableFilter" +
            "       ) " +
            "       OR :enableFilter IS NULL" +
            "   )" +
            ")")
    Page<User> listByFilters(final @Param("defaultFilter") String defaultFilter,
                             final @Param("enableFilter") Boolean enableFilter, final Pageable pageable);

}

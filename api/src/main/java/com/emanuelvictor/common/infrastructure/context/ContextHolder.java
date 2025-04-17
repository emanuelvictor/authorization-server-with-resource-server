package com.emanuelvictor.common.infrastructure.context;

import com.emanuelvictor.accessmanager.domain.entities.User; // TODO coupling
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.Assert;

/**
 * Class ContextHolder, serve para resolver o usuário autenticado e compara o mesmo com outro.
 *
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 1.0.0, 10/09/2019
 */
public class ContextHolder {

    /**
     * @return {User}
     */
    public static UserDetails getAuthenticatedUser() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            return (UserDetails) authentication.getPrincipal();
        }

        throw new AuthenticationCredentialsNotFoundException("O usuário não está autenticado");
    }

    /**
     * @return boolean
     */
    public static boolean isAuthenticated() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return authentication != null && authentication.getPrincipal() != null && !authentication.getPrincipal().equals("anonymousUser");
    }

    /**
     * @return boolean
     */
    public static boolean itsMe(final long id) {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Assert.isTrue(isAuthenticated(), "O usuário não está autenticado");

        return ((User) authentication.getPrincipal()).getId().equals(id);
    }

}

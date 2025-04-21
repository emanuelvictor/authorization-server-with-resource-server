package com.emanuelvictor.common.infrastructure.filters;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

import static com.emanuelvictor.Main.DEFAULT_TENANT_IDENTIFICATION;


@RequiredArgsConstructor
public class TenantFilter extends OncePerRequestFilter {

    private final JwtDecoder jwtDecoder;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        try {
            final var tenantIdentification = extractTenantFromRequest(request);
            TenantContext.setTenantIdentification(Objects.requireNonNullElse(tenantIdentification, DEFAULT_TENANT_IDENTIFICATION));
            filterChain.doFilter(request, response);
        } finally {
            TenantContext.clear();
        }
    }

    private String extractTenantFromRequest(HttpServletRequest request) {
        final var bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            try {
                final var token = bearerToken.substring(7);
                final var jwt = jwtDecoder.decode(token);
                if (jwt.getClaims().containsKey("tenantIdentification")) {
                    return jwt.getClaim("tenantIdentification");
                }
                return request.getHeader("TenantIdentification");
            } catch (final JwtException e) {
                logger.debug("Failed to decode JWT token", e);
            }
        }
        return null;
    }

}
package com.emanuelvictor.application.auth;

import com.emanuelvictor.domain.entities.GroupPermission;
import com.emanuelvictor.domain.repositories.GroupPermissionRepository;
import com.emanuelvictor.domain.repositories.UserRepository;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.authorization.OAuth2TokenType;
import org.springframework.security.oauth2.server.authorization.client.InMemoryRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.oauth2.server.authorization.settings.AuthorizationServerSettings;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.security.oauth2.server.authorization.token.JwtEncodingContext;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenCustomizer;
import org.springframework.security.oauth2.server.authorization.web.authentication.OAuth2AuthorizationCodeAuthenticationConverter;
import org.springframework.security.oauth2.server.authorization.web.authentication.OAuth2ClientCredentialsAuthenticationConverter;
import org.springframework.security.oauth2.server.authorization.web.authentication.OAuth2RefreshTokenAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.time.Duration;
import java.util.Arrays;
import java.util.Collections;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Configuration
@EnableMethodSecurity
public class AuthServerConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JWKSource<SecurityContext> jwkSource() {
        KeyPair keyPair = generateRsaKey();
        RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
        RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
        RSAKey rsaKey = new RSAKey.Builder(publicKey)
                .privateKey(privateKey)
                .keyID(UUID.randomUUID().toString())
                .build();
        JWKSet jwkSet = new JWKSet(rsaKey);
        return new ImmutableJWKSet<>(jwkSet);
    }

    private static KeyPair generateRsaKey() {
        KeyPair keyPair;
        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            keyPair = keyPairGenerator.generateKeyPair();
        } catch (Exception ex) {
            throw new IllegalStateException(ex);
        }
        return keyPair;
    }

    @Bean
    public RegisteredClientRepository registeredClientRepository(PasswordEncoder passwordEncoder) {
        String encodedSecret = passwordEncoder.encode("browser");

        RegisteredClient client = RegisteredClient.withId("browser")
                .clientId("browser")
                .clientSecret(encodedSecret)
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_POST)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
                .redirectUri("http://localhost:4200")
                .redirectUri("http://localhost:4200/authorized")
                .redirectUri("http://localhost:4200/silent-renew.html")
                .scope(OidcScopes.OPENID)
                .scope("root")
                .clientSettings(ClientSettings.builder()
                        .requireAuthorizationConsent(false)
                        .requireProofKey(false)
                        .build())
                .tokenSettings(TokenSettings.builder()
                        .accessTokenTimeToLive(Duration.ofHours(1))
                        .refreshTokenTimeToLive(Duration.ofDays(30))
                        .reuseRefreshTokens(true)
                        .build())
                .build();

        return new InMemoryRegisteredClientRepository(client);
    }

    @Bean
    public JwtDecoder jwtDecoder(JWKSource<SecurityContext> jwkSource) {
        return OAuth2AuthorizationServerConfiguration.jwtDecoder(jwkSource);
    }

    @Bean
    public AuthorizationServerSettings authorizationServerSettings() {
        return AuthorizationServerSettings.builder()
                .issuer("http://localhost:8080")
                .build();
    }

    @Bean
    public OAuth2TokenCustomizer<JwtEncodingContext> jwtTokenCustomizer() {
        return (context) -> {
            if (OAuth2TokenType.ACCESS_TOKEN.equals(context.getTokenType())) {
                context.getClaims().claims((claims) -> {
                    Set<String> authorities = AuthorityUtils.authorityListToSet(context.getPrincipal().getAuthorities())
                            .stream()
                            .map(c -> c.replaceFirst("^ROLE_", ""))
                            .collect(Collectors.collectingAndThen(Collectors.toSet(), Collections::unmodifiableSet));
                    claims.put("authorities", authorities);
                });
            }
        };
    }


//    @Bean
//    public OAuth2TokenCustomizer<JwtEncodingContext> tokenCustomizer() {
//        return context -> {
//            if (context.getTokenType() == OAuth2TokenType.ACCESS_TOKEN) {
//                Authentication principal = context.getPrincipal();
//                if (principal.getPrincipal() instanceof User userDetails) {
//                    Set<String> authorities = userDetails.getAuthorities().stream()
//                            .map(GrantedAuthority::getAuthority)
//                            .collect(Collectors.toSet());
//
//                    context.getClaims().claim("authorities", authorities);
//                }
//            }
//        };
//    }

    @Bean
    @Order(1)
    public SecurityFilterChain authorizationServerFilterChain(HttpSecurity http) throws Exception {
        OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);

        http.getConfigurer(OAuth2AuthorizationServerConfigurer.class)
                .tokenEndpoint(tokenEndpoint -> tokenEndpoint
                        .accessTokenRequestConverters(configurer -> {
                            configurer.addAll(Arrays.asList(
                                    new OAuth2AuthorizationCodeAuthenticationConverter(),
                                    new OAuth2RefreshTokenAuthenticationConverter(),
                                    new OAuth2ClientCredentialsAuthenticationConverter()
                            ));
                        })
                )
                .oidc(Customizer.withDefaults());

        http.exceptionHandling(exceptions -> exceptions
                        .authenticationEntryPoint(new LoginUrlAuthenticationEntryPoint("/login")))
                .cors(Customizer.withDefaults());

        // Desabilita CSRF para os endpoints OAuth2
        http.csrf(csrf -> csrf.ignoringRequestMatchers("/oauth2/**"));

        return http.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        grantedAuthoritiesConverter.setAuthoritiesClaimName("authorities"); // nome do claim que contém as authorities
        grantedAuthoritiesConverter.setAuthorityPrefix(""); // remover o prefixo padrão "SCOPE_"

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
        return jwtAuthenticationConverter;
    }

    @Bean
    @Order(2)
    public SecurityFilterChain resourceServerFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/login", "/error", "/oauth2/**").permitAll()
                        .anyRequest().permitAll())
                .formLogin(Customizer.withDefaults())
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt
                                .jwtAuthenticationConverter(jwtAuthenticationConverter())
                        ))
                .cors(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService(UserRepository userRepository, GroupPermissionRepository groupPermissionRepository) {
        return username -> {
            final var user = userRepository.findByUsername(username).orElseThrow();
            final var authorities = groupPermissionRepository.findByGroupId(user.getGroupId(), null)
                    .stream().map(GroupPermission::getPermission).collect(Collectors.toSet());
            user.setAuthorities(authorities);
            return user;
        };
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        // Deve liberar o cors somente em ambiente de desenvolvimento
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
        configuration.setAllowedHeaders(Arrays.asList("access-control-allow-origin", "x-requested-with", "authorization", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Origin", "Cache-Control", "Content-Type", "Authorization"));
        configuration.setAllowedMethods(Arrays.asList("OPTIONS", "DELETE", "GET", "POST", "PATCH", "PUT"));

        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}

//package com.emanuelvictor.application.auth;
//
//
//import com.emanuelvictor.domain.repositories.UserRepository;
//import com.nimbusds.jose.JOSEException;
//import com.nimbusds.jose.jwk.JWKSet;
//import com.nimbusds.jose.jwk.RSAKey;
//import com.nimbusds.jose.jwk.source.JWKSource;
//import com.nimbusds.jose.proc.SecurityContext;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.annotation.Order;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.AuthenticationProvider;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.oauth2.core.AuthorizationGrantType;
//import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
//import org.springframework.security.oauth2.core.oidc.OidcScopes;
//import org.springframework.security.oauth2.jwt.JwtDecoder;
//import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
//import org.springframework.security.oauth2.server.authorization.authentication.OAuth2ClientAuthenticationToken;
//import org.springframework.security.oauth2.server.authorization.client.InMemoryRegisteredClientRepository;
//import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
//import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
//import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
//import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
//import org.springframework.security.oauth2.server.authorization.settings.AuthorizationServerSettings;
//import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
//import org.springframework.security.oauth2.server.authorization.web.authentication.DelegatingAuthenticationConverter;
//import org.springframework.security.oauth2.server.authorization.web.authentication.OAuth2AuthorizationCodeAuthenticationConverter;
//import org.springframework.security.oauth2.server.authorization.web.authentication.OAuth2ClientCredentialsAuthenticationConverter;
//import org.springframework.security.oauth2.server.authorization.web.authentication.OAuth2RefreshTokenAuthenticationConverter;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import java.util.Arrays;
//
//@Configuration
//@EnableMethodSecurity()
//public class AuthServerConfig {
//
//    private final RSAKey rsaKey = KeyUtils.generateRsa();
//
//    @Bean
//    public RegisteredClientRepository registeredClientRepository() {
//        String encodedSecret = passwordEncoder().encode("browser");
//        RegisteredClient client = RegisteredClient.withId("browser")
//                .clientId("browser")
//                .clientSecret(encodedSecret)
//                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_POST)
//                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
//                .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
//                .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
//                .redirectUri("http://localhost:4200")
//                .scope(OidcScopes.OPENID)
//                .scope("root")
//                .clientSettings(ClientSettings.builder()
//                        .requireProofKey(false)
//                        // Desativa a exigência de PKCE
//                        .requireProofKey(false)
//                        .requireAuthorizationConsent(false)
//                        .build())
//                .build();
//
//        return new InMemoryRegisteredClientRepository(client);
//    }
//
//    @Bean
//    public JWKSource<SecurityContext> jwkSource() {
//        JWKSet jwkSet = new JWKSet(rsaKey);
//        return (selector, context) -> selector.select(jwkSet);
//    }
//
//    @Bean
//    public JwtDecoder jwtDecoder() throws JOSEException {
//        return NimbusJwtDecoder.withPublicKey(rsaKey.toRSAPublicKey()).build();
//    }
//
//    @Bean
//    public AuthorizationServerSettings authorizationServerSettings() {
//        return AuthorizationServerSettings.builder()
//                .issuer("http://localhost:8080")
//                .build();
//    }
//
//    @Bean
//    @Order(1)
//    public SecurityFilterChain authServerSecurityFilterChain(HttpSecurity http) throws Exception {
//        OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);
//
//        http.getConfigurer(OAuth2AuthorizationServerConfigurer.class)
/// /                .tokenEndpoint(tokenEndpoint -> tokenEndpoint
/// /                        .accessTokenRequestConverter(new DelegatingAuthenticationConverter(
/// /                                Arrays.asList(
/// /                                        new OAuth2AuthorizationCodeAuthenticationConverter(),
/// /                                        new OAuth2RefreshTokenAuthenticationConverter(),
/// /                                        new OAuth2ClientCredentialsAuthenticationConverter()
/// /                                )
/// /                        ))
/// /                        .accessTokenRequestConverters(configurer -> {
/// /                            configurer.addAll(Arrays.asList(
/// /                                    new OAuth2AuthorizationCodeAuthenticationConverter(),
/// /                                    new OAuth2RefreshTokenAuthenticationConverter(),
/// /                                    new OAuth2ClientCredentialsAuthenticationConverter()
/// /                            ));
/// /                        })
/// /                )
//                .oidc(Customizer.withDefaults());
//
//        http
//                .exceptionHandling((exceptions) -> exceptions
//                        .authenticationEntryPoint(new LoginUrlAuthenticationEntryPoint("/login"))
//                )
//                .cors(Customizer.withDefaults())
//                .csrf(csrf -> csrf.ignoringRequestMatchers("/oauth2/token")); // Desabilitar CSRF para o endpoint de token
//
//
//        return http.build();
//    }
//
//    // Provedor personalizado para autenticação de cliente
//    static class ClientAuthenticationProvider implements AuthenticationProvider {
//        @Override
//        public Authentication authenticate(Authentication authentication) {
//            // Sempre autenticar o cliente se ele existir no seu repositório
//            if (authentication.getName().equals("browser")) {
//                return new OAuth2ClientAuthenticationToken(
//
//                        RegisteredClient.withId("browser")
//                                .clientId("browser")
//                                .clientSecret("$2a$12$ILW56I/ajyGEKU2SlIABremEL73qzqq.BKtg7yHZ6vfVJM1MBGU.q")
//                                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_POST)
//                                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
//                                .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
//                                .authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
//                                .redirectUri("http://localhost:4200")
//                                .scope(OidcScopes.OPENID)
//                                .scope("root")
//                                .clientSettings(ClientSettings.builder()
//                                        .requireProofKey(false)
//                                        // Desativa a exigência de PKCE
//                                        .requireProofKey(false)
//                                        .requireAuthorizationConsent(false)
//                                        .build())
//                                .build(),
//
//
//                        ClientAuthenticationMethod.CLIENT_SECRET_POST, null);
//            }
//            return null;
//        }
//
//        @Override
//        public boolean supports(Class<?> authentication) {
//            return OAuth2ClientAuthenticationToken.class.isAssignableFrom(authentication);
//        }
//    }
//
//    @Bean
//    @Order(2)
//    public SecurityFilterChain appSecurityFilterChain(HttpSecurity http) throws Exception {
//        http.formLogin(Customizer.withDefaults())
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/login", "/error", "/oauth2/token").permitAll()
//                        .anyRequest().permitAll()
//                )
//                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
//                .cors(Customizer.withDefaults());
//
//        return http.build();
//    }
//
//    @Bean
//    public UserDetailsService userDetailsService(UserRepository userRepository) {
//        return username -> userRepository.findByUsername(username).orElseThrow();
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(
//            AuthenticationConfiguration authenticationConfiguration) throws Exception {
//        return authenticationConfiguration.getAuthenticationManager();
//    }
//
//
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With"));
//        configuration.setAllowCredentials(true);
//        configuration.setMaxAge(3600L);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
//}

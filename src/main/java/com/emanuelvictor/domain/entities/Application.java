package com.emanuelvictor.domain.entities;

import com.emanuelvictor.application.converters.StringSetConverter;
import com.emanuelvictor.domain.entities.generic.PersistentEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import java.util.Set;

/**
 *
 */
@Entity
@ToString
@EqualsAndHashCode(callSuper = true)
@JsonIgnoreProperties({"authorities"})
public class Application extends PersistentEntity {

    /**
     *
     */
    public static final String DEFAULT_PASSWORD = "!ApplicationDefaultPassword0*";

    /**
     * Corresponds to the clientId
     */
    @Getter
    @Setter
    @NotBlank(message = "A client id must be informed")
    @Column(name = "client_id", length = 45, nullable = false)
    private String clientId;

    /**
     *
     */
    @Getter
    @Setter
    @NotBlank(message = "A client secret must be informed")
    @Column(name = "client_secret", length = 90, nullable = false)
    private String clientSecret;

    /**
     *
     */
    @Getter
    @Setter
    @Column(name = "revoke_token_url")
    private String revokeTokenUrl;

    /**
     *
     */
    @Getter
    @Setter
    @ManyToOne(optional = false)
    private Group group;

    /**
     *
     */
    @Getter
    @Setter
    @Column
    @Convert(converter = StringSetConverter.class)
    private Set<String> registeredRedirectUri;

    /**
     *
     */
    @Getter
    @Setter
    @Column
    @Convert(converter = StringSetConverter.class)
    private Set<String> resourceIds;

    /**
     *
     */
    @Getter
    @Setter
    @Column
    @Convert(converter = StringSetConverter.class)
    private Set<String> authorizedGrantTypes;

    /**
     *
     */
    @Getter
    @Setter
    @Column(nullable = false)
    private boolean secretRequired;

    /**
     *
     */
    @Getter
    @Setter
    @Column(nullable = false)
    private boolean scoped;

    /**
     *
     */
    @Getter
    @Setter
    @Column(nullable = false)
    private Integer accessTokenValiditySeconds = 60000;

    /**
     *
     */
    @Getter
    @Setter
    @Column(nullable = false)
    private Integer refreshTokenValiditySeconds = 999999999;

    /**
     *
     */
    public Application() {
    }

//    /**
//     * @return Set<String>
//     */
//    @Override
//    public Set<String> getScope() {
//        return this.group.getgroupPermissions().stream().map(groupPermission -> groupPermission.getPermission().getAuthority()).collect(Collectors.toSet());
//    }
//
//    /**
//     * @return Collection<GrantedAuthority>
//     */
//    @Override
//    public Collection<GrantedAuthority> getAuthorities() {
//        return this.group.getgroupPermissions().stream().map(groupPermission::getPermission).distinct().collect(Collectors.toList());
//    }

}

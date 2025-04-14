package com.emanuelvictor.accessmanager.application.resource;

import com.emanuelvictor.accessmanager.domain.entities.User;
import com.emanuelvictor.accessmanager.domain.repositories.UserRepository;
import com.emanuelvictor.common.application.context.ContextHolder;
import com.emanuelvictor.common.application.i18n.MessageSourceHolder;
import com.emanuelvictor.common.infrastructure.aid.StandaloneBeanValidation;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;
import java.util.Optional;

/**
 *
 */
@Transactional
@RestController
@RequiredArgsConstructor
@RequestMapping("api/access-manager/users")
public class UserResource {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * @param defaultFilter String
     * @param enableFilter  Boolean
     * @param pageable      Pageable
     * @return Page<User>
     */
    @GetMapping
    @PreAuthorize("hasAnyAuthority('root.access-manager.users.read','root.access-manager.users','root.access-manager','root')")
    public Page<User> listByFilters(final String defaultFilter, final Boolean enableFilter, final Pageable pageable) {
        return userRepository.listByFilters(defaultFilter, enableFilter, pageable);
    }

    /**
     * @param id long
     * @return User
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('root.access-manager.users.read','root.access-manager.users','root.access-manager','root')")
    public User findById(@PathVariable final long id) {
        return userRepository.findById(id).orElseThrow();
    }

    /**
     * @param user User
     * @return User
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyAuthority('root.access-manager.users.create','root.access-manager.users','root.access-manager','root')")
    public User save(@RequestBody final User user) {
        user.setPassword(passwordEncoder.encode(User.DEFAULT_PASSWORD));
        return userRepository.save(user);
    }

    /**
     * @param id   long
     * @param user User
     * @return User
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('root.access-manager.users.update','root.access-manager.users','root.access-manager','root')")
    public User update(@PathVariable final long id, @RequestBody final User user) {
        user.setId(id);

        final User userSaved = userRepository.findById(user.getId())
                .orElseThrow(() -> new IllegalArgumentException(MessageSourceHolder.getMessage("repository.notFoundById", user.getId())));

        user.setPassword(userSaved.getPassword());

        return userRepository.saveAndFlush(user);
    }

    /**
     * @param id {long}
     * @return boolean
     */
    @PutMapping("/enable")
    @PreAuthorize("hasAnyAuthority('root.access-manager.users.update.activate','root.access-manager.users.update','root.access-manager.users','root.access-manager','root')")
    public boolean enable(@RequestBody final long id) {

        final User userSaved = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(MessageSourceHolder.getMessage("repository.notFoundById", id)));

        Assert.notNull(userSaved, MessageSourceHolder.getMessage("repository.notFoundById", id));

        userSaved.setEnabled(!userSaved.getEnabled());

        return userRepository.save(userSaved).isEnabled();
    }

    /**
     * @param id Long
     */
    @PutMapping("/update-password/{id}")
    @PreAuthorize("hasAnyAuthority('root.access-manager.users.update.change-password','root.access-manager.users.update','root.access-manager.users','root.access-manager','root')")
    public void updatePassword(@PathVariable final long id, final HttpServletRequest request) {
        final String currentPassword = request.getParameter("actualPassword");
        final String newPassword = request.getParameter("newPassword");

        final User authenticatedUser = ContextHolder.getAuthenticatedUser();

        Assert.isTrue(authenticatedUser.getId().equals(id), MessageSourceHolder.getMessage("security.accessDenied"));
        final User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(MessageSourceHolder.getMessage("repository.notFoundById", id)));

        Assert.notNull(currentPassword, "A senha atual não pode ser vazia.");
        Assert.notNull(newPassword, "A nova senha não pode ser vazia.");

        Assert.isTrue(BCrypt.checkpw(currentPassword, user.getPassword()), "A senha atual está incorreta.");

        //somente para fins de validação, sem econdar a senha
        user.setPassword(newPassword);
        StandaloneBeanValidation.validate(user);

        user.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(user);
    }

    /**
     * TODO sem permissionamento
     *
     * @return UserDetails
     */
    @GetMapping("{username}/username") // TODO mudar para load
    public Optional<User> loadUserByUsername(@PathVariable final String username) {
        return userRepository.findByUsername(username);
    }

    /**
     * @param userId      long
     * @param newPassword String
     * @return User
     */
    @GetMapping("{userId}/change-password")
    @PreAuthorize("hasAnyAuthority('root.access-manager.users.update.change-password','root.access-manager.users.update','root.access-manager.users','root.access-manager','root')")
    User changePassword(@PathVariable final long userId, @RequestParam final String newPassword) {
        final User user = userRepository.findById(userId).orElse(null);
        Objects.requireNonNull(user).setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return user;
    }
}
package com.emanuelvictor.tenants.domain;

import com.emanuelvictor.SpringBootTests;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.UUID;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

@DisplayNameGeneration(SpringBootTests.HandlerCamelCaseNameFromClasses.class)
class AccountTests {

    static private final String TENANT_SCHEMA = "login@login.com";

    @Test
    void shouldCreateOneOwnerAccount() {
        final UUID accountId = UUID.randomUUID();
        final String login = TENANT_SCHEMA;

        final Account account = new Account(accountId, login, TENANT_SCHEMA, Profile.PACKAGE);

        assertEquals(accountId, account.getId());
        assertEquals(TENANT_SCHEMA, account.getTenant());
        assertEquals(login, account.getLogin());
        assertTrue(account.isOwnerOfTenant());
        assertEquals(Profile.MANAGER, account.getProfile());
    }

    @Test
    void shouldCreateOneAccountThatBelongsToTenantButIsASeller() {
        final UUID accountId = UUID.randomUUID();
        final String login = "test_login";

        final Account account = new Account(accountId, login, TENANT_SCHEMA, Profile.SELLER);

        assertEquals(accountId, account.getId());
        assertEquals(TENANT_SCHEMA, account.getTenant());
        assertEquals(login, account.getLogin());
        assertFalse(account.isOwnerOfTenant());
        assertEquals(Profile.SELLER, account.getProfile());
    }

    @Test
    void shouldCreateOneAccountThatBelongsToTenantButIsAPackage() {
        final UUID accountId = UUID.randomUUID();
        final String login = "test_login";

        final Account account = new Account(accountId, login, TENANT_SCHEMA, Profile.PACKAGE);

        assertEquals(accountId, account.getId());
        assertEquals(TENANT_SCHEMA, account.getTenant());
        assertEquals(login, account.getLogin());
        assertFalse(account.isOwnerOfTenant());
        assertEquals(Profile.PACKAGE, account.getProfile());
    }

    @Test
    void shouldCreateAccountWithoutId() {
        final Account account = new Account("test_login", TENANT_SCHEMA, Profile.PACKAGE);

        assertNotNull(account.getId());
    }

    @ParameterizedTest
    @MethodSource("provideInvalidArgumentsForAccount")
    void shouldThrowExceptionForInvalidArguments(UUID accountId, String login, String tenant, Profile profile, String expectedMessage) {
        final var exception = assertThrows(RuntimeException.class, () -> new Account(accountId, login, tenant, profile));

        assertEquals(expectedMessage, exception.getMessage());
    }

    private static Stream<Arguments> provideInvalidArgumentsForAccount() {
        return Stream.of(
                Arguments.of(null, "test_login", TENANT_SCHEMA, Profile.PACKAGE, "The Id of Account of Account is required"),
                Arguments.of(UUID.randomUUID(), null, TENANT_SCHEMA, Profile.PACKAGE, "The Login of Account is required"),
                Arguments.of(UUID.randomUUID(), "test_login", null, Profile.PACKAGE, "The Tenant of Account is required"),
                Arguments.of(UUID.randomUUID(), "test_login", TENANT_SCHEMA, null, "The Profile of Account is required")
        );
    }
}
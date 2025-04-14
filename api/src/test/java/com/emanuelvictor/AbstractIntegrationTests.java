package com.emanuelvictor;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.InternetProtocol;
import org.testcontainers.utility.DockerImageName;

import java.lang.reflect.Method;
import java.util.Collections;

@SpringBootTest
@AutoConfigureMockMvc
@Sql("/datasets/truncate_all_tables.sql")
@DisplayNameGeneration(AbstractIntegrationTests.HandlerCamelCaseNameFromClasses.class)
public abstract class AbstractIntegrationTests {

    public AbstractIntegrationTests() {
        final GenericContainer<?> postgres = new GenericContainer<>(DockerImageName.parse("postgres:13.2-alpine"))
                .withEnv("POSTGRES_USER", "erp")
                .withEnv("POSTGRES_PASSWORD", "erp")
                .withEnv("POSTGRES_DB", "erp");
        postgres.setPortBindings(Collections.singletonList(String.format("%d:%d/%s", 5433, 5432, InternetProtocol.TCP.toDockerNotation())));
        try {
            postgres.start();
        } catch (final Exception ignore) {
        }
    }

    public static class HandlerCamelCaseNameFromClasses extends DisplayNameGenerator.Standard {

        @Override
        public String generateDisplayNameForClass(Class<?> classeDeTeste) {
            return substituirCamelCase(super.generateDisplayNameForClass(classeDeTeste));
        }

        @Override
        public String generateDisplayNameForNestedClass(Class<?> classesFilhas) {
            return substituirCamelCase(super.generateDisplayNameForNestedClass(classesFilhas));
        }

        @Override
        public String generateDisplayNameForMethod(Class<?> testeDeClasse, Method testeDoMetodo) {
            return substituirCamelCase(testeDoMetodo.getName()) +
                    DisplayNameGenerator.parameterTypesAsString(testeDoMetodo);
        }

        private static String substituirCamelCase(String classeOuMetodoEmCamelCase) {
            StringBuilder resultado = new StringBuilder();
            resultado.append(classeOuMetodoEmCamelCase.charAt(0));
            for (int i = 1; i < classeOuMetodoEmCamelCase.length(); i++) {
                if (Character.isUpperCase(classeOuMetodoEmCamelCase.charAt(i))) {
                    resultado.append(' ');
                    resultado.append(Character.toLowerCase(classeOuMetodoEmCamelCase.charAt(i)));
                } else {
                    resultado.append(classeOuMetodoEmCamelCase.charAt(i));
                }
            }
            return resultado.toString();
        }
    }
}

package com.emanuelvictor.infrastructure.jpa.function;

import org.hibernate.query.ReturnableType;
import org.hibernate.query.spi.QueryEngine;
import org.hibernate.query.sqm.function.AbstractSqmFunctionDescriptor;
import org.hibernate.query.sqm.function.SelfRenderingSqmFunction;
import org.hibernate.query.sqm.produce.function.ArgumentsValidator;
import org.hibernate.query.sqm.produce.function.FunctionReturnTypeResolver;
import org.hibernate.query.sqm.tree.SqmTypedNode;
import org.hibernate.query.sqm.tree.expression.SqmCastTarget;
import org.hibernate.type.StandardBasicTypes;

import java.util.List;

import static java.util.Arrays.asList;

public class CastBoolEmulation
        extends AbstractSqmFunctionDescriptor {

    protected CastBoolEmulation(
            String name,
            ArgumentsValidator argumentsValidator,
            FunctionReturnTypeResolver returnTypeResolver) {
        super(name, argumentsValidator, returnTypeResolver, null);
    }

    @Override
    protected <T> SelfRenderingSqmFunction<T> generateSqmFunctionExpression(
            List<? extends SqmTypedNode<?>> arguments,
            ReturnableType<T> impliedResultType,
            QueryEngine queryEngine) {
        final SqmTypedNode<?> argument = arguments.get(0);
        return queryEngine.getSqmFunctionRegistry().findFunctionDescriptor("cast")
                .generateSqmExpression(
                        asList(
                                argument,
                                new SqmCastTarget<>(
                                        queryEngine.getTypeConfiguration().getBasicTypeRegistry().resolve(StandardBasicTypes.BOOLEAN),
                                        queryEngine.getCriteriaBuilder()
                                )
                        ),
                        impliedResultType,
                        queryEngine
                );
    }
}


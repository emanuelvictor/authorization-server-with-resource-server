package com.emanuelvictor.infrastructure.jpa.function;

import org.hibernate.dialect.function.CastStrEmulation;
import org.hibernate.query.ReturnableType;
import org.hibernate.query.spi.QueryEngine;
import org.hibernate.query.sqm.function.FunctionRenderer;
import org.hibernate.query.sqm.function.FunctionRenderingSupport;
import org.hibernate.query.sqm.function.SelfRenderingSqmFunction;
import org.hibernate.query.sqm.produce.function.StandardArgumentsValidators;
import org.hibernate.query.sqm.produce.function.StandardFunctionReturnTypeResolvers;
import org.hibernate.query.sqm.tree.SqmTypedNode;
import org.hibernate.sql.ast.SqlAstTranslator;
import org.hibernate.sql.ast.spi.SqlAppender;
import org.hibernate.sql.ast.tree.SqlAstNode;
import org.hibernate.type.StandardBasicTypes;
import org.hibernate.type.spi.TypeConfiguration;

import java.util.List;


public class SQLFilterFunction extends CastBoolEmulation implements FunctionRenderer {

    public SQLFilterFunction(TypeConfiguration typeConfiguration) {
        super(
                "filter",
                StandardArgumentsValidators.between( 1, 3 ),
                StandardFunctionReturnTypeResolvers.invariant(
                        typeConfiguration.getBasicTypeRegistry().resolve( StandardBasicTypes.BOOLEAN )
                )
        );
    }

    @Override
    public void render(SqlAppender sqlAppender, List<? extends SqlAstNode> sqlAstArguments, ReturnableType<?> returnType, SqlAstTranslator<?> walker) {
        sqlAppender.appendSql( "FILTER(" );
        sqlAstArguments.get( 0 ).accept( walker );
        for ( int i = 1; i < sqlAstArguments.size(); i++ ) {
            sqlAppender.appendSql( ',' );
            sqlAstArguments.get( i ).accept( walker );
        }
        sqlAppender.appendSql( ')' );
    }

//    @Override
//    protected <T> SelfRenderingSqmFunction<T> generateSqmFunctionExpression(
//            List<? extends SqmTypedNode<?>> arguments,
//            ReturnableType<T> impliedResultType,
//            QueryEngine queryEngine,
//            TypeConfiguration typeConfiguration) {
//        if ( arguments.size() == 1 ) {
//            return super.generateSqmFunctionExpression(
//                    arguments,
//                    impliedResultType,
//                    queryEngine,
//                    typeConfiguration
//            );
//        }
//
//        return new SelfRenderingSqmFunction<>(
//                this,
//                this,
//                arguments,
//                impliedResultType,
//                getArgumentsValidator(),
//                getReturnTypeResolver(),
//                queryEngine.getCriteriaBuilder(),
//                getName()
//        );
//    }
//
//
//
//    @Override
//    public void render(SqlAppender sqlAppender, List<? extends SqlAstNode> arguments, SqlAstTranslator<?> walker) {
//        sqlAppender.appendSql( "FILTER(" );
//        arguments.get( 0 ).accept( walker );
//        for ( int i = 1; i < arguments.size(); i++ ) {
//            sqlAppender.appendSql( ',' );
//            arguments.get( i ).accept( walker );
//        }
//        sqlAppender.appendSql( ')' );
//    }


//    public String render(final Type firstArgumentType, final List arguments, final SessionFactoryImplementor factory) throws QueryException {
//        final String query = this.renderCast((String) arguments.get(0));
//        final List<String> fields = (List<String>) arguments.stream().skip(1)
//                .map(field -> this.renderCast((String) field))
//                .collect(Collectors.toList());
//
//        return String.format("FILTER(%s, %s)", query, String.join(", ", fields));
//    }
//
//    /**
//     * @param field String
//     * @return String
//     */
//    private String renderCast(final String field) {
//        return String.format("cast(%s as text)", field);
//    }
}

package com.emanuelvictor.tenants.application.primaries;

@FunctionalInterface
public interface UserCase<Input, Output> {

    Output execute(Input input);
}

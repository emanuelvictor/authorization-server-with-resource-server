package com.emanuelvictor.common.application.adapters;

@FunctionalInterface
public interface UseCase<Input, Output> {
    Output execute(Input input);
}

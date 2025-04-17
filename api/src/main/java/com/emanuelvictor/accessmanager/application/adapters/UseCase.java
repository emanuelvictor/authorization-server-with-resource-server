package com.emanuelvictor.accessmanager.application.adapters;

@FunctionalInterface
public interface UseCase<Input, Output> {
    Output execute(Input input);
}

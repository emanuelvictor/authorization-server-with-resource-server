package com.emanuelvictor.accessmanager.application.adapters;

@FunctionalInterface
public interface NullaryUseCase<Output> {
    Output execute();
}

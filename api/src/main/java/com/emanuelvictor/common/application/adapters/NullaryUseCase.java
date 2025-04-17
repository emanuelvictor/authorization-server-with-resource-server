package com.emanuelvictor.common.application.adapters;

@FunctionalInterface
public interface NullaryUseCase<Output> {
    Output execute();
}

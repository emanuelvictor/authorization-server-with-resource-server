package com.emanuelvictor.common.application.adapters;

@FunctionalInterface
public interface UnitUseCase<Input> {
    void execute(Input input);
}

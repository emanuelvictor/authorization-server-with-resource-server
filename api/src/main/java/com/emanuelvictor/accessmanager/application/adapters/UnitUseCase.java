package com.emanuelvictor.accessmanager.application.adapters;

@FunctionalInterface
public interface UnitUseCase<Input> {
    void execute(Input input);
}

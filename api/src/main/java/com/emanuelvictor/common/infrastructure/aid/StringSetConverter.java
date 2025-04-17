package com.emanuelvictor.common.infrastructure.aid;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

@Converter
public class StringSetConverter implements AttributeConverter<Set<String>, String> {

    private static final String SPLIT_CHAR = ";";

    /**
     * @param stringSet Set<String>
     * @return String
     */
    @Override
    public String convertToDatabaseColumn(final Set<String> stringSet) {
        return stringSet == null ? null : String.join(SPLIT_CHAR, stringSet);
    }

    /**
     * @param string String
     * @return Set<String>
     */
    @Override
    public Set<String> convertToEntityAttribute(final String string) {
        return string == null ? null : Arrays.stream(string.split(SPLIT_CHAR)).collect(Collectors.toSet());
    }
}

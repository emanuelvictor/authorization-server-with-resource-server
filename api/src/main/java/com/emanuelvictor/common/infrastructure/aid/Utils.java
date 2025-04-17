package com.emanuelvictor.common.infrastructure.aid;

import java.text.Normalizer;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

public class Utils {

    /**
     *
     */
    private static final String EMPTY = "";

    /**
     *
     */
    public static <T> Set<T> getSetFromArray(T[] array) {
        if (array == null || array.length == 0)
            return null;
        return new HashSet<>(Arrays.asList(array));
    }


    /**
     *
     */
    public static <T> List<T> getListFromArray(T[] array) {
        if (array == null || array.length == 0)
            return null;
        return Arrays.asList(array);
    }

    /**
     * @param schema {String}
     * @return {String}
     */
    public static String removeNoCache(final String schema) {
        if (schema != null && schema.contains("?nocache"))
            return schema.replace(schema.substring(schema.indexOf("?nocache")), "");
        return schema;
    }

    /**
     * @param str {String}
     * @return {String}
     */
    public static String normalizeSymbolsAndAccents(final String str) {
        final String nfdNormalizedString = Normalizer.normalize(defaultString(str), Normalizer.Form.NFD);
        final Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(nfdNormalizedString).replaceAll("");
    }

    /**
     * @param str {String}
     * @return {String}
     */
    private static String defaultString(final String str) {
        return str == null ? EMPTY : str;
    }

}

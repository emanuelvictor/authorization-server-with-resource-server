package com.emanuelvictor.common.infrastructure.i18n;

import org.springframework.context.support.ReloadableResourceBundleMessageSource;

import java.util.Locale;
import java.util.Properties;

/**
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 1.0.0, 10/09/2019
 */
public class ResourceBundleMessageSource extends ReloadableResourceBundleMessageSource {

    /**
     *
     */
    public ResourceBundleMessageSource() {
        MessageSourceHolder.setMessageSource(this);
    }

    /**
     * @param locale Locale
     * @return Properties
     */
    public Properties getProperties(final Locale locale) {
        super.clearCacheIncludingAncestors();

        final PropertiesHolder propertiesHolder = super.getMergedProperties(locale);
        return propertiesHolder.getProperties();
    }
}

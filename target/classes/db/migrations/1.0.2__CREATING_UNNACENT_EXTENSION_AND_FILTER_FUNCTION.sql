CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA pg_catalog;

--
-- -- TOC entry 2174 (class 0 OID 0)
-- -- Dependencies: 1
-- -- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner:
-- --
--
-- COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


CREATE OR REPLACE FUNCTION filter(needles text, VARIADIC haystacks text [])
    RETURNS boolean AS $$
SELECT needles IS NULL OR trim(needles) = '' OR EXISTS(
        SELECT DISTINCT 1
        FROM unnest(haystacks) haystack,
             unnest(string_to_array(needles, ',')) needle
        WHERE unaccent(haystack) ILIKE '%' || unaccent(needle) || '%');
$$ LANGUAGE SQL;
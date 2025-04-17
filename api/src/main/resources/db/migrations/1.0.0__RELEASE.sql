CREATE TABLE IF NOT EXISTS "group" (
                                     id bigint NOT NULL,
                                     internal boolean NOT NULL,
                                     created_on timestamp without time zone NOT NULL,
                                     updated_on timestamp without time zone,
                                     name character varying(50) NOT NULL
);

ALTER TABLE "group" OWNER TO "erp";

ALTER TABLE "group" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME group_id_seq
START WITH 1
          INCREMENT BY 1
          NO MINVALUE
          NO MAXVALUE
          CACHE 1
          );

CREATE TABLE IF NOT EXISTS tenant (
                              id bigint NOT NULL,
                              created_on timestamp without time zone NOT NULL,
                              updated_on timestamp without time zone,
                              identification character varying(150) NOT NULL
);

ALTER TABLE tenant OWNER TO "erp";

ALTER TABLE tenant ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME tenant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    );

CREATE TABLE IF NOT EXISTS group_permission (
                                                id bigint NOT NULL,
                                                created_on timestamp without time zone NOT NULL,
                                                updated_on timestamp without time zone,
                                                group_permission_id bigint NOT NULL,
                                                permission_id bigint NOT NULL
);


ALTER TABLE group_permission OWNER TO "erp";

ALTER TABLE group_permission ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME group_permission_id_seq
START WITH 1
          INCREMENT BY 1
          NO MINVALUE
          NO MAXVALUE
          CACHE 1
          );

CREATE TABLE IF NOT EXISTS permission (
                                   id bigint NOT NULL,
                                   created_on timestamp without time zone NOT NULL,
                                   updated_on timestamp without time zone,
                                   authority character varying(255) NOT NULL,
                                   name character varying(255) NOT NULL,
                                   description character varying(255),
                                   upper_permission_id bigint
);


ALTER TABLE permission OWNER TO "erp";

ALTER TABLE permission ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME permission_id_seq
START WITH 1
          INCREMENT BY 1
          NO MINVALUE
          NO MAXVALUE
          CACHE 1
          );

CREATE TABLE IF NOT EXISTS revisions (
                                  id bigint NOT NULL,
                                  created_by character varying(45) NOT NULL,
                                  created_on timestamp without time zone NOT NULL
);


ALTER TABLE revisions OWNER TO "erp";

ALTER TABLE revisions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME revisions_id_seq
START WITH 1
          INCREMENT BY 1
          NO MINVALUE
          NO MAXVALUE
          CACHE 1
          );

CREATE TABLE IF NOT EXISTS "user" (
                               id bigint NOT NULL,
                               created_on timestamp without time zone NOT NULL,
                               updated_on timestamp without time zone,
                               enabled boolean NOT NULL,
                               locked boolean NOT NULL,
                               name character varying(250) NOT NULL,
                               password character varying(100) NOT NULL,
                               username character varying(150) NOT NULL,
                               tenant_id bigint,
                               group_id bigint NOT NULL
);


ALTER TABLE "user" OWNER TO "erp";

ALTER TABLE "user" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME user_id_seq
START WITH 1
          INCREMENT BY 1
          NO MINVALUE
          NO MAXVALUE
          CACHE 1
          );

ALTER TABLE ONLY group_permission
    ADD CONSTRAINT group_permission_pkey PRIMARY KEY (id);

ALTER TABLE ONLY "group"
    ADD CONSTRAINT group_pkey PRIMARY KEY (id);

ALTER TABLE ONLY tenant
    ADD CONSTRAINT tenant_pkey PRIMARY KEY (id);

ALTER TABLE ONLY permission
    ADD CONSTRAINT permission_pkey PRIMARY KEY (id);

ALTER TABLE ONLY revisions
    ADD CONSTRAINT revisions_pkey PRIMARY KEY (id);

ALTER TABLE ONLY "group"
    ADD CONSTRAINT uk_group_name UNIQUE (name);

ALTER TABLE ONLY group_permission
    ADD CONSTRAINT uk_group_permission UNIQUE (group_permission_id, permission_id);

ALTER TABLE ONLY permission
    ADD CONSTRAINT uk_permission_authority UNIQUE (authority);

ALTER TABLE ONLY "user"
    ADD CONSTRAINT uk_user_username UNIQUE (username);

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);

ALTER TABLE ONLY group_permission
    ADD CONSTRAINT fk_group_permission_group FOREIGN KEY (group_permission_id) REFERENCES "group"(id);

ALTER TABLE ONLY group_permission
    ADD CONSTRAINT fk_group_permission_permission FOREIGN KEY (permission_id) REFERENCES permission(id);

ALTER TABLE ONLY permission
    ADD CONSTRAINT fk_permission_permission FOREIGN KEY (upper_permission_id) REFERENCES permission(id);

ALTER TABLE ONLY "user"
    ADD CONSTRAINT fk_user_group FOREIGN KEY (group_id) REFERENCES "group"(id);

ALTER TABLE ONLY "user"
    ADD CONSTRAINT fk_user_tenant FOREIGN KEY (tenant_id) REFERENCES tenant(id);

ALTER TABLE ONLY tenant
    ADD CONSTRAINT uk_tenant_identification UNIQUE (identification);
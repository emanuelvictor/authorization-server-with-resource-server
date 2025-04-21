INSERT INTO "group"(id, created_on, name, internal) values (3, now(), 'Gerente', false);

INSERT INTO group_permission(id, created_on, group_id, permission_id) values (200, now(), 3, 200);
INSERT INTO group_permission(id, created_on, group_id, permission_id) values (201, now(), 3, 300);
INSERT INTO group_permission(id, created_on, group_id, permission_id) values (202, now(), 3, 400);
INSERT INTO group_permission(id, created_on, group_id, permission_id) values (203, now(), 3, 4000);
INSERT INTO "group"(id, created_on, name, internal) values (2, now(), 'Pacote', false);

INSERT INTO group_permission(id, created_on, group_id, permission_id) values (100, now(), 2, 70002);
INSERT INTO group_permission(id, created_on, group_id, permission_id) values (101, now(), 2, 80002);
INSERT INTO group_permission(id, created_on, group_id, permission_id) values (102, now(), 2, 80004);
INSERT INTO group_permission(id, created_on, group_id, permission_id) values (103, now(), 2, 11000);
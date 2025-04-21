INSERT INTO "group"(id, created_on, name, internal) values (4, now(), 'Vendedor', false);

INSERT INTO group_permission(id, created_on, group_id, permission_id) values (300, now(), 4, 300);
INSERT INTO group_permission(id, created_on, group_id, permission_id) values (301, now(), 4, 70002);
INSERT INTO group_permission(id, created_on, group_id, permission_id) values (302, now(), 4, 80002);
INSERT INTO group_permission(id, created_on, group_id, permission_id) values (303, now(), 4, 80004);
INSERT INTO group_permission(id, created_on, group_id, permission_id) values (305, now(), 4, 11000);
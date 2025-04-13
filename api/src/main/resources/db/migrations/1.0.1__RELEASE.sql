INSERT INTO permission(id, created_on, authority, name) VALUES (1, now(), 'root', 'Administração de Sistemas');

INSERT INTO permission(id, created_on, authority, name, upper_permission_id) VALUES (100, now(), 'root.access-manager', 'Gerenciamento de Acessos', 1);

INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (4000, now(), 'root.access-manager.users', 'Usuários', 100);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (40000, now(), 'root.access-manager.users.create', 'Adicionar', 4000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (40001, now(), 'root.access-manager.users.update', 'Alterar', 4000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (40002, now(), 'root.access-manager.users.read', 'Consultar', 4000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (400001, now(), 'root.access-manager.users.update.change-password', 'Alterar senha', 40001);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (400002, now(), 'root.access-manager.users.update.activate', 'Ativar/Desativar', 40001);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (40003, now(), 'root.access-manager.users.delete', 'Remover', 4000);

INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (5000, now(), 'root.access-manager.groups', 'Grupos de Acesso', 100);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (50000, now(), 'root.access-manager.groups.create', 'Adicionar', 5000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (50001, now(), 'root.access-manager.groups.update', 'Alterar', 5000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (50002, now(), 'root.access-manager.groups.read', 'Consultar', 5000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (500001, now(), 'root.access-manager.groups.update.activate', 'Ativar', 50001);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (50003, now(), 'root.access-manager.groups.delete', 'Remover', 5000);

INSERT INTO "group"(id, created_on, name) values (1, now(), 'Root');

INSERT INTO group_permission(id, created_on, group_permission_id, permission_id) values (1, now(), 1, 1);

INSERT INTO "user"(id, created_on, name, username, password, enabled, locked, group_id) VALUES (1, now(),'Admin',  'admin@admin.com', '$2a$12$mTo6JlUbNTNC525MUszZXuU/7hiDZblRdWDesccgdMq80p4DXMiSm', true, false, 1);

INSERT INTO application(id, created_on, client_id, client_secret, group_id, refresh_token_validity_seconds, access_token_validity_seconds, scoped, secret_required, authorized_grant_types, resource_ids, registered_redirect_uri, revoke_token_url) VALUES (1, now(), 'browser', '$2a$12$ILW56I/ajyGEKU2SlIABremEL73qzqq.BKtg7yHZ6vfVJM1MBGU.q', 1,  999999999, 3600, false, false, 'authorization_code;token;refresh_token;client_credentials;password', null, 'http://localhost:8080/test;http://localhost:4200;http://localhost:8084/api/test;http://localhost:8084/api/logged;http://localhost:8080/access-manager/api/logged;http://localhost:8080/access-manager/api/test;http://localhost:8082', null);
INSERT INTO application(id, created_on, client_id, client_secret, group_id, refresh_token_validity_seconds, access_token_validity_seconds, scoped, secret_required, authorized_grant_types, resource_ids, registered_redirect_uri, revoke_token_url) VALUES (2, now(), 'access-manager', '$2a$12$ILW56I/ajyGEKU2SlIABremEL73qzqq.BKtg7yHZ6vfVJM1MBGU.q', 1,  999999999, 3600, false, false, 'authorization_code;token;refresh_token;client_credentials;password', null, 'http://localhost:8080/test;http://localhost:4200;http://localhost:8084/api/test;http://localhost:8084/api/logged;http://localhost:8080/access-manager/api/logged;http://localhost:8080/access-manager/api/test;http://localhost:8082', 'http://localhost:8080/access-manager/tokens/revoke');

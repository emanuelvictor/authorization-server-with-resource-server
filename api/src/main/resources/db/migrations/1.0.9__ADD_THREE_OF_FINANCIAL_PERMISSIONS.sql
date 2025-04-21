INSERT INTO permission(id, created_on, authority, name, upper_permission_id) VALUES (400, now(), 'root.accountability', 'Gerenciamento de Financeiro', 1);

INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (100001, now(), 'root.accountability.entries', 'Lançamentos', 400);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (100002, now(), 'root.accountability.entries.create', 'Adicionar', 100001);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (100003, now(), 'root.accountability.entries.update', 'Alterar', 100001);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (100004, now(), 'root.accountability.entries.update.rectify', 'Retificar', 100003);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (100005, now(), 'root.accountability.entries.update.rectify.reverse', 'Estornar lançamento', 100004);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (100006, now(), 'root.accountability.entries.update.rectify.complements', 'Complementar lançamento', 100004);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (100007, now(), 'root.accountability.entries.update.rectify.transfer', 'Transferir lançamento', 100004);
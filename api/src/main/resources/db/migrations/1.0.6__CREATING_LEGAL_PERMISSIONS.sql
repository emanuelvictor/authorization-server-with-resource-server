INSERT INTO permission(id, created_on, authority, name, upper_permission_id) VALUES (200, now(), 'root.juridico', 'Jurídico', 1);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (8000, now(), 'root.juridico.parecer', 'Parecer jurídico', 200);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (80001, now(), 'root.juridico.parecer.adicionar', 'Adicionar parecer jurídico', 8000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (80002, now(), 'root.juridico.parecer.alterar', 'Alterar parecer jurídico', 8000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (80003, now(), 'root.juridico.parecer.cancelar', 'Cancelar parecer jurídico', 8000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (80004, now(), 'root.juridico.parecer.enviar', 'Enviar parecer jurídico', 8000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (80005, now(), 'root.juridico.parecer.tornarSemEfeito', 'Tornar sem efeito o parecer jurídico', 8000);

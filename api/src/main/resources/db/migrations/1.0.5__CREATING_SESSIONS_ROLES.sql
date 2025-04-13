INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (7000, now(), 'root.access-manager.sessions', 'Sessões', 100);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (70001, now(), 'root.access-manager.sessions.read', 'Consultar', 7000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (70002, now(), 'root.access-manager.sessions.delete', 'Remover', 7000);

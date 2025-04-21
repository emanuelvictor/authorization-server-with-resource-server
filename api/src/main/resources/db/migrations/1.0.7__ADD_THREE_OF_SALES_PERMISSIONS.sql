INSERT INTO permission(id, created_on, authority, name, upper_permission_id) VALUES (300, now(), 'root.sales', 'Gerenciamento de Vendas', 1);

INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (9000, now(), 'root.sales.create', 'Adicionar', 300);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (9003, now(), 'root.sales.cancel', 'Cancelar', 300);
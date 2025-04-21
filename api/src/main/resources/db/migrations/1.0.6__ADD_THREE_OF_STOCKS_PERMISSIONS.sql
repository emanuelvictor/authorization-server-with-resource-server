INSERT INTO permission(id, created_on, authority, name, upper_permission_id) VALUES (200, now(), 'root.stocks', 'Gerenciamento de Estoques', 1);

INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (7000, now(), 'root.stocks.products', 'Produtos', 200);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (70000, now(), 'root.stocks.products.create', 'Adicionar', 7000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (70001, now(), 'root.stocks.products.update', 'Alterar', 7000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (70002, now(), 'root.stocks.products.read', 'Consultar', 7000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (70003, now(), 'root.stocks.products.delete', 'Remover', 7000);

INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (8000, now(), 'root.stocks.stocks', 'Estoques', 200);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (80000, now(), 'root.stocks.stocks.create', 'Adicionar', 8000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (80001, now(), 'root.stocks.stocks.update', 'Alterar', 8000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (80002, now(), 'root.stocks.stocks.read', 'Consultar', 8000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (80003, now(), 'root.stocks.stocks.delete', 'Remover', 8000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (80004, now(), 'root.stocks.stocks.update.remove', 'Retirar produtos em estoque', 80003);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (80005, now(), 'root.stocks.stocks.update.add', 'Adicionar produtos em estoque', 80003);
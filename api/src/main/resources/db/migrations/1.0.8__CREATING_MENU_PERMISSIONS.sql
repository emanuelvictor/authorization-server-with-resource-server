   INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (400, now(), 'root.cardapio', 'Cardápio', 1);
 INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (15000, now(), 'root.cardapio.diaEscolar', 'Dia escolar', 400);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (150001, now(), 'root.cardapio.diaEscolar.adicionar', 'Adicionar dia escolar', 15000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (150002, now(), 'root.cardapio.diaEscolar.remover', 'Remover dia escolar', 15000);

 INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (16000, now(), 'root.cardapio.calendarioEscolar', 'Calendário escolar', 400);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (160001, now(), 'root.cardapio.calendarioEscolar.adicionar', 'Adicionar calendário escolar', 16000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (160002, now(), 'root.cardapio.calendarioEscolar.copiarPreparacoes', 'Copiar preparações', 16000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (160003, now(), 'root.cardapio.calendarioEscolar.finalizar', 'Remover calendário escolar', 16000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (160004, now(), 'root.cardapio.calendarioEscolar.alterar', 'Alterar calendário escolar', 16000);

 INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (17000, now(), 'root.cardapio.receita', 'Receita', 400);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (170001, now(), 'root.cardapio.receita.adicionar', 'Adicionar receita', 17000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (170002, now(), 'root.cardapio.receita.alterar', 'Alterar receita', 17000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (170003, now(), 'root.cardapio.receita.remover', 'Remover receita', 17000);

 INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (18000, now(), 'root.cardapio.regra', 'Regra', 400);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (180001, now(), 'root.cardapio.regra.ativar', 'Ativar regra', 18000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (180002, now(), 'root.cardapio.regra.inativar', 'Inativar regra', 18000);

 INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (19000, now(), 'root.cardapio.preparacao', 'Preparação', 400);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (190001, now(), 'root.cardapio.preparacao.adicionar', 'Adicionar preparação', 19000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (190002, now(), 'root.cardapio.preparacao.alterar', 'Alterar preparação', 19000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (190003, now(), 'root.cardapio.preparacao.remover', 'Remover preparação', 19000);

 INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (20000, now(), 'root.cardapio.preparacaoDoDiaEscolar', 'Preparação do dia escolar', 400);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (200001, now(), 'root.cardapio.preparacaoDoDiaEscolar.adicionar', 'Adicionar preparação do dia escolar', 20000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (200002, now(), 'root.cardapio.preparacaoDoDiaEscolar.remover', 'Remover preparação do dia escolar', 20000);

 INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (21000, now(), 'root.cardapio.matriculaPorPeriodo', 'Matrícula por período', 400);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (210001, now(), 'root.cardapio.matriculaPorPeriodo.alterar', 'Alterar matrícula por período', 21000);

 INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (22000, now(), 'root.cardapio.pesquisaPropria', 'Pesquisa própria', 400);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (220001, now(), 'root.cardapio.pesquisaPropria.adicionar', 'Adicionar pesquisa própria', 22000);

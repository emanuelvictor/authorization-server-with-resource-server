 INSERT INTO permission(id, created_on, authority, name, upper_permission_id) VALUES (300, now(), 'root.prestacao-de-contas', 'Prestação de contas', 1);
 INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (9000, now(), 'root.prestacao-de-contas.parecerDaPrestacaoDeContas', 'Parecer da prestação de contas', 300);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (90001, now(), 'root.prestacao-de-contas.parecerDaPrestacaoDeContas.gerarDocumentoInexistente', 'Gerar documento inexistente', 9000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (90002, now(), 'root.prestacao-de-contas.parecerDaPrestacaoDeContas.adicionar', 'Adicionar parecer da prestação de contas', 9000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (90003, now(), 'root.prestacao-de-contas.parecerDaPrestacaoDeContas.adicionarAnalista', 'Adicionar analista no parecer para prestação de contas', 9000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (90004, now(), 'root.prestacao-de-contas.parecerDaPrestacaoDeContas.adicionarPendencia', 'Adicionar pendência no parecer da prestação de contas', 9000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (90005, now(), 'root.prestacao-de-contas.parecerDaPrestacaoDeContas.alterarPendencia', 'Alterar pendência no parecer da prestação de contas', 9000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (90006, now(), 'root.prestacao-de-contas.parecerDaPrestacaoDeContas.cancelar', 'Cancelar parecer de prestação de contas', 9000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (90007, now(), 'root.prestacao-de-contas.parecerDaPrestacaoDeContas.concluir', 'Concluir parecer de prestação de contas', 9000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (90008, now(), 'root.prestacao-de-contas.parecerDaPrestacaoDeContas.enviar', 'Enviar parecer de prestação de contas', 9000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (90009, now(), 'root.prestacao-de-contas.parecerDaPrestacaoDeContas.informarNumeroDoDespacho', 'Informar número do despacho do parecer de prestação de contas', 9000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (90010, now(), 'root.prestacao-de-contas.parecerDaPrestacaoDeContas.removerPendencia', 'Remover pendência do parecer de prestação de contas', 9000);

 INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (10000, now(), 'root.prestacao-de-contas.prestacaoDeContaParaFnde', 'Pretação de contas para o FNDE', 300);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (100001, now(), 'root.prestacao-de-contas.prestacaoDeContaParaFnde.adicionar', 'Adicionar prestação de contas para o FNDE', 10000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (100002, now(), 'root.prestacao-de-contas.prestacaoDeContaParaFnde.analisarErros', 'Analisar erros na prestação de contas para o FNDE', 10000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (100003, now(), 'root.prestacao-de-contas.prestacaoDeContaParaFnde.informarFalha', 'Informar falha na prestação de contas para o FNDE', 10000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (100004, now(), 'root.prestacao-de-contas.prestacaoDeContaParaFnde.informarSucesso', 'Informar sucesso na prestação de contas para o FNDE', 10000);

 INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (11000, now(), 'root.prestacao-de-contas.prestacaoDeContasParaEntidadeExecutora', 'Pretação de contas para Entidade Executora', 300);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (110001, now(), 'root.prestacao-de-contas.prestacaoDeContasParaEntidadeExecutora.adicionarProcesso', 'Adicionar processo de pretação de contas para Entidade Executora', 11000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (110002, now(), 'root.prestacao-de-contas.prestacaoDeContasParaEntidadeExecutora.alterarDataDeEncerramento', 'Alterar data de encerramento da pretação de contas para Entidade Executora', 11000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (110003, now(), 'root.prestacao-de-contas.prestacaoDeContasParaEntidadeExecutora.alterarProcesso', 'Alterar processo de pretação de contas para Entidade Executora', 11000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (110004, now(), 'root.prestacao-de-contas.prestacaoDeContasParaEntidadeExecutora.removerProcesso', 'Remover processo de pretação de contas para Entidade Executora', 11000);

 INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (12000, now(), 'root.prestacao-de-contas.resolucaoDaPrestacaoDeContas', 'Resolução da prestação de contas', 300);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (120001, now(), 'root.prestacao-de-contas.resolucaoDaPrestacaoDeContas.adicionar', 'Adicionar resolução da prestação de contas', 12000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (120002, now(), 'root.prestacao-de-contas.resolucaoDaPrestacaoDeContas.alterar', 'Alterar resolução da prestação de contas', 12000);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (120003, now(), 'root.prestacao-de-contas.resolucaoDaPrestacaoDeContas.remover', 'Remover resolução da prestação de contas', 12000);

 INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (13000, now(), 'root.prestacao-de-contas.ordemBancaria', 'Ordem Bancária', 300);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (130001, now(), 'root.prestacao-de-contas.ordemBancaria.importar', 'Importar ordem bancária', 13000);

 INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (14000, now(), 'root.prestacao-de-contas.empenho', 'Empenho', 300);
INSERT INTO permission (id, created_on, authority, name, upper_permission_id) VALUES (140001, now(), 'root.prestacao-de-contas.empenho.importar', 'Importar empenho', 14000);

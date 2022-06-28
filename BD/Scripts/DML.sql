USE TesteVaga2RP;
GO

INSERT INTO TipoUsuario(tituloTipoUsuario)
VALUES ('geral'), ('admin'), ('root');
GO


INSERT INTO USUARIO (idTipoUsuario, nome, email, senha, userStatus)
VALUES (1, 'UserGeral', 'usergeral@email.com', '12345678', 1), (2, 'UserAdmin', 'useradmin@email.com', '12345678', 1), (3, 'UserRoot', 'userroot@email.com', '12345678', 1)
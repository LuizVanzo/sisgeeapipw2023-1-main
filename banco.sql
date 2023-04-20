create table marcas (
	codigo serial primary key, 
	nome varchar(40) not null, 
	pais varchar(40) not null 
);

insert into marcas (nome, pais) 
values ('Ford', 'Estados Unidos')
returning codigo, nome, pais;

insert into marcas (nome, pais) 
values ('Honda', 'Japão')
returning codigo, nome, pais;

-- criação da tabela salas
create table modelos (
	codigo serial primary key, 
	nome varchar(40) not null, 
	numero_portas integer not null, 
	lugares integer not null, 
	marca integer not null, 
	foreign key (marca) references marcas (codigo)
);


insert into modelos (nome, numero_portas, lugares, marca) 
values ('ford KA',4,4,1), ('Honda Civic',4,5,2)
returning codigo, nome, numero_portas, lugares, marca;
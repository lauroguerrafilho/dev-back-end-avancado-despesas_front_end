# Meu Front

Este pequeno projeto faz parte da Disciplina **Desenvolvimento Full Stack Básico**.

O objetivo aqui é desenvolver o front-end do sistema

---
## Como executar em modo de desenvolvimento

Basta fazer o download do projeto e abrir o arquivo index.html no seu browser.

## Como executar através do Docker

Certifique-se de ter o [Docker](https://docs.docker.com/engine/install/) instalado e em execução em sua máquina.

Navegue até o diretório que contém o Dockerfile no terminal.
Execute **como administrador** o seguinte comando para construir a imagem Docker:

```
$ docker build -t despesas-front-end .
```

Uma vez criada a imagem, para executar o container basta executar, **como administrador**, seguinte o comando:

```
$ docker run --rm -p 8080:80 despesas-front-end
```

Uma vez executando, para acessar o front-end, basta abrir o [http://localhost:8080/#/](http://localhost:8080/#/) no navegador.

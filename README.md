## ger2

The successor of ger. It used to be my main repository for project that simulates a university registration program. I thought that project was not well designed from the first. So... Here I am creating yet another project just for fun!.

## Getting started

### Required dependencies

You need to install these programs to be able to run the project.

- [fnm](https://github.com/Schniz/fnm) for frontend runtime, install fnm by running
  ```
  brew install fnm
  ```

- [pnpm](https://pnpm.io) for dependency management, install pnpm by running
  ```
  brew install pnpm
  ```
  Make sure that `fnm` is installed before `pnpm`.

- [rustup](https://rustup.rs) for backend development, install rustup by running
  ```
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  ```

- [docker](https://docker.com) for local database, install docker by running
  ```
  brew install --cask docker
  ```

### Viewing database schema

You can easily view the database schema with [schemaspy](https://github.com/schemaspy/schemaspy)

#### Required dependencies

- [openjdk](https://openjdk.org) to run jar file from schemaspy, install schemaspy by running
  ```
  brew install openjdk
  ```

- [graphviz](https://graphviz.org) to create database relationship graph, install graphviz by running
  ```
  brew install graphviz
  ```

Then run this command to get the schemaspy jar file from the release.

```
curl -L https://github.com/schemaspy/schemaspy/releases/download/v6.2.4/schemaspy-6.2.4.jar --output ./schemaspy.jar
```

Run this command to download postgres jdbc driver.

```
curl -L https://jdbc.postgresql.org/download/postgresql-42.7.3.jar --output ./jdbc-driver.jar
```

Make sure the database docker is running, then run this command to generate the schema out as a web.

```
java -jar ./schemaspy.jar -t pgsql -dp ./jdbc-driver.jar -db ger2 -host "127.0.0.1" -port 7321 -u postgres -p postgres -o ./schemaspy
```

# ClimaApp - App de Previsão do Tempo

Um projeto moderno e eficiente para visualização do clima atual, construído com **React** e focado em uma arquitetura limpa, performance otimizada e uma experiência de usuário fluida.

---

## Visão Geral do Projeto

O **ClimaApp** é uma aplicação web de clima que permite ao usuário buscar a previsão do tempo atual de qualquer cidade, exibir um resumo claro das condições (temperatura e vento) e gerenciar uma lista de cidades favoritas com persistência local.

### Principais Funcionalidades

* **Busca de Clima por Cidade:** Pesquisa em tempo real usando a API de Geocoding.
* **Exibição Resumida:** Cartão de resumo do clima atual (temperatura, vento e condição).
* **Gerenciamento de Favoritos:** Adiciona cidades à lista de favoritos, armazenada localmente.
* **Cache Inteligente:** Armazena resultados de busca localmente para evitar chamadas de API repetidas e aumentar a velocidade de carregamento (com expiração de 5 minutos).

---

## Stack Tecnológica e Arquitetura

Este projeto foi construído sobre uma fundação robusta de tecnologias modernas e uma arquitetura bem definida.

### Componentização com Design Atômico

Adotei a metodologia de **Design Atômico** para estruturar os componentes da aplicação, garantindo **reutilização, consistência** e **manutenibilidade** do código.

| Nível | Componentes no Projeto | Descrição |
| :---: | :---: | :--- |
| **Átomos** | `InputText`, `ButtonPrimary` | Elementos básicos de UI, como botões e inputs, que não têm estado próprio ou lógica de domínio. |
| **Moléculas** | `SearchBar`, `WeatherSummaryCard` | Grupos de Átomos trabalhando juntos, como a barra de busca (input + botão). |
| **Organismos** | `WeatherPanel` | Seções complexas da interface, combinando Moléculas e Átomos, contendo a maior parte da lógica e estado da aplicação (busca, favoritos, caching). |
| **Páginas** | `HomePage` | Componentes de nível superior que organizam Organismos para formar a visão final do usuário. |

### Estilização: Tailwind CSS

Utilizei o **Tailwind CSS** para um desenvolvimento ágil e responsivo.

* **Utility-First:** A estilização é aplicada diretamente no JSX através de classes utilitárias, agilizando o desenvolvimento e facilitando a manutenção.

### shadcn/ui

Embora o projeto atual utilize componentes customizados, o conceito da biblioteca **shadcn/ui** (que oferece componentes acessíveis e estilizados baseados em Tailwind) foi uma **influência chave** no design dos nossos próprios átomos, buscando sempre a construção de interfaces elegantes e funcionais.

### Consumo de APIs com HTTPS

Toda a comunicação com serviços externos é feita via **protocolo HTTPS** usando o cliente **Axios**. Isso garante a **segurança** e a **integridade dos dados** trafegados. Meu foco foi em requisições **`GET`** para buscar dados de previsão do tempo, encapsulando a complexidade da API dentro de `services/openMeteo.service.js`.

---

## API de Clima: Open-Meteo

O projeto utiliza a **Open-Meteo**, uma API de código aberto focada em dados meteorológicos.

* **Dados Utilizados:** Estamos consumindo a API para obter o clima **atual** (`getCurrentWeather`) e utilizamos a API de **Geocoding** para traduzir o nome da cidade em coordenadas geográficas (latitude e longitude) necessárias para a busca do clima.
* **Configuração:** Todas as chamadas de clima são configuradas para a **timezone `America/Sao_Paulo`** para garantir a precisão dos dados para o contexto brasileiro.

---

## Testes

Para garantir a qualidade e prevenir regressões, o projeto utiliza o **Vitest** como runner e a **React Testing Library (RTL)** para focar em testes de funcionalidade com base no que era esperado.

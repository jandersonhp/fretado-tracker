# 🚌 Fretado Tracker

[![GitHub Repo Size](https://img.shields.io/github/repo-size/jandersonhp/fretado-tracker)](https://github.com/jandersonhp/fretado-tracker) 
[![GitHub last commit](https://img.shields.io/github/last-commit/jandersonhp/fretado-tracker)](https://github.com/jandersonhp/fretado-tracker) 
[![MIT License](https://img.shields.io/badge/license-MIT-green)](https://github.com/jandersonhp/fretado-tracker/blob/main/LICENSE)

> Projeto de rastreamento em tempo real de ônibus fretado, utilizando **HTML, CSS, JavaScript, Leaflet e Firebase Realtime Database**.  
> Atualização de localização controlada apenas pelo admin.

---

## 🔹 Funcionalidades

- 📍 Mostra a localização do fretado em **tempo real** no mapa.  
- 🚦 Iniciar/Parar rastreamento pelo admin.  
- 🚌 Ícone personalizado do ônibus e **trilha azul** indicando percurso percorrido.  
- 📱 Design **responsivo**, adaptável para desktop e celular.  
- 🔒 Controle de acesso admin via **código secreto** ou **Firebase Auth** (dependendo da versão).  

---

## 🛠 Tecnologias usadas

- **HTML / CSS / JavaScript** – frontend simples e responsivo  
- **[Leaflet](https://leafletjs.com/)** – visualização do mapa e marcador do ônibus  
- **[Firebase Realtime Database](https://firebase.google.com/docs/database)** – armazenamento e atualização da localização  


---

## 🚀 Demo / Deploy

Você pode acessar o site funcionando aqui:  
[🌐 Fretado Tracker Online](https://jandersonhp.github.io/fretado-tracker/)

---

## 🚀 Como usar

1. Abra o site no navegador.

2. **Admin:**  
   - Use o link secreto `?admin=meu123` ou faça login via Firebase Auth para ativar o botão **Iniciar Rastreamento**.  
   - Ao iniciar, sua localização será enviada para o Firebase em tempo real.

3. **Usuário:**  
   - Acesse o site normalmente para **ver a localização do fretado** no mapa.  
   - Não é necessário login.

---

## 🔐 Observações / Segurança

- A API Key do Firebase é pública no código, mas **não permite alterar dados** se as regras de segurança estiverem configuradas corretamente.  
- Apenas o admin pode enviar a localização.  
- Este projeto **não é seguro para uso público sem autenticação**, recomendado para uso interno.  

---

## 🗺 Layout

- Mapa centralizado, responsivo e adaptado para diferentes tamanhos de tela.  
- Botão de iniciar/parar rastreamento visível apenas para o admin.  
- Legenda com ícone de ônibus e explicação do trajeto.

---

## 🌟 Futuras melhorias

- Criar **app mobile** para rastreamento em segundo plano.  
- Implementar **backend seguro** para tornar o projeto público no portfólio.  
- Adicionar **trajetos históricos e logs** do fretado.  
- Melhorias visuais e animações para o mapa e marcador.  

---


---

## 📌 Referências

- [Leaflet Documentation](https://leafletjs.com/)  
- [Firebase Realtime Database Docs](https://firebase.google.com/docs/database)  
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)

---

## ⚖ License

Este projeto está sob a licença MIT. Clique abaixo para acessar:

[![MIT License](https://img.shields.io/badge/license-MIT-green)](https://github.com/jandersonhp/fretado-tracker/blob/main/LICENSE)

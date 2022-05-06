# PG6301 eksamen

[Heroku](https://eskil4152-exam.herokuapp.com)\
[Test coverage](/Test-coverage.png)\
[Github](https://github.com/kristiania-pg6301-2022/pgr6301-exam-eskil4152.git)

## Info
  * For å logge ut må du trykke på loggut knappen og refreshe
  * Registrert bruker: "user" med passord "user"

## Egenutfylling av funksjonelle krav

* [x] Anonyme brukere skal se nyhetsaker når de kommer til nettsiden. Legg inn noen nyhetssaker for å demonstrere
* [x] Når en ny sak publiseres, skal alle brukerne få se den nye saken umiddelbart. Bruk websockets for å sende oppdateringer
  * Kommer med en gang, men ikke gjennom websocket
* [x] Brukere kan logge seg inn. Det anbefales at du implementerer at brukerne logger seg inn med Google, men andre
  mekanismer er også akseptabelt
  * Bruker ikke google/AD
* [ ] En bruker som er logget inn kan se på sin profilside (userinfo fra Google)
* [x] Brukere skal forbli logget inn når de refresher websiden
* [x] En bruker som er logget inn kan klikke på en nyhetssak for å se detaljene om nyhetssaken. Detaljene skal inkludere en
  nyhetskategori, overskrift, tekst og navn på den som publiserte den
  * Er du logget inn, kan du se saker. Kan ikke trykkes på
* [ ] "Redaksjonelle brukere" kan logge seg inn med Active Directory. Det må fungere å logge seg inn med en Active Directory
  på skolens AD ( domain_hint=egms.no )
* [x] Redaksjonelle brukere kan publisere nye nyhetsartikler
  * Innloggede kan publisere saker
* [x] Nyhetsartikkel skal inneholde en kategori valgt fra en nedtrekksliste ( <select> ), tittel ( <input> ) og tekst ( <textarea> )
* [x] Dersom noen allerede har publisert en nyhetsartikkel med samme tittel skal serveren sende HTTP status kode 400 og en
  feilmelding
* [ ] Brukeren skal forhindres fra å sende inn en nyhetsartikkel som mangler kategori, tittel eller tekst
* [x] En redaksjonell bruker skal kunne redigere en artikkel de selv har publisert
  * Har ikke redaksjonelle, men brukere kan bare endre egne saker
* [x] Alle feil fra serves skal presenteres til bruker på en pen måte, med mulighet for brukeren til å prøve igjen

## Egenutfylling av tekniske krav

* [x] Oppsett av package.json, parcel, express, prettier
  * *beskriv eventuelle mangler eller problemer for delvis uttelling*
* [x] React Router
  * *beskriv eventuelle mangler eller problemer for delvis uttelling*
* [x] Express app
  * *beskriv eventuelle mangler eller problemer for delvis uttelling*
* [x] Kommunikasjon mellom frontend (React) og backend (Express)
  * *beskriv eventuelle mangler eller problemer for delvis uttelling*
* [x] Deployment til Heroku
  * *beskriv eventuelle mangler eller problemer for delvis uttelling*
* [x] Bruk av MongoDB
  * *beskriv eventuelle mangler eller problemer for delvis uttelling*
* [ ] OpenID Connect
  * *beskriv eventuelle mangler eller problemer for delvis uttelling*
* [ ] Web Sockets
  * *beskriv eventuelle mangler eller problemer for delvis uttelling*
* [x] Jest med dokumentert testdekning
  * Har tester med testdekning, men ikke funksjonelle tester.

 

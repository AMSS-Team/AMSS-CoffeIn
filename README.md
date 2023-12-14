# CoffeeIn - Analiza Proiectului

## Cuprins
- [Problem Statement](#problem-statement)
- [Objectives](#objectives)
- [Target Group](#target-group)
- [Functional Decomposition](#functional-decomposition)
- [Non-Functional Requirements](#non-functional-requirements)
- [Prioritized Product Backlog](#prioritized-product-backlog)
- [Activity Diagram](#activity-diagram)
- [Definition of Ready (DoR) vs. Definition of Done (DoD)](#definition-of-ready-dor-vs-definition-of-done-dod)

## Problem Statement

În urma unei pandemii care a dus la distanțarea fizică și emoțională a omenirii, dorința de a revedea chipuri familiare este depășită de anxietatea comunicării și de teama de a nu deranja persoanele dragi. Echipa noastră propune o soluție pentru această problemă: o aplicație web care le permite utilizatorilor să își arate locația în timp real și să își dea ”check-in” în diferite locații, menționând ce activități desfășoara, check-in-ul reprezentând o invitație pentru toate persoanele din lista lor de prieteni. Astfel, întâlnirea cu persoane dragi va fi modelată într-o manieră care nimeni nu se va mai simți obligat să organizeze și să inițieze o ieșire în oraș.

## Objectives

* Navigarea pe harta si vizualizarea în timp real a locației prietenilor
* Realizarea unui check-in în locația în care se află utilizatorul
* Generarea de notificări în momentul apariției unui nou check-in
* Vizualizarea în lista de prieteni a activităților pe care aceștia le-au mentionat
* Posibilitatea de a da join la un check-in în cazul în care utilizatorul se află în range
	
Astfel, aplicația se bazează pe augmentarea calității relațiilor utilizatorului, devenind un ajutor pentru comunicare prin funcțiile sale.

## Target Group

Aplicația este destinată utilizatorilor care vor să organizeze mai ușor ieșiri spontane cu prieteni sau familie, fie acestea la o cafea sau la cumpărături. Aplicația se adresează unei multitudini de grupe de vârstă, de la copii la tineri și de la tineri la bătrâni, întrucât mare parte din aceste grupuri de vârstă posedă în prezent telefoane smart.

* În cazul copiilor și al tinerilor, aplicația poate fi un intermediar pentru ieșirile de după ore sau pentru organizarea de grupuri de studiu.
* În cadrul adulților, aceasta poate reprezentă o cale spre o ieșire în oraș, cât și spre o posibilă întâlnire pentru cumpărături, gradinărit etc.
* De asemenea, am identificat o utilitate a acesteia și în cadrul firmelor, atât pentru pauza de masă, cât și pentru organizarea de ”mini-teambuildings” spontane.

## Functional Decomposition

Aplicația propune:
* autentificarea unei persoane - prin google/facebook
* vizualizarea prietenilor pe harta: vizualizarea hărții, marcarea colegilor pe hartă
* vizualizarea prietenilor: lista de prieteni, marcarea prietenilor care și-au dat check-in, prezentarea activităților din check-in
* căutarea unui prieten: vizualizarea în lista de prieteni, vizualizarea pe hartă, adaugarea unui prieten
* realizarea unui check-in: preluarea locației, marcarea ei pe hartă, preluarea activității
* trimiterea de notificări: notificarea tuturor prietenilor la fiecare check-in nou
* join într-un check-in: verificarea locației într-un range, preluarea activității marcate în check-in

![image](https://user-images.githubusercontent.com/72194114/202900766-f922bf91-2c63-4411-adfd-36429f1cae64.png)

## Non-Functional Requirements:
Daca in cadrul 'Functional Decomposition' au fost enumerate functionalitati care definesc ceea ce trebuie sa faca aplicatia, in lista cerintelor non-functionale ( Non-Functional Requirements - NFRs) vom enumera constrangerile care influenteaza modul in care aplicatie face ceea ce este propus sa faca: 
* Compatibility - Aplicatia Web creata de noi este accesibila atat de pe dispozitive de tip desktop cat si de pe dispozitive mobile, ruland pe absolut orice sistem de operare, singura conditie fiind prezenta activa a unei conexiuni la internet.
* Security - Intrucat aplicatia presupune un numar mare de utilizatori, fiecare sesiune web cripteaza datele sensibile ale userului utilizand un protocol de tip HTTPS pentru comunicarea client-server. Tot pentru intarirea securitatii sunt adaugate si formulare de logIn/register protejate impotriva atacurilor prin injectare.
* Maintainability & Manageability - Aplicatia este construita folosind Firebase pentru partea de back-end si Angular pentru front-end , fiind folosite ultimele versiuni alte frameworkurilor, administratorul putand sa rezolve cu usurinta erori si sa mentina toate componentele up-and-running.
* Scalability - Aplicatia stocheaza un numar nelimitat de conturi folosind google cloud si poate avea peste 5000 de utilizatori conectati in acelasi timp, fiind actualizata in timp real si mentinand evidenta tuturor locatiilor distribuite.
* Capacity - Fiind o aplicatie web, spatiul si memoria ocupate pe un sistem de operare variaza in functie de browser-ul folosit  de utilizator.
* Performance - Aplicatia are un timp de raspuns de aproximativ 250 milisecunde, insa poate varia in functie de viteza conexiunii la internet a utilizatorului.

## Prioritized Product Backlog:

#### User Stories:

În calitate de utilizator general, vreau:
- să primesc notificari cu locaţiile cele mai frecventate de mine, pentru a mă asigura că fac alegerea potivită atunci când doresc să ies în oraş;
- să pot crea un nou check-in astfel încât prietenii să mi se poată alătura.

În calitate de student, vreau:
- să am o listă în care îmi pot adăuga prietenii sau persoanele cu care obişnuiesc să ies, pentru a putea vedea mereu dacă aceştia se află in zonă;
- să pot vedea locaţiile actuale ale prietenilor mei atunci când sunt prin preajmă, pentru a mă putea alătura.

În calitate de adult, vreau:
- să am un meniu sugestiv care să îmi permită să folosesc aplicaţia cu rapiditate şi uşurinţă;
- să fiu avertizat cu privire la numărul de persoane din anumite locaţii, pentru a evita zonele aglomerate.

În calitate de business-man, vreau:
- să am o hartă actualizata şi uşor de folosit, pentru a putea găsi cele mai bune locaţii;
- să mă pot conecta cu unul din conturile mele de Google sau Facebook, fară să pierd timp pentru crearea unui cont nou şi memorarea unei parole noi;
- să am certitudinea că datele mele vor rămâne private / nu vor fi vizibile persoanelor din exteriorul cercului de prieteni.

În calitate de părinte, vreau:
- să pot monitoriza locaţiile membrilor familiei (prezenţi şi în lista de prieteni), pentru a mă asigura că sunt mereu în siguranta.


În cadrul aplicaţiei realizate de noi, product backlog este alcătuit din următoarele categorii de cerinţe:

#### Devops - self-explanatory:
* Initializare Hosting
* Configurare conexiune cu Firebase
* Initializare baza de date
* Creare conexiuni sigure folosind HTTPS
#### Live Data Processing - cerinte ce tin de stocarea si transmiterea datelor in timp real:
* Actualizarea constanta a statusurilor utilizatorilor 
* Preluarea si afisarea locatiei in timp real sub forma unui waypoint

#### Check-In & Join services - cerinte ce tin de capacitatea de a crea un check-in intr-o anumita locatie sau de a te alatura altui grup:
* Comunicarea intre utilizatori din aceeasi proximitate
* Trimiterea de join-requests catre utilizatori
* Configurarea unei liste de persoane apropiate / prieteni
* Trimiterea de invitatii de prietenie catre alti utilizatori
* Generarea unui punct de intalnire folosind Maps 


#### Intelligent Picks - cerinte ce includ analizarea si detectarea locatiilor favorite pe baza activitatii recente a utilizatorului:
* Invatarea automata a celor mai frcventate zone ale utilizatorului
* Detectarea timpului mediu petrecut in anumite locatii
* Alertarea utilizatoriilor prin notificari atunci cand e in preajma locatiilor preferate

### Prioritizarea Cerintelor din Backlog

Valoarea unei cerinte reprezinta importanta ei in intreg sistemul aplicatiei web realizata de noi.
Valoarea si Dificultatea unei cerinte poate safie banala ( valoarea 0 sau 1) sau foarte importanta ( valoarea 5).

| Descriere                                                                                             | *Valoare (V) | *Dificultate (D) | Medie (V/D) |
|-------------------------------------------------------------------------------------------------------|--------------|------------------|-------------|
| Sistem de autentificare folosind Google / Facebook                                                    |      5/5     |       4/5        |    4.5      |
| Actualizarea constantă a statusurilor utilizatorului (disponibil / ocupat / gata de o cafea)		|      4/5     |       3/5        |    3.5      |
| Preluarea şi afişarea locaţiei în timp real sub forma unui waypoint                                   |      5/5     |       3/5        |    4.0      |
| Comunicarea între utilizatori din aceeaşi proximitate                                                 |      4/5     |       3/5        |    3.5      |
| Trimiterea de join-requests către utilizatori                                                         |      5/5     |       5/5        |    5.0      |
| Configurarea unei liste de persoane apropiate / prieteni                                              |      4/5     |       4/5        |    4.0      |
| Trimiterea de invitaţii de prietenie către alţi utilizatori                                           |      3/5     |       3/5        |    3.0      |
| Generarea unui punct de întâlnire folosind Maps                                                       |      4/5     |       2/5        |    3.0      |
| Invăţarea automată a celor mai frecventate zone ale utilizatorului                                    |      4/5     |       5/5        |    4.5      |
| Detectarea timpului mediu petrecut în anumite locaţii                                                 |      3/5     |       4/5        |    3.5      |
| Alertarea utilizatorilor prin notificări atunci când se află în preajma locaţiilor preferate          |      3/5     |       3/5        |    3.0      |
| Trimiterea de notificări la primirea unei invitaţii de alăturare într-o locaţie din apropiere         |      2/5     |       3/5        |    2.5      |
| Scalarea automată a hărţii în funcţie de device-ul folosit (dimensiunile ecranului)                   |      5/5     |       4/5        |    4.5      |
| Implementare User Picture Profile                                                                     |      3/5     |       4/5        |    3.5      |

Cerinţele ce alcătuiesc Backlog-ul vor fi implementate în ordine descrescătoare a Mediei din tabelul de mai sus. În cazul punctajelor identice, se vor implementa în ordinea Valorii de importanţă.

## Activity Diagram

![image](https://user-images.githubusercontent.com/72194114/202900892-9f11f80d-d471-40a9-a2dd-e194bb54fa9f.png)

## Definition of Ready (DoR) vs. Definition of Done (DoD)

### Definition of Ready 

Înainte de începerea unui sprint, echipa stabileşte în funcţie de timp şi dificultate ce task-uri urmează să fie incluse. Pentru a avea o ordine şi un sens, cerinţele sunt preluate în ordinea priorităţii din backlog, astfel încât user stories corespunzătoare să fie îndeplinite în sprintul respectiv. Totuşi, pentru a fi siguri că nu vor exista probleme de înțelegere în îndeplinirea task-urilor, este necesar ca user stories să respecte anumite reguli înainte de a fi incluse într-un sprint, adică să ne asigurăm că sunt ”ready”. Pentru aplicaţia noastră, regulile sunt:

1. Toate user stories sunt discutate şi înţelese de toată echipa (sunt clare);
2. Fiecare user story este împărţit în task-uri cât mai mici încât să poată fi realizat cu mai multă uşurinţă (sunt fezabile);
3. Fiecare user story are definit un ”criteriu de acceptare” ce poate fi testat (sunt testabile);
4. Pentru fiecare user story sunt identificate dependinţele sale;
5. Se definesc criterii de performanţă acolo unde este cazul;
6. Se definesc criterii de securitate acolo unde este cazul;
7. Întreaga echipă înţelege cum trebuie să arate un demo al unui user story;
8. Este definită persoana care va valida şi confirma toate user stories.


### Definition of Done
În urma unui sprint, produsul rezultat devine parte din aplicaţia finală. Pentru a fi siguri că task-urile au fost îndeplinite corespunzător şi că produsul este funcţional, vom descrie un alt set de reguli pe care toate user stories trebuie să îl respecte înainte de a fi acceptate. Persoana care le validează trebuie să se asigure împreună cu echipa de dev că regulile sunt respectate pe deplin. Pentru aplicaţia noastră, acestea sunt:

1. Codul este produs, finalizat şi comentat;
2. Codul este documentat prin text sau diagrame;
3. Codul se compilează şi rulează fără erori;
4. Codul este testat cu teste unitare şi le verifică pe toate;
5. Codul este testat în toate mediile în care ar trebui să funcţioneze;
6. Codul îndeplineşte standardele de performanţă stabilite;
7. Task-ul este închis.

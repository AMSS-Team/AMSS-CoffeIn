# CoffeeIn

Frontend: Angular project in [`frontend`](./frontend).
Backend: Firebase + Express in [`backend`](./backend).


## Participanti si contributia fiecaruia:

- Vlad Melisa : Friend_List system ( crearea, salvarea si urmarirea prietenilor intr-o lista dedicata).
- 
- Oprea Ana : Systemul de Checkin : Join la un checkin existent si actualizarea starii / locatiei utilizatorului.
- 
- Rotaru Radu : Systemul de notificari si invite-uri intre prieteni pe baza check-pointurilor deja existente.
- 
- Zabava Claudiu: MAP system si crearea de check-points accesibile prietenilor.

# Analiza Proiectului



În urma unei pandemii care a dus la distanțarea fizică și emoțională a omenirii, dorința de a revedea chipuri familiare este depășită de anxietatea comunicării și de teama de a nu deranja persoanele dragi. Echipa noastră propune o soluție pentru această problemă: o aplicație web care le permite utilizatorilor să își arate locația în timp real și să își dea ”check-in” în diferite locații, menționând ce activități desfășoara, check-in-ul reprezentând o invitație pentru toate persoanele din lista lor de prieteni. Astfel, întâlnirea cu persoane dragi va fi modelată într-o manieră care nimeni nu se va mai simți obligat să organizeze și să inițieze o ieșire în oraș.

## Functionalitati principale

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

## Aplicația propune:
* autentificarea unei persoane - prin google/facebook
* vizualizarea prietenilor pe harta: vizualizarea hărții, marcarea colegilor pe hartă
* vizualizarea prietenilor: lista de prieteni, marcarea prietenilor care și-au dat check-in, prezentarea activităților din check-in
* căutarea unui prieten: vizualizarea în lista de prieteni, vizualizarea pe hartă, adaugarea unui prieten
* realizarea unui check-in: preluarea locației, marcarea ei pe hartă, preluarea activității
* trimiterea de notificări: notificarea tuturor prietenilor la fiecare check-in nou
* join într-un check-in: verificarea locației într-un range, preluarea activității marcate în check-in

![image](https://user-images.githubusercontent.com/72194114/202900766-f922bf91-2c63-4411-adfd-36429f1cae64.png)


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





## Activity Diagram

![image](https://user-images.githubusercontent.com/72194114/202900892-9f11f80d-d471-40a9-a2dd-e194bb54fa9f.png)

## Interaction Diagram for the notification system of the check-in
![WhatsApp Image 2023-12-18 at 22 07 24](https://github.com/AMSS-Team/AMSS-CoffeIn/assets/100606068/8d4b8a27-7b73-4eab-ac0a-24c3119a0163)

## State Diagram for joining check-in
![WhatsApp Image 2023-12-18 at 20 44 52 (1)](https://github.com/AMSS-Team/AMSS-CoffeIn/assets/100606068/002808bf-dd46-49f9-8327-736421b0fbed)

## Interaction Diagram of displaying friends activities
![image](https://github.com/AMSS-Team/AMSS-CoffeIn/assets/100606068/483d1d95-79b0-49f2-9bc3-008631a0b3fa)

## Components Diagram of the application
![Diagrama de componente Melisa drawio](https://github.com/AMSS-Team/AMSS-CoffeIn/assets/79593335/16423082-b973-4d80-bd98-57deb9b68cd5)

## Use-Case Diagram for checking-in
![image](https://github.com/AMSS-Team/AMSS-CoffeIn/assets/100606068/6d02288d-75e2-4aa1-b482-7508279a1d31)

## Components Diagram for Invitations feature
![image](https://github.com/AMSS-Team/AMSS-CoffeIn/assets/94719384/3c60baed-5c31-4e8e-b8b3-267a12be42b2)

## Design patterns

### Middleware design pattern
* Design Pattern-ul Middleware în Express.js se referă la un strat intermediar de procesare, care permite intervenția în ciclul de cerere-răspuns, oferind flexibilitate în manipularea și prelucrarea datelor între primirea unei cereri și trimiterea unui răspuns.
* În cadrul aplicației noastre Express.js, am integrat un middleware de autentificare pentru a asigura securitatea și controlul accesului la resursele protejate. Acest middleware, definit în authMiddleware, este utilizat pentru a verifica tokenurile de autentificare ale utilizatorilor prin Firebase.
* authMiddleware interceptează cererile către server și efectuează următoarele operațiuni:
1. Extragerea tokenului bearer din antetul autorizării cererii prin funcția getBearerToken.
2. Validarea tokenului de autentificare folosind serviciul Firebase Auth prin getAuth().verifyIdToken(token).
3. Permiterea continuării procesării cererii în cazul în care tokenul este valid (next()).
4. Trimiterea unui răspuns cu statusul 401 Unauthorized în cazul în care tokenul lipsește sau este invalid.

### Router design pattern
* Router Pattern-ul în Express.js este fundamental pentru structurarea și organizarea rutei aplicațiilor web. Acesta permite definirea modului în care aplicația răspunde la diverse cereri HTTP, pe baza URL-urilor și a metodelor HTTP. În proiectul nostru, am utilizat acest pattern pentru a gestiona diferite aspecte ale interacțiunii cu utilizatorii, locațiile și notificările.
* Folosim Router Pattern-ul pentru a organiza logic rutele în module separate, fiecare având un scop specific:
1. Gestionarea Utilizatorilor și a Relațiilor lor: Într-unul dintre module, avem rute care permit utilizatorilor să urmărească sau să înceteze urmărirea altor utilizatori, să caute utilizatori și să gestioneze relațiile de urmărire.
2. Check-in-uri și Interacțiuni cu Locații: Un alt modul se ocupă de check-in-uri la diferite locații. Acest modul include rute pentru efectuarea check-in-ului, ștergerea check-in-urilor, listarea check-in-urilor pentru utilizatori specifici și alăturarea la check-in-uri ale altor utilizatori.

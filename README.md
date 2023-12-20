# CoffeeIn - Analiza Proiectului



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

## State Diagram for joining Check-in
![WhatsApp Image 2023-12-18 at 20 44 52 (1)](https://github.com/AMSS-Team/AMSS-CoffeIn/assets/100606068/002808bf-dd46-49f9-8327-736421b0fbed)

## Interaction Diagram of displaying friends activities
![image](https://github.com/AMSS-Team/AMSS-CoffeIn/assets/100606068/483d1d95-79b0-49f2-9bc3-008631a0b3fa)



# Task Master
#### Dette er en full stack web-applikation. Projektet er lavet i forbindelse med eksamen og applikationen er lavet i node.js, svelte og med mysql som database. 
#### Programmet er et task management system, hvor du som bruger kan have din egen profil og tilføje dine egne tasks, se sine tasks, opdatere og slette dem. Længere ned af siden kan du både læse og se billeder af andre features applikationen har.
#### FYI for at kunne køre programmet skal du sætte miljøvariablerne i .env filen.

### Features
- Login & Sign up
- Taks (dit dashboard med tasks)
    - Du kan søge efter task(s), enten ved title, description eller tag
    - Du kan sortere efter due date
- Task (update)
  - Du kan opdatere din task med ny title, description, due date eller du kan sætte den til at være completed
- Task (delete)
   - Vil fjerne din task helt
- Create task
  - Title
  - Description
  - Due data
  - tag
- Statistics
  - Dette er din personlige statestik side, hvor du kan se hvor mange task du har completed vs not completed
  - Når du updatere din task og sætter den til completed, vil den blive vist på denne side
  - Som i Tasks dasboarded vil du have de samme muigheder for at søge og sortere efter dato
  - Hvis du er kommet til at complete en task ved en fejl, kan du altid updatere den og trykke på completed og den vil ryge tilbage til Tasks
- Chat
  - Dette er en meget simple chat function som er sat op med socket.io. Her skrives der ud til alle som er logget på.

<br>
<br>
  
## Tasks
![image](https://github.com/JesperZamora/TaskMaster/assets/113138989/bd9cbb72-63dc-4557-94b3-cc5065469bee)

<br>
<br>

## Update Task
![image](https://github.com/JesperZamora/TaskMaster/assets/113138989/8ce3f402-e554-4063-8caa-cf5d4acd5942)

<br>
<br>

## Søgning efter tag
![image](https://github.com/JesperZamora/TaskMaster/assets/113138989/553af48b-c4a2-42ac-aa18-aba0a924dea7)

<br>
<br>

## Sortering efter dato
![image](https://github.com/JesperZamora/TaskMaster/assets/113138989/874c6bf7-7523-49cf-89c5-b66410fd8d47)

<br>
<br>

## Create Task
![image](https://github.com/JesperZamora/TaskMaster/assets/113138989/24ae12df-2a55-4666-94c2-aad763fc0101)

<br>
<br>

## Statistics
![image](https://github.com/JesperZamora/TaskMaster/assets/113138989/42bd714d-3172-4db4-9308-cfc3365861e3)

<br>
<br>

## Simple chat
![image](https://github.com/JesperZamora/TaskMaster/assets/113138989/e18d4cb8-8bec-492e-b626-c028f77ff2ab)


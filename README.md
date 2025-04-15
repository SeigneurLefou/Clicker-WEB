# Clicker-WEB #
## Fonctionnement du jeu ##
### Produit ###
Les produits sont définient de la sorte :
- **Produit x**
  - Recette : Le nombre de chaque ressources nécessaire pour la fabrication d'un objet
  - Demande (cette valeur augmente le prix donné par les différentes ressources nécessaire à la fabrication)
Le prix de vente d'un produit est défini par la somme des prix des ressources qui la compose multiplié par la valeur de la demande.
#### Produit de base ####
Il y a quatre produits de base que l'on peut fabriquer. Les voici détaillé :
- **Produit 1**
  - Recette : 2 Matière Première 1
  - Demande : 1.2
- **Produit 2**
  - Recette : 2 Matière Première 1 + 1 Matière Première 2
  - Demande : 1.2
- **Produit 3**
  - Recette : 4 Matière Première 2
  - Demande : 1.2
- **Produit 4**
  - Recette : 2 Matière Première 1 + 2 Matière Première 2 + 2 Matière Première 3
  - Demande : 1.2
#### Produit avancé ####
Il y a deux produits avancé que l'on peut fabriquer. La principale différence entre les produits avancées et les produits de base c'est que les produits avancé utilise un ou plusieurs produit de base dans leur fabrication.
- **Produit 5**
  - Recette : 2 Matière Première 3 + 2 Produit 1
  - Demande : 1.2
- **Produit 6**
  - Recette : 1 Matière Première 3 + 2 matière première 3
  - Demande : 1.2
### Matière première ###
Il y a trois matière première achetable. Elles sont défini de la sorte :
- **Matière première x**
  - Prix minimum atteignable : x
  - Prix maximum atteignable : y
  - Prix de base : x
  - Vélocité : y
  - Tendance : z
Le prix de chaque matière première est recalculée toutes les secondes de la manière suivante, on prend le maximum entre le prix minimum atteignable et le prix actuel auquel on enlève la vélocité puis on y ajoute la tendance ce qui nous donne la valeur minimum pour cette génération ; ensuite on prend le minimum entre le prix minimum atteignable et le prix actuel auquel on ajoute la vélocité puis on y ajoute la tendance ce qui nous donne la valeur maximum pour cette génération ; enfin on génère un nombre naturel aléatoire entre ces deux bornes ce qui nous donnes le nouveau prix. On ne peut acheter les matières premières que par paquet de 1000 unités.
- **Matière première 1**
  - Prix minimum atteignable : 60
  - Prix maximum atteignable : 140
  - Prix de base : 100
  - Vélocité : 10
  - Tendance : 0
- **Matière première 2**
  - Prix minimum atteignable : 140
  - Prix maximum atteignable : 260
  - Prix de base : 200
  - Vélocité : 15
  - Tendance : 2
- **Matière première 3**
  - Prix minimum atteignable : 480
  - Prix maximum atteignable : 520
  - Prix de base : 500
  - Vélocité : 5
  - Tendance : -1
### Autoclickers ###
Les autoclickers produisent a intervalle de temps régulier des autoclickers, quand il n'y en a qu'un d'acheter cette intervalle est de 2 secondes mais il diminue au fur et à mesure que des autoclickers sont produits. Cependant les autoclickers subissent l'inflation et à chaque fois qu'un autoclickers est acheté les bornes minimum atteignable et maximum atteignable sont multipliées par la valeur de l'inflation.
Autoclickers :
- Prix minimum atteignable : 4900
- Prix maximum atteignable : 5100
- Prix de base : 5000
- Vélocité : 30
- Tendance : 2
- Inflation : 1.2
### Evènements aléatoire ###
Durant le jeu, à intervalle de temps régulier mais assez long, il va se dérouler un évènement aléatoire ayant pour effet de changer une ou plusieurs tendance de matières premières ainsi que de demande de produit de base. Un évènement rare change le minimum et le maximum du prix des matières premières.
Voici la liste des évènements aléatoire :
- Nom de l'évènement : effet

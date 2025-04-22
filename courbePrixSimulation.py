import matplotlib.pyplot as plt
from random import randint
class Produit:
    def __init__(self, act, ec, v, t):
        self.act = act
        self.pMax = act + ec
        self.pMin = act - ec
        self.v = v
        self.t = t
        self.priceSimu = [act//10]
    def nouveauPrix(self):
        tmp = randint(max((self.act - self.v)+self.t,self.pMin), min(self.pMax, (self.act + self.v)+self.t))
        self.priceSimu.append(tmp//10)
        self.act = tmp
Produit1 = Produit(2000,600,150,10)
for i in range(1000):
    if i == 500:
        Produit1.t = -Produit1.t
    Produit1.nouveauPrix()
plt.plot([i for i in range(len(Produit1.priceSimu))], Produit1.priceSimu)
plt.show()
    
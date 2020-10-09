import os
import random
from os import system, name
os.system("cls")


class Tools():
    def colorText(self, text):
        text = text + "[white][black-background]"
        for color in COLORS:
            text = text.replace("[" + color + "]", COLORS[color])
        return text

    def randomBetween(self, num1, num2):
        return random.randrange(int(num1), int(num2))

    def clear(self):
      if name == 'nt':
         _  = system('cls')
      else:
          _ = system('clear')

COLORS = {
        "black": "\u001b[30;1m",
        "red": "\u001b[31;1m",
        "green": "\u001b[32m",
        "yellow": "\u001b[33;1m",
        "blue": "\u001b[34;1m",
        "magenta": "\u001b[35m",
        "cyan": "\u001b[36m",
        "white": "\u001b[37m",
        "yellow-background": "\u001b[43m",
        "black-background": "\u001b[40m",
        "cyan-background": "\u001b[46;1m",
}







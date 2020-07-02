import os

os.system("cls")
from Tools import *
from Player import *

tool = Tools()
player = Player()
move = ""
computerMove = ""


def start():
    tool.clear()
    player.lives = 3
    player.coins = 0
    print(tool.colorText(
        "[cyan-background]################################################################################"))
    print(tool.colorText(
        "[cyan-background]################################################################################"))
    print(tool.colorText(
        "[cyan-background]###########[black-background]                                                           [cyan-background]##########"))
    print(tool.colorText(
        "[cyan-background]###########[black-background]                                                           [cyan-background]##########"))
    print(tool.colorText(
        "[cyan-background]###########[black-background]             [red]WELCOME TO:  'Rock Paper Scissors'!           [cyan-background][white]##########"))
    print(tool.colorText(
        "[cyan-background]###########[black-background]                                                           [cyan-background]##########"))
    print(tool.colorText(
        "[cyan-background]###########[black-background]            [white]enter your name and click enter                [cyan-background][white]##########"))
    print(tool.colorText(
        "[cyan-background]###########[black-background]                                                           [cyan-background]##########"))
    print(tool.colorText(
        "[cyan-background]################################################################################"))
    print(tool.colorText(
        "[cyan-background]################################################################################"))
    player.name = input(tool.colorText('[red]Name: '))
    play()


def play():
    tool.clear()
    global move
    print(tool.colorText('[red]Please enter a move! (rock, paper, scissors)'))
    move = input(tool.colorText("[green]")).lower()
    while move != "rock" and move != "paper" and move != "scissors":
        tool.clear()
        print(tool.colorText('[red]geef wel een geldig input'))
        print(tool.colorText('[red]Please enter a move! (rock, paper, scissors)'))
        move = input(tool.colorText("[green]")).lower()
    computerSetMove()
    moveDone()


def computerSetMove():
    global computerMove
    n = tool.randomBetween(0, 3)
    if n == 0:
        computerMove = "rock"
    elif n == 1:
        computerMove = "paper"
    else:
        computerMove = "scissors"


def moveDone():
    tool.clear()
    check = checkForWin()
    i = ""
    while i != "again" and i != "stop":
        print("")
        print(tool.colorText("Your move: [red]" + move))
        print(tool.colorText("Computer move: [red]" + computerMove))
        print(tool.colorText("Coins: [red]" + str(player.coins)))
        print(tool.colorText("Lives: [red]" + str(player.lives)))
        print(check);
        print("")
        print("type 'again' to play again and 'stop' to stop playing or 'buy live' to buy one live for 10 coins")
        i = input(tool.colorText("[green]")).lower()
        tool.clear()
        if(i == "again"):
            if(player.lives >= 1):
                play()
            else:
                print(tool.colorText("[red]Uw lives zijn op press 'enter' to play again!"))
                input()
                start()
        elif(i == "stop"):
            start()
        elif(i == "buy live"):
            if(player.coins >= 10):
                player.lives += 1
                player.coins -= 10
                print(tool.colorText("[yellow-background][black]+1 [white]Live!"))
            else:
                print(tool.colorText("[yellow-background][black]niet genoeg coins.."))
        else:
            print(tool.colorText("[yellow-background][black]geef wel een geldig argument mee"))

def checkForWin():
    if move == computerMove:
        player.coins += 1
        return tool.colorText("[yellow]gelijkspel")
    elif move == "rock" and computerMove == "scissors" or move == "paper" and computerMove == "rock" or move == "scissors" and computerMove == "paper":
        player.coins += 3
        return tool.colorText("[green]" + player.name + " Wins!")
    else:
        player.lives -= 1
        return tool.colorText("[red]Computer wins!")


start()

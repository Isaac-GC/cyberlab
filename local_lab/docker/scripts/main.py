import cmd2
import sys


class App(cmd2.Cmd):

    def __init__(self):
        shortcuts = cmd2.DEFAULT_SHORTCUTS
        shortcuts.update({'&': 'speak'})
        super().__init__()

        self.maxrepeats = 3
        self.add_settable(cmd2.Settable('maxrepeats', int, 'max repetitions for speak command', self))



    def do_rot13(self, args):
        word = []










if __name__ == '__main__': 
    app = App()
    sys.exit(app.cmdloop())

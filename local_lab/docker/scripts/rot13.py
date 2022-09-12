import sys


def cli_helper():
    len_args = len(sys.argv)

    if len_args > 2 or len_args < 2:
        print("""
        ROT13 LAB usage

        rot13 <commands>

        Available commands:        
            tutorial - shows examples of how ROT13 works

        """)



def rot13():
    print("ROT13 -- ")









if __name__ == '__main__':
    cli_helper()
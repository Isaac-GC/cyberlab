# CyberLab

---
### Description
Yes, the title of this repo is not super descriptive or named really well... This will be changed later
to have a better name.

**Purpose:** This repo and the code contained within it is to allow for the quick management of enduser learning
and the spinning up of/creation of learning labs. It was/is primarily pointed towards simplicity over fanciness and
is driven to be as efficient as possible. The efficiency is intended to have a fast interface, simplified/straightforward
troubleshooting, and minimal upkeep as possible. 

**Features:**
- No User Username/Password login -> Only login via an issued certificate that is secured on the backend
- Bare minimum User information -> Only first and last name should be used
- No MFA needed. An issued certificate handles the SSO and care is being taken to not use PII
- Creation, Updating, and Management will belong in a simple/straight-forward interface and config files
    - Currently only docker images are supported (Please see future planned features for more info)

---
**Future Planned Features:**
- Investigate and Implement a solution that allows for a wide range of architectures and instances to be used
    - Potential Solutions include Qemu, Nomad, Cloud-Hypervisor, Openstack
- Add in Dark Mode
- Further Secure the lab configuration through using `jailer` or other solutions. Potentially, using firecracker-vm with
    Cloud-Hypervisor should be considered as an alternative too

---
### Setting up a local version

*Note: It is preferred to be using a *Nix distro for this. For Windows, make sure to use WSLv2.*

0. Clone this repo (but don't enter it or `cd` into it just yet)
1. Ensure that you have Python 3.10 and PIP installed
2. Install virtualenv `pip install virtualenv` (or `pip3 install virtualenv` if you also have python2 still installed)
3. Run `python -m virtualenv cyberlab` ( or `python3 -m virtualenv cyberlab` )
4. Enter the directory -> `cd cyberlab`
5. Run `bin/activate` ( It should enter you in the virtual environment created in step 3)
6. Then run `pip install -r requirements.txt`
7. Finally, you should run these commands in order (the last command sets up the server)
```python
python manage.py migrate
python manage.py runserver
```


---
#### Application Configuration and Software Used

*Highlevel overview of the packages used*

Server Side:
- Python 3.10
    - Django 4.2


UI/Web Side:
- Bootstrap
- Jinja2

--- 
## License

This work is copyrighted to and only to Isaac Gray-Christensen to distribute, modify, and manage as seen fit. This software is not allowed to be copied, modified, or otherwise shared without express and written approval. 

While the content of the software contained may be open source, attributions will be made to acknowledge the work of those authors and projects. However, all code contained within this repo is the express property of the above mentioned individual.

© Copyright 2022 - Isaac GC
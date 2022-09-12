---
title: "Introduction To Cybersecurity"
author: ["Isaac Gray-Christensen"]
date: "2022-09-03"
keywords: [Cryptography, Module1]
lang: "en"
titlepage: true
titlepage-color: "483D8B"
titlepage-text-color: "FFFAFA"
titlepage-rule-color: "FFFAFA"
titlepage-rule-height: 2
book: true
classoption: oneside
code-block-font-size: \scriptsize
...

# Introduction

In the modern world, cybersecurity is now one of the most sought after positions and is highly in demand. Especially with the 
SolarWinds hack that occured in late-2019/early-2020, then the Log4Shell application vulnerabilities that is still fresh in everyones mind from late-2021/early-2022, cybersecurity has started drastically more weight. These major events have even lead to new legislation that introduced policies and laws that now extends between geopolitical boundaries. 

But however glorious cybersecurity may seem, especially with it being the shiny thing everyone wants to be doing, it is often less glamorous than it seems. Cybersecurity ranges from exploit development and pentesting, all the way to creating filters for events in logging systems or writing policies/standards. It also comes with its challenges, with the most notable encountered being constantly educating non-technical end-users, executives, or potentially even customers. Regardless of one's job position, it is absolutely imperative and unfortunately under-represented in many company's cybersecurity staffing's that individuals in cybersecurity positions that are non-technical (managerial, compliance, documentation/policies) lack even the most fundamental cybersecurity understandings.

These labs will help build a base that you can carry forward and use to understand the basics of cybersecurity that you will use throughout your career. The labs are broken up into sections that will continintroduceduously build upon the previous sections.

---

## Lab Environment

To get started with the lab environment, you first must install [Docker](https://www.docker.com/). 

Docker is a tool that setups up containers locally and allows for the ability to create reproducible environments between computers, even Operating Systems (OS's).

Once docker is installed on your platform of choice, you'll need to open up a CLI interface.

WINDOWS:

1. Click on the start menu
2. Type in `Powershell.exe`
3. When a blue window opens up, run `docker run -it --rm <container:image>`

<!-- LINUX:
1. a
2. a

MAC OSX: 
1. a
2. a
3. a

 -->

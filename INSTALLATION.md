# Installing BetterTeams

## Prerequisites

1. `git` – [Git - Downloads](https://git-scm.com/downloads)

2. `node` and `npm` – [Node.js](https://nodejs.org) 

3. `yarn` *Not required, but recommended* – [Yarn](https://yarnpkg.com/getting-started/install)

4. `Microsoft Teams` [Download Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/download-app)

## Installation

1. Open a command prompt / terminal.

2. In this order, type each of these commands into that command prompt / terminal you just opened
   
   1. `git clone https://github.com/babeuh/BetterTeams`
   
   2. `cd BetterTeams`
   
   3. `npm i` (or `yarn` if you installed yarn)
   
   4. `npm run inject` (or `yarn inject` if you installed yarn)

3. "Kill" Microsoft Teams (right-click in the System Tray => Quit)

4. Start Microsoft Teams and BetterTeams should be injected.

## Uninstallation

1. Open a command prompt / terminal

2. Navigate to your BetterTeams installation

3. Type `npm run uninject` (or `yarn uninject` if you installed yarn)

4. "Kill" Microsoft Teams (right-click in the System Tray => Quit)

5. Start Microsoft Teams and BetterTeams should be gone.

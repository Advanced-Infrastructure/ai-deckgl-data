#!/bin/bash
cd /home/ubuntu/fe-config-automation
sudo npm install
sudo npm run build
npx serve -s build > app.out.log 2> app.err.log < /dev/null & 
#last line

function updateChatData() {
  while true
  do
    sleep 0.5
    git pull &> /dev/null
  done
}

$(updateChatData) &

while [[ count -lt 10 ]]
do 
  node main.js

  git add ./chatData.json &> /dev/null
  git commit -m "added new message" &> /dev/null
  git push &> /dev/null
done
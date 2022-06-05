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
  commitMsg=$(node main.js)
  echo $commitMsg
  git add ./chatData.json &> /dev/null
  git commit -m "${commitMsg}" &> /dev/null
  git push &> /dev/null
done
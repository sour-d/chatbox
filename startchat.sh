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
  exitCode=$?
  
  if [[ exitCode -eq 2 ]] then
    commitMsg="sent new message"
  else
    commitMsg="marked as read"
  fi


  git add ./chatData.json &> /dev/null
  git commit -m "${commitMsg}" &> /dev/null
  git push &> /dev/null
done
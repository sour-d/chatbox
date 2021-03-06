function updateChatData() {
  while true
  do
    sleep 0.5
    git pull origin messageData &> /dev/null
  done
}

git checkout messageData &> /dev/null
$(updateChatData) &

while true
do 
  node main.js
  exitCode=$?

  if [[ $exitCode -eq 2 ]]
  then
    commitMsg="sent new message"
  else
    commitMsg="marked as read"
  fi


  git add ./chatData.json &> /dev/null
  git commit -m "${commitMsg}" &> /dev/null
  git push origin messageData &> /dev/null
done
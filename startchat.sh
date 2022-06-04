while true
do
  node main.js

  git add ./chatData.json &> /dev/null
  git commit -m "added new message"
  git push &> /dev/null
done
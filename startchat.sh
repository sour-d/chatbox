while true
do
  node main.js

  git add ./chatData.json
  git commit -m "added new message"
  git push
done
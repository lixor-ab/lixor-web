#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

# adapted from: https://raw.githubusercontent.com/domenic/zones/master/deploy.sh
# TODO: right now anything locally can be deployed...
# TODO: clean up properly after move to separate dist repo

PRIMARY_S3_BRANCH="master"
TARGET_REPO="git@github.com:lixor-ab/lixor-ab.github.io.git" # must be ssh
TARGET_BRANCH="master"
DIST_DIR="public"

if [ -n "$TRAVIS_BUILD_ID" ]; then

  # Pull requests and commits to other branches shouldn't try to deploy, just build to verify
  # if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
  if [ "$TRAVIS_BRANCH" == "$PRIMARY_S3_BRANCH" ]; then
    echo "Skipping deploy for $PRIMARY_S3_BRANCH; just doing a build. S3 deploy after."
    yarn run dist
    exit 0
  fi

  # Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
  ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
  ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
  ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
  ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
  openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in deploy_key.enc -out deploy_key -d
  chmod 600 deploy_key
  eval `ssh-agent -s`
  ssh-add deploy_key

fi

# Save some useful information
#REPO=`git config remote.origin.url`
#SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

# Clone the existing gh-pages for this repo into $DIST_DIR/
# Create a new empty branch if gh-pages doesn't exist yet (should only happen on first deply)
git clone $TARGET_REPO $DIST_DIR
cd $DIST_DIR
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
cd ..

# Clean out existing contents
rm -rf $DIST_DIR/**/* || exit 0

# Run our compile script
yarn run dist

# Now let's go have some fun with the cloned repo
cd $DIST_DIR
mv -f robots.not-public.txt robots.txt

git config user.name "Travis CI"
git config user.email "ulf@alfhild.io"

# add to see new files in diff - this does not delete files though, fix!
git add -A .
# If there are no changes (e.g. this is a README update) then just bail.
if [ -z "`git diff --cached`" ] ; then
  echo "No changes to the generated site on this push; exiting."
  git reset HEAD .
  exit 0
fi


# TODO: make this work or take it out...
#echo "{\"version\": \"${SHA}\"}" > version.json

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
# SHA is from src repo - add that...
git commit -m "Deploy to GitHub Pages: ${SHA}"

# Now that we're all set up, we can push.
git push $TARGET_REPO $TARGET_BRANCH

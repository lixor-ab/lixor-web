#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

# adapted from: https://raw.githubusercontent.com/domenic/zones/master/deploy.sh
# TODO: right now anything locally can be deployed...

SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"
DIST_DIR="public"

if [ -n "$TRAVIS_BUILD_ID" ]; then

  # Pull requests and commits to other branches shouldn't try to deploy, just build to verify
  if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build."
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
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

# Clone the existing gh-pages for this repo into $DIST_DIR/
# Create a new empty branch if gh-pages doesn't exist yet (should only happen on first deply)
git clone $REPO $DIST_DIR
cd $DIST_DIR
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
cd ..

# Clean out existing contents
rm -rf $DIST_DIR/**/* || exit 0

# Run our compile script
yarn run dist

# Now let's go have some fun with the cloned repo
cd $DIST_DIR

git config user.name "Travis CI"
git config user.email "ulf@alfhild.io"

# If there are no changes (e.g. this is a README update) then just bail.
if [ -z "`git diff`" ] ; then
  echo "No changes to the generated site on this push; exiting."
  exit 0
fi


echo "{\"version\": \"${SHA}\"}" > version.json

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git add .
git commit -m "Deploy to GitHub Pages: ${SHA}"

# Now that we're all set up, we can push.
git push $SSH_REPO $TARGET_BRANCH


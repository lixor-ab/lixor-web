#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

aws s3 sync public s3://$S3_BUCKET --region eu-central-1 --exclude 'assets/*' --delete
aws s3 sync public/assets s3://$S3_BUCKET/assets --region eu-central-1 --cache-control "max-age=31536000" --delete

#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"

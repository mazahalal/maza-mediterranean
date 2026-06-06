#!/bin/bash
source /workspace/.agent.env
curl -s "https://api.vercel.com/v1/domains/mazahalalfood.com/records" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
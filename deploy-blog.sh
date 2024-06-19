#!/bin/bash
echo `npx hexo cl`;
echo `npx hexo g -d`;
#kill -9 $(lsof -i:4000 |awk '{print $2}' | tail -n 2);
#echo `nohup npx hexo s > log.log 2>&1 &`;

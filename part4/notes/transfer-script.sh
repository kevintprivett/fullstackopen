#!/bin/bash
# should make the folder location an argument
cd ~/fullstackopen/part3/notes
tar -czf ~/backend.tar.gz backend
scp -i ~/.ssh/id_rsa ~/backend.tar.gz ec2-user@172.31.11.56:~
rm ~/backend.tar.gz
ssh -i ~/.ssh/id_rsa ec2-user@172.31.11.56 'bash -s < ~/startup.sh'


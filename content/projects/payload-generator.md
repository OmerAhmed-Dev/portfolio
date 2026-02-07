---
title: "PayloadGen"
description: "Advanced XSS and SQL injection payload generator with WAF bypass techniques"
date: 2024-01-05
tech: ["Go", "JavaScript", "WebAssembly"]
github: "https://github.com/yourusername/payloadgen"
demo: "https://payloadgen.example.com"
image: "/images/projects/payloadgen.png"
featured: true
---

## Overview

PayloadGen is an advanced payload generation tool for security researchers and penetration testers. It specializes in creating XSS and SQL injection payloads with built-in WAF evasion techniques.

## Key Features

- **Context-Aware Payloads**: Generates payloads based on injection context
- **WAF Bypass**: Multiple encoding and obfuscation techniques
- **Payload Variants**: Automatically creates multiple variants of each payload
- **Web Interface**: Clean UI for easy payload generation
- **CLI Support**: Scriptable command-line interface
- **Export Options**: Export payloads in various formats

## WAF Evasion Techniques

The tool implements several evasion techniques:

- Unicode encoding
- HTML entity encoding
- Case variation
- Comment injection
- Double encoding
- Alternate syntax

## Example Payloads

```javascript
// Basic XSS
<script>alert(1)</script>

// WAF Bypass variant
<svg/onload=alert(1)>
<img src=x onerror=alert(1)>
<<script>alert(1)//<</script>
```

## Installation

```bash
# Using Go
go install github.com/yourusername/payloadgen@latest

# Using Docker
docker run -p 8080:8080 yourusername/payloadgen
```

## API Usage

```bash
curl -X POST https://payloadgen.example.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{"type": "xss", "context": "attribute", "waf": "cloudflare"}'
```

## Disclaimer

This tool is intended for authorized security testing only. Always obtain proper authorization before testing.

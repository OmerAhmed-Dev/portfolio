---
title: "ReconToolkit"
description: "Automated reconnaissance framework for bug bounty and penetration testing"
date: 2024-01-20
tech: ["Python", "Docker", "Bash", "APIs"]
github: "https://github.com/yourusername/recon-toolkit"
demo: ""
image: "/images/projects/recon-toolkit.png"
featured: true
---

## Overview

ReconToolkit is a comprehensive automated reconnaissance framework designed to streamline the initial phases of penetration testing and bug bounty hunting.

## Features

- **Subdomain Enumeration**: Combines multiple tools (Subfinder, Amass, Assetfinder) for thorough coverage
- **Port Scanning**: Intelligent port scanning with service detection
- **Web Probing**: Automatic HTTP/HTTPS probing and screenshot capture
- **Content Discovery**: Directory and file fuzzing with customizable wordlists
- **Vulnerability Scanning**: Integration with Nuclei for automated vulnerability detection
- **Notification System**: Slack/Discord alerts for new findings

## Installation

```bash
git clone https://github.com/yourusername/recon-toolkit
cd recon-toolkit
docker-compose up -d
```

## Usage

```bash
# Full recon on a single domain
python3 recon.py -d target.com --full

# Subdomain enumeration only
python3 recon.py -d target.com --subs-only

# With custom output directory
python3 recon.py -d target.com -o /path/to/output
```

## Architecture

The toolkit follows a modular architecture where each phase of reconnaissance is handled by a separate module:

1. **Discovery Module**: Subdomain and asset discovery
2. **Probe Module**: Service detection and fingerprinting
3. **Analysis Module**: Vulnerability assessment
4. **Report Module**: Results aggregation and reporting

## Technologies Used

- Python 3.9+
- Docker for containerization
- Redis for job queuing
- PostgreSQL for data storage
